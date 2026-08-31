#!/usr/bin/env node
// Fixture check. Both directions matter: a guard that never allows is as broken
// as one that never blocks, and only the fixtures tell them apart.

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluate } from "./rules.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cases = JSON.parse(readFileSync(join(root, "fixtures", "cases.json"), "utf8"));

// The branch rule needs a real repository to answer, so the fixtures pin the
// answer instead and the rule is exercised through both replies.
const never = () => false;
const always = () => true;

let failed = 0;

for (const command of cases.blocked) {
  const reason = evaluate(command, { isCheckedOutElsewhere: never });
  if (!reason) {
    console.error(`expected blocked, was allowed: ${command}`);
    failed += 1;
  }
}

for (const command of cases.allowed) {
  const reason = evaluate(command, { isCheckedOutElsewhere: never });
  if (reason) {
    console.error(`expected allowed, was blocked: ${command}\n  reason: ${reason}`);
    failed += 1;
  }
}

const forced = "git branch -f main other";
if (evaluate(forced, { isCheckedOutElsewhere: never })) {
  console.error(`expected allowed when the branch is not checked out elsewhere: ${forced}`);
  failed += 1;
}
if (!evaluate(forced, { isCheckedOutElsewhere: always })) {
  console.error(`expected blocked when the branch is checked out elsewhere: ${forced}`);
  failed += 1;
}

const total = cases.blocked.length + cases.allowed.length + 2;
if (failed > 0) {
  console.error(`\n${failed} of ${total} cases failed`);
  process.exit(1);
}
console.log(`${total} cases passed`);
