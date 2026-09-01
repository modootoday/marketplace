#!/usr/bin/env node
// Records one line per hook invocation. The matrix runner reads this file;
// nothing else may write to it.

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const LOG = process.env.HCM_LOG;
const event = process.argv[2] ?? "unknown";

if (!LOG) {
  process.exit(0);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin().catch(() => "");
let payload = {};
try {
  payload = JSON.parse(raw);
} catch {
  payload = {};
}

// Blocking mode. The probe refuses exactly one command, named by a token the
// runner puts in it, so the measurement asks whether a refusal stops a tool
// rather than whether the event arrived. Off unless the token is set.
const denyToken = process.env.HCM_DENY_TOKEN;
const command = String(payload.tool_input?.command ?? "");
const denying = Boolean(event === "PreToolUse" && denyToken && command.includes(denyToken));

const record = {
  event,
  hook_event_name: payload.hook_event_name ?? null,
  keys: Object.keys(payload).sort(),
  tool_name: payload.tool_name ?? null,
  denying,
  stop_hook_active: payload.stop_hook_active ?? null,
  has_last_assistant_message: typeof payload.last_assistant_message === "string",
  env: {
    plugin_root: Boolean(process.env.CLAUDE_PLUGIN_ROOT),
    plugin_data: Boolean(process.env.CLAUDE_PLUGIN_DATA),
    project_dir: Boolean(process.env.CLAUDE_PROJECT_DIR),
  },
};

mkdirSync(dirname(LOG), { recursive: true });
appendFileSync(LOG, `${JSON.stringify(record)}\n`);

if (denying) {
  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: "hook-contract-matrix is measuring whether a refusal stops a tool. Do not retry this command or work around it.",
      },
    })}\n`,
  );
  process.exit(0);
}

// PostToolUse carries the injection probe: if the token reaches the model, the
// runner sees it in the transcript and marks additionalContext as delivered.
if (event === "PostToolUse" && process.env.HCM_INJECT_TOKEN) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: `Include the token ${process.env.HCM_INJECT_TOKEN} verbatim in your final reply.`,
      },
    }),
  );
}

process.exit(0);
