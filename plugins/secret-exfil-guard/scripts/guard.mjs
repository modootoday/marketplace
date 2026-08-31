#!/usr/bin/env node
// PreToolUse handler. Fails closed: a command it cannot read is refused,
// because a guard that opens on its own error protects nothing.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { compile, evaluate } from "./rules.mjs";

const MODE = process.env.SECRET_EXFIL_GUARD ?? "deny";
const CONFIG_FILE = "secret-exfil-guard.json";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function emit(decision, reason) {
  const out = { hookEventName: "PreToolUse", permissionDecision: decision };
  if (reason) out.permissionDecisionReason = reason;
  process.stdout.write(`${JSON.stringify({ hookSpecificOutput: out })}\n`);
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
  emit(MODE === "ask" ? "ask" : "deny", "Secret guard could not read the tool payload.");
  process.exit(0);
}

const command = input?.tool_input?.command;
if (typeof command !== "string" || !command.trim()) {
  emit("allow");
  process.exit(0);
}

let config = {};
const path = join(input?.cwd ?? process.cwd(), CONFIG_FILE);
if (existsSync(path)) {
  try {
    config = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    emit(
      MODE === "ask" ? "ask" : "deny",
      `${CONFIG_FILE} is not valid JSON; refusing while the guard is unconfigured.`,
    );
    process.exit(0);
  }
}

let reason = null;
try {
  reason = evaluate(command, compile(config));
} catch {
  emit(MODE === "ask" ? "ask" : "deny", "Secret guard could not evaluate this command.");
  process.exit(0);
}

if (reason) emit(MODE === "ask" ? "ask" : "deny", reason);
else emit("allow");
