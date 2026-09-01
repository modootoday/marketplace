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
// A rename changes an id, and a relation written against the old name points at
// nothing afterwards. Every decision's destination is known before any file is
// written, so relations are repointed here rather than left for a reader to
// notice as a broken link.
const finalId = new Map();
for (const decision of decisions) {
  const dossier = dossiers.get(decision.source);
  if (!dossier) continue;
  const from = decision.source.split("/").pop().replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, "");
  const to = (decision.path ?? dossier.proposedPath).split("/").pop().replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, "");
  finalId.set(from, to);
}
for (const decision of decisions) {
  const repoint = (values) =>
    Array.isArray(values) ? values.map((v) => finalId.get(v) ?? v) : values;
  decision.supersedes = repoint(decision.supersedes);
  decision.supersededBy = repoint(decision.supersededBy);
  // A reference the source declared and the decision did not restate is still a
  // reference, and the rename retired the name it was written against. Repointing
  // only what a decision restated left those pointing at a name nothing answers to.
  decision.references = repoint(decision.references ?? dossiers.get(decision.source)?.declared?.references);
}

const written = [];

for (const decision of decisions) {
  const dossier = dossiers.get(decision.source);
  if (!dossier) {
    rejected.push({ source: decision.source, why: "no dossier: this document was not derived" });
    continue;
  }
  // The kind a decision corrects to is the one whose vocabulary applies.
  const spec = config.kinds[decision.kind ?? dossier.derived.kind] ?? config.kinds[dossier.derived.kind];

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
  // The reading pass can correct the kind. A document's location said plan
  // because it sat under plan/, and an adr/ subdirectory full of accepted
  // decisions is not that; the derivation could only report where it sits.
  const kind = decision.kind ?? d.kind;
  // The id is the filename stem, so a decision that renames the file renames the
  // id with it. Writing the old id under a new name is the one thing this layout
  // cannot survive: a link would resolve to a file that does not exist.
  const outPath = decision.path ?? dossier.proposedPath;
  const writtenId = outPath.split("/").pop().replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, "");
  const header = ["---", `kind: ${kind}`, `id: ${writtenId}`];
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
  // Fields a kind requires that no derivation can produce -- a page's route and
  // the file it is implemented by are read off the document, not off the tree.
  for (const [field, value] of Object.entries(decision.frontmatter ?? {})) {
    if (value === null || value === undefined || value === "") continue;
    if (Array.isArray(value)) {
      header.push(`${field}:`);
      for (const v of value) header.push(`  - ${v}`);
    } else header.push(`${field}: ${value}`);
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
  // Only strip a leading block that actually parsed as frontmatter; otherwise
  // the document opens with a horizontal rule and the body starts at the top.
  const hadFrontmatter = Object.keys(dossier.originalFrontmatter ?? {}).length > 0;
  const body = hadFrontmatter ? text.replace(/^---\n[\s\S]*?\n---\n?/, "") : text;
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

  const outRel = outPath;
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
