#!/usr/bin/env node
// Groups documents that appear to share a subject, and shows what each group
// has declared about itself.
//
// It groups; it does not pick. Which document in a cluster is current is a
// judgement, and a tool that guesses reports an answer nobody checked.

import { resolve } from "node:path";
import { loadConfig } from "./config.mjs";
import { scan } from "./scan.mjs";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

let config;
try {
  config = loadConfig(repoRoot);
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const { documents } = scan(repoRoot, config);
const real = documents.filter((d) => !d.isChapter);
const stop = new Set(config.cluster.stopwords);
const minLen = config.cluster.minTokenLength;
const minDocs = Number(flag("min", config.cluster.minDocuments));

// Three signals, deliberately shallow: filename tokens, heading vocabulary and
// link co-occurrence. Anything deeper starts inferring meaning, which is the
// step this tool refuses to take.
function tokensOf(doc) {
  const out = new Set();
  const stem = doc.id.replace(/^\d{4,14}[-_]?/, "");
  for (const token of stem.split(/[-_]/)) {
    if (token.length >= minLen && !stop.has(token)) out.add(token);
  }
  for (const line of doc.text.split("\n")) {
    if (!line.startsWith("#")) continue;
    for (const token of line.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/)) {
      if (token.length >= minLen && !stop.has(token)) out.add(token);
    }
  }
  for (const match of doc.text.matchAll(/\[\[([a-z0-9-]+)\]\]/g)) out.add(`link:${match[1]}`);
  return out;
}

const bySubject = new Map();
for (const doc of real) {
  for (const token of tokensOf(doc)) {
    if (!bySubject.has(token)) bySubject.set(token, []);
    bySubject.get(token).push(doc);
  }
}

// A token in most documents names no subject. Section words like "phase" or
// "context" appear everywhere and would swamp the real clusters, so anything
// above the cutoff is dropped rather than listed as a stopword one by one.
const ceiling = Math.max(minDocs, Math.floor(real.length * config.cluster.maxDocumentFrequency));
for (const [token, docs] of [...bySubject.entries()]) {
  if (docs.length > ceiling) bySubject.delete(token);
}

const age = (doc) => Math.round((Date.now() - doc.mtime) / 86400000);

const clusters = [...bySubject.entries()]
  .filter(([, docs]) => docs.length >= minDocs)
  .map(([subject, docs]) => {
    const withStatus = docs.filter((d) => d.frontmatter?.status).length;
    const withSupersede = docs.filter((d) => d.frontmatter?.supersedes || d.frontmatter?.supersededBy).length;
    const recent = docs.filter((d) => age(d) <= 90).length;
    return {
      subject,
      documents: docs.length,
      withStatus,
      withSupersede,
      recent,
      // The whole point: can a reader tell which one is current without
      // reading all of them?
      answerable: withStatus === docs.length && withSupersede > 0,
      members: docs.map((d) => ({ id: d.id, rel: d.rel, status: d.frontmatter?.status ?? null, ageDays: age(d) })),
    };
  })
  .sort((a, b) => b.documents - a.documents);

const only = flag("subject", null);
const selected = only ? clusters.filter((c) => c.subject === only) : clusters;

if (args.includes("--json")) {
  console.log(JSON.stringify({ repoRoot, clusters: selected }, null, 2));
  process.exit(0);
}

console.log(`documents ${real.length} · clusters of ${minDocs}+ documents: ${clusters.length}\n`);

for (const cluster of selected.slice(0, only ? 1 : 15)) {
  console.log(`cluster: ${cluster.subject}   ${cluster.documents} documents`);
  console.log(`  status declared     ${cluster.withStatus} / ${cluster.documents}`);
  console.log(`  supersede declared  ${cluster.withSupersede}`);
  console.log(`  touched in 90 days  ${cluster.recent}`);
  console.log(
    cluster.answerable
      ? "  → the current document can be identified from what is declared"
      : "  → cannot identify which document is current without reading them",
  );
  if (only) {
    console.log("");
    for (const m of cluster.members.sort((a, b) => a.ageDays - b.ageDays)) {
      console.log(`    ${String(m.status ?? "-").padEnd(12)} ${String(m.ageDays).padStart(4)}d  ${m.rel}`);
    }
  }
  console.log("");
}

if (!only && clusters.length > 15) console.log(`… ${clusters.length - 15} more (--json, or --subject <name>)`);

process.exit(0);
