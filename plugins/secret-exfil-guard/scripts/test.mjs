#!/usr/bin/env node
// Both directions, and the configurable half. A guard that blocks everything is
// as useless as one that blocks nothing, because both end up switched off.

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compile, evaluate } from "./rules.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cases = JSON.parse(readFileSync(join(root, "fixtures", "cases.json"), "utf8"));
const compiled = compile();
let failed = 0;

for (const command of cases.blocked) {
  if (!evaluate(command, compiled)) {
    console.error(`expected blocked, was allowed: ${command}`);
    failed += 1;
  }
}

for (const command of cases.allowed) {
  const reason = evaluate(command, compiled);
  if (reason) {
    console.error(`expected allowed, was blocked: ${command}\n  ${reason}`);
    failed += 1;
  }
}

// A project tool that prints credential values is configuration, not a built-in
// rule: the guard must not need to know your CLIs to be useful, and must block
// them once told.
const configured = compile({ valuePrintingCommands: [{ binary: "myenvs", verbs: ["read", "render"] }] });
const projectCommand = "myenvs --scope prod read DATABASE_URL";

if (!evaluate(projectCommand, configured)) {
  console.error("expected blocked once the project CLI is configured");
  failed += 1;
}
if (evaluate(projectCommand, compiled)) {
  console.error("expected allowed when no project CLI is configured");
  failed += 1;
}

const total = cases.blocked.length + cases.allowed.length + 2;
if (failed > 0) {
  console.error(`\n${failed} of ${total} cases failed`);
  process.exit(1);
}
console.log(`${total} cases passed`);
