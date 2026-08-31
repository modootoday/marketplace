#!/usr/bin/env node
// PreToolUse handler. Advises by default and rewrites only when told to,
// because a command that runs differently from the one you typed, with nothing
// saying so, is worse than a slow build.

import { alreadyCapped, capsFor, prefixFor } from "./policy.mjs";

const MODE = process.env.BUILD_CONCURRENCY_GUARD ?? "advise";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function emit(output) {
  process.stdout.write(`${JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", ...output } })}\n`);
}

const raw = await readStdin().catch(() => "");

if (MODE === "off") {
  emit({ permissionDecision: "allow" });
  process.exit(0);
}

let command = "";
try {
  command = JSON.parse(raw)?.tool_input?.command ?? "";
} catch {
  // Cannot read the payload: this is a convenience, so it gets out of the way.
  emit({ permissionDecision: "allow" });
  process.exit(0);
}

const caps = capsFor(command).filter((cap) => !alreadyCapped(command, cap));
if (caps.length === 0) {
  emit({ permissionDecision: "allow" });
  process.exit(0);
}

const prefix = prefixFor(caps);
const axes = [...new Set(caps.map((cap) => cap.axis))].join(" and ");

if (MODE === "apply") {
  emit({
    permissionDecision: "allow",
    permissionDecisionReason: `build-concurrency-guard prefixed ${prefix} to cap ${axes}.`,
    updatedInput: { command: `${prefix} ${command}` },
  });
  process.exit(0);
}

emit({
  permissionDecision: "allow",
  additionalContext: `This command leaves ${axes} uncapped. On a shared or agent-driven machine, running it as \`${prefix} ${command}\` usually finishes sooner and always costs less CPU. Measure before assuming it helps here.`,
});
