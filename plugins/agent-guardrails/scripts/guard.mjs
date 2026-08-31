#!/usr/bin/env node
// PreToolUse handler. Fails closed: a command it cannot read is refused, because
// everything it guards is hard to undo.

import { spawnSync } from "node:child_process";
import { evaluate } from "./rules.mjs";

const MODE = process.env.AGENT_GUARDRAILS ?? "deny";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function emit(decision, reason) {
  const hookSpecificOutput = { hookEventName: "PreToolUse", permissionDecision: decision };
  if (reason) hookSpecificOutput.permissionDecisionReason = reason;
  process.stdout.write(`${JSON.stringify({ hookSpecificOutput })}\n`);
}

function checkedOutElsewhere(cwd) {
  return (branch) => {
    const result = spawnSync("git", ["worktree", "list", "--porcelain"], {
      cwd,
      encoding: "utf8",
      timeout: 5000,
    });
    if (result.status !== 0 || !result.stdout) return false;
    const here = spawnSync("git", ["rev-parse", "--show-toplevel"], {
      cwd,
      encoding: "utf8",
      timeout: 5000,
    }).stdout?.trim();

    let path = null;
    for (const line of result.stdout.split("\n")) {
      if (line.startsWith("worktree ")) path = line.slice("worktree ".length).trim();
      if (line === `branch refs/heads/${branch}` && path && path !== here) return true;
    }
    return false;
  };
}

const raw = await readStdin().catch(() => "");

if (MODE === "off") {
  emit("allow");
  process.exit(0);
}

let input;
try {
  input = JSON.parse(raw);
} catch {
  // A payload this handler cannot parse is not a licence to proceed.
  emit(MODE === "ask" ? "ask" : "deny", "Guard could not read the tool payload.");
  process.exit(0);
}

const command = input?.tool_input?.command;
if (typeof command !== "string" || command.trim() === "") {
  emit("allow");
  process.exit(0);
}

let reason = null;
try {
  reason = evaluate(command, { isCheckedOutElsewhere: checkedOutElsewhere(input?.cwd) });
} catch {
  emit(MODE === "ask" ? "ask" : "deny", "Guard could not evaluate this command.");
  process.exit(0);
}

if (reason) {
  emit(MODE === "ask" ? "ask" : "deny", reason);
} else {
  emit("allow");
}
