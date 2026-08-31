#!/usr/bin/env node
// Writes the normalised copy from decisions a reader made.
//
// It refuses any field the decision does not justify. The derivation stage
// proves what it can, a reader decides the rest, and this stage is the only one
// that writes -- so the boundary between proof and judgement stays visible in
// the output rather than being blurred by a helpful default.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { loadConfig } from "./config.mjs";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const write = args.includes("--write");
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const dossierPath = join(repoRoot, flag("dossier", join(".spec", "_work", "dossier.jsonl")));
const decisionPath = join(repoRoot, flag("decisions", join(".spec", "_work", "decisions.jsonl")));
const config = loadConfig(repoRoot, flag("config", null));

const read = (path) =>
  readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));

let dossiers;
let decisions;
try {
  dossiers = new Map(read(dossierPath).map((d) => [d.source, d]));
  decisions = read(decisionPath);
} catch (error) {
  console.error(`${error.message}\nRun derive.mjs first, then record decisions.`);
  process.exit(2);
}

const rejected = [];
const written = [];

for (const decision of decisions) {
  const dossier = dossiers.get(decision.source);
  if (!dossier) {
    rejected.push({ source: decision.source, why: "no dossier: this document was not derived" });
    continue;
  }
  const spec = config.kinds[dossier.derived.kind];

  // A decision that reports no evidence is a guess wearing a decision's clothes.
  if (!decision.evidence || String(decision.evidence).trim().length < 8) {
    rejected.push({ source: decision.source, why: "no evidence recorded for the judgement" });
    continue;
  }
  if (decision.status && !spec.status.includes(decision.status)) {
    rejected.push({ source: decision.source, why: `status "${decision.status}" is outside the vocabulary` });
    continue;
  }
  if (decision.status === "superseded" && !(decision.supersededBy ?? []).length) {
    rejected.push({ source: decision.source, why: "superseded without naming a successor" });
    continue;
  }

  const source = join(repoRoot, decision.source);
  let text = "";
  try {
    text = readFileSync(source, "utf8");
  } catch {
    rejected.push({ source: decision.source, why: "source file could not be read" });
    continue;
  }

  const d = dossier.derived;
  const header = ["---", `kind: ${d.kind}`, `id: ${d.id}`];
  if (d.domain) header.push(`domain: ${d.domain}`);
  header.push(`status: ${decision.status ?? ""}`);
  if (d.created) header.push(`created: "${d.created}"`);
  if (d.updated) header.push(`updated: "${d.updated}"`);
  // Left empty on purpose: migrating a document is not reviewing it.
  header.push("reviewed:");
  for (const [field, values] of [
    ["supersedes", decision.supersedes],
    ["supersededBy", decision.supersededBy],
    ["references", decision.references ?? dossier.declared.references],
  ]) {
    if (!values || values.length === 0) continue;
    header.push(`${field}:`);
    for (const v of values) header.push(`  - ${v}`);
  }
  header.push(`source: ${decision.source}`);
  // The reason the status was chosen belongs with the status. Keeping it only
  // in the decisions file leaves a reader looking at "archived" with no way to
  // tell an argued judgement from a guess, which is the failure this pipeline
  // exists to avoid.
  const reason = String(decision.evidence).replace(/\s+/g, " ").trim();
  header.push("decided_because: >-");
  for (const line of reason.match(/.{1,96}(\s|$)/g) ?? [reason]) header.push(`  ${line.trim()}`);
  header.push("---");

  // The body crosses unchanged. Anything the original header held that did not
  // become a field is appended, never dropped.
  const body = text.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const carried = [];
  const original = dossier.declared.status ?? null;
  const freeText = dossier.unknown.find((u) => u.field === "status" && u.why.startsWith("free text"));
  if (!original && freeText) carried.push(`\n## Carried from the original header\n\n- ${freeText.why}\n`);

  // The normalised header holds the fields this schema knows. Anything else the
  // author wrote is still theirs: dropping it during a migration is the
  // compression this pipeline exists to avoid.
  const KNOWN = new Set(["kind", "id", "domain", "status", "created", "updated", "reviewed", "supersedes", "supersededBy", "references", "source", "sot_ref", "title"]);
  const leftover = Object.entries(dossier.originalFrontmatter ?? {}).filter(([k]) => !KNOWN.has(k));
  if (leftover.length > 0) {
    const lines = leftover.map(([k, v]) => `- ${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
    carried.push(`\n## Carried from the original frontmatter\n\n${lines.join("\n")}\n`);
  }

  const outRel = decision.path ?? dossier.proposedPath;
  written.push({ from: decision.source, to: outRel, text: `${header.join("\n")}\n${body}${carried.join("")}` });
}

if (write) {
  for (const item of written) {
    const full = join(repoRoot, item.to);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, item.text);
  }
}

console.log(`decisions read     ${decisions.length}`);
console.log(`accepted           ${written.length}`);
console.log(`rejected           ${rejected.length}`);
for (const r of rejected.slice(0, 15)) console.log(`  ${r.source}\n    ${r.why}`);
if (rejected.length > 15) console.log(`  … ${rejected.length - 15} more`);
console.log(
  write
    ? `\nwritten. The source pile was not touched.`
    : `\nNothing was written; pass --write. The source pile is never modified either way.`,
);
