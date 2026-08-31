#!/usr/bin/env node
// Draws the document graph, and checks the invariants that only a graph can see.
//
// Views are scoped by default. A picture of a thousand nodes is not a picture,
// and drawing one costs the time it took to draw.

import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { loadConfig } from "./config.mjs";
import { proseOnly, scan } from "./scan.mjs";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const view = flag("view", "domains");
const format = flag("format", "mermaid");

let config;
try {
  config = loadConfig(repoRoot, flag("config", null));
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const { documents } = scan(repoRoot, config);
const docs = documents.filter((d) => !d.isChapter);

const nodes = new Map();
for (const doc of docs) {
  nodes.set(`${doc.specRoot}::${doc.id}`, doc);
}

// A link resolves in its own spec root first and the repository second. That is
// how a wikilink behaves, and it is what lets two packages both hold a document
// called overview without either needing a prefix.
function resolveLink(from, id) {
  const local = nodes.get(`${from.specRoot}::${id}`);
  if (local) return { doc: local, scope: "local" };
  const global = docs.filter((d) => d.id === id);
  if (global.length === 1) return { doc: global[0], scope: "repo" };
  if (global.length > 1) return { ambiguous: global };
  return null;
}

// History is part of the graph, not a lookup beside it. A document that claims
// work connects to the commits that did it through the paths it names, and
// without those edges the graph can only say what documents say about each
// other.
const PATH_RE = /`([a-z0-9._@/-]*\/[a-z0-9._@/-]+)`/gi;
const namedPaths = (text) => {
  const out = new Set();
  for (const m of text.matchAll(PATH_RE)) {
    const p = m[1].replace(/^\.\//, "").replace(/[*\/]+$/, "");
    if (/YYYY|NNNN|<[^>]+>|\{/.test(p)) continue;
    if (p.length >= 4 && /^(apps|core|packages|tools|scripts|sots|plan|docs|src|\.agent|\.claude)\//.test(p)) out.add(p);
  }
  return [...out].slice(0, 40);
};

function loadHistory() {
  const commits = [];
  try {
    const out = execFileSync("git", ["log", "--format=C|%h|%ct|%s", "--name-only"], {
      cwd: repoRoot, encoding: "utf8", maxBuffer: 512 * 1024 * 1024,
    });
    let current = null;
    for (const line of out.split("\n")) {
      if (line.startsWith("C|")) {
        const [, hash, ts, ...rest] = line.split("|");
        current = { hash, at: Number(ts) * 1000, subject: rest.join("|"), paths: [] };
        commits.push(current);
        continue;
      }
      if (line.trim() && current) current.paths.push(line);
    }
  } catch {
    // no history available; commit edges are simply absent
  }
  return commits;
}

const history = args.includes("--no-history") ? [] : loadHistory();

const edges = [];
const findings = [];

for (const doc of docs) {
  const fm = doc.frontmatter ?? {};

  for (const match of proseOnly(doc.text).matchAll(/\[\[([a-z0-9-]+)\]\]/g)) {
    const target = match[1];
    const found = resolveLink(doc, target);
    if (!found) findings.push({ code: "LINK_DANGLING", path: doc.rel, detail: `[[${target}]] resolves to nothing` });
    else if (found.ambiguous) {
      findings.push({
        code: "LINK_AMBIGUOUS",
        path: doc.rel,
        detail: `[[${target}]] matches ${found.ambiguous.length} documents outside this spec root`,
      });
    } else edges.push({ from: doc, to: found.doc, type: "link" });
  }

  for (const target of toList(fm.supersedes)) {
    const found = resolveLink(doc, target);
    if (!found || found.ambiguous) {
      findings.push({ code: "SUPERSEDE_DANGLING", path: doc.rel, detail: `supersedes "${target}" resolves to nothing` });
      continue;
    }
    edges.push({ from: doc, to: found.doc, type: "supersedes" });
    // The pair must agree, or a reader arriving at the older document is never
    // told there is a newer one.
    const back = toList(found.doc.frontmatter?.supersededBy);
    if (back.length > 0 && !back.includes(doc.id)) {
      findings.push({
        code: "SUPERSEDE_ONE_SIDED",
        path: found.doc.rel,
        detail: `superseded by ${doc.id}, but names ${back.join(", ")}`,
      });
    }
  }

  if (fm.status === "superseded" && toList(fm.supersededBy).length === 0) {
    findings.push({ code: "SUCCESSOR_MISSING", path: doc.rel, detail: "status is superseded but no successor is named" });
  }

  const referenceFields = [config.referenceField, ...(config.referenceAliases ?? [])];
  const referenced = referenceFields.flatMap((f) => toList(fm[f]));
  for (const ref of referenced) {
    const id = ref.replace(/^.*\//, "").replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, "");
    const found = resolveLink(doc, id);
    if (!found || found.ambiguous) {
      findings.push({ code: "REF_DANGLING", path: doc.rel, detail: `reference "${ref}" resolves to nothing` });
    } else edges.push({ from: doc, to: found.doc, type: "ref" });
  }
}

// Document -> path -> commit. The middle hop is what makes a claim checkable:
// the document names an area, and history says who touched it since.
const commitEdges = [];
if (history.length > 0) {
  // Index every touched file and each of its ancestor directories, so a
  // document's named path is one lookup rather than a scan of the whole
  // history. Without this the join is documents x paths x files and does not
  // finish.
  const byPrefix = new Map();
  for (const commit of history) {
    for (const path of commit.paths) {
      let at = path;
      for (;;) {
        if (!byPrefix.has(at)) byPrefix.set(at, []);
        byPrefix.get(at).push(commit);
        const cut = at.lastIndexOf("/");
        if (cut === -1) break;
        at = at.slice(0, cut);
      }
    }
  }

  const bySubjectToken = new Map();
  for (const commit of history) {
    for (const token of commit.subject.toLowerCase().match(/[a-z0-9][a-z0-9-]{7,}/g) ?? []) {
      if (!bySubjectToken.has(token)) bySubjectToken.set(token, []);
      bySubjectToken.get(token).push(commit);
    }
  }

  const createdAt = new Map();
  for (const commit of [...history].reverse()) {
    for (const path of commit.paths) if (!createdAt.has(path)) createdAt.set(path, commit.at);
  }

  for (const doc of docs) {
    // A normalised copy is born the day it is written, so its own history says
    // every commit predates it and the whole join collapses. The document's
    // birth is where it came from: the source path it records, then the created
    // field, and only then the file itself.
    const fm = doc.frontmatter ?? {};
    const fromSource = fm.source ? createdAt.get(String(fm.source)) : undefined;
    const fromField = fm.created ? Date.parse(`${String(fm.created).slice(0, 4)}-${String(fm.created).slice(4, 6)}-${String(fm.created).slice(6, 8)}`) : NaN;
    const born = fromSource ?? (Number.isNaN(fromField) ? (createdAt.get(doc.rel) ?? 0) : fromField);
    const seen = new Set();
    for (const path of namedPaths(doc.text)) {
      for (const commit of byPrefix.get(path) ?? []) {
        if (commit.at < born) continue;
        const k = `${commit.hash}|${path}`;
        if (seen.has(k)) continue;
        seen.add(k);
        commitEdges.push({ doc, path, commit });
      }
    }
    const slug = doc.id.replace(/^\d{4,14}[-_]?/, "");
    for (const commit of bySubjectToken.get(slug) ?? []) {
      commitEdges.push({ doc, path: null, commit, cited: true });
    }
  }
}

// A supersede chain that loops has no newest member, so nothing is current.
const chain = new Map();
for (const edge of edges.filter((e) => e.type === "supersedes")) {
  chain.set(`${edge.from.specRoot}::${edge.from.id}`, `${edge.to.specRoot}::${edge.to.id}`);
}
for (const start of chain.keys()) {
  const seen = new Set([start]);
  let at = chain.get(start);
  while (at) {
    if (seen.has(at)) {
      findings.push({ code: "SUPERSEDE_CYCLE", path: nodes.get(start)?.rel ?? start, detail: "supersede chain loops" });
      break;
    }
    seen.add(at);
    at = chain.get(at);
  }
}

function toList(value) {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).map(String).filter(Boolean);
}

// ---- views -----------------------------------------------------------------

const label = (doc) => doc.id.slice(0, 40);
const key = (doc) => `${doc.specRoot}::${doc.id}`;
let title = view;
let viewNodes = [];
let viewEdges = [];

if (view === "domains") {
  // Only a kind that declares a domain has one; for the rest the kind is the
  // coarsest honest grouping.
  const domainOf = (doc) =>
    config.kinds[doc.declaredKind]?.domain === false
      ? doc.declaredKind
      : (doc.frontmatter?.domain ?? doc.directoryDomain ?? doc.declaredKind);
  const counted = new Map();
  for (const doc of docs) counted.set(domainOf(doc), (counted.get(domainOf(doc)) ?? 0) + 1);
  viewNodes = [...counted].map(([name, n]) => ({ id: name, text: `${name} (${n})` }));
  const pairs = new Map();
  for (const edge of edges) {
    const a = domainOf(edge.from);
    const b = domainOf(edge.to);
    if (a === b) continue;
    const k = `${a}|${b}`;
    pairs.set(k, (pairs.get(k) ?? 0) + 1);
  }
  viewEdges = [...pairs].map(([k, n]) => {
    const [a, b] = k.split("|");
    return { from: a, to: b, text: String(n) };
  });
} else if (view === "supersedes") {
  const used = new Set();
  for (const edge of edges.filter((e) => e.type === "supersedes")) {
    used.add(key(edge.from));
    used.add(key(edge.to));
    viewEdges.push({ from: key(edge.from), to: key(edge.to), text: "supersedes" });
  }
  viewNodes = [...used].map((k) => ({ id: k, text: label(nodes.get(k) ?? { id: k }) }));
} else if (view === "orphans") {
  const referenced = new Set(edges.map((e) => key(e.to)));
  const referencing = new Set(edges.map((e) => key(e.from)));
  viewNodes = docs
    .filter((d) => !referenced.has(key(d)) && !referencing.has(key(d)))
    .map((d) => ({ id: key(d), text: label(d) }));
} else if (view === "neighborhood") {
  const focus = flag("id", null);
  const depth = Number(flag("depth", 2));
  if (!focus) {
    console.error("--view neighborhood needs --id <document-id>");
    process.exit(2);
  }
  const start = docs.find((d) => d.id === focus);
  if (!start) {
    console.error(`no document with id "${focus}"`);
    process.exit(2);
  }
  const keep = new Set([key(start)]);
  for (let i = 0; i < depth; i += 1) {
    for (const edge of edges) {
      if (keep.has(key(edge.from))) keep.add(key(edge.to));
      else if (keep.has(key(edge.to))) keep.add(key(edge.from));
    }
  }
  viewNodes = [...keep].map((k) => ({ id: k, text: label(nodes.get(k) ?? { id: k }) }));
  viewEdges = edges
    .filter((e) => keep.has(key(e.from)) && keep.has(key(e.to)))
    .map((e) => ({ from: key(e.from), to: key(e.to), text: e.type }));
  title = `neighborhood of ${focus}`;
} else if (view === "timeline") {
  const focus = flag("id", null);
  if (!focus) {
    console.error("--view timeline needs --id <document-id>");
    process.exit(2);
  }
  const doc = docs.find((d) => d.id === focus);
  if (!doc) {
    console.error(`no document with id "${focus}"`);
    process.exit(2);
  }
  const mine = commitEdges.filter((e) => e.doc.id === focus);
  const seen = new Map();
  for (const e of mine) {
    if (!seen.has(e.commit.hash)) seen.set(e.commit.hash, { commit: e.commit, paths: new Set(), cited: false });
    if (e.path) seen.get(e.commit.hash).paths.add(e.path);
    if (e.cited) seen.get(e.commit.hash).cited = true;
  }
  const ordered = [...seen.values()].sort((a, b) => a.commit.at - b.commit.at);
  viewNodes = [{ id: `doc:${focus}`, text: `${focus} (document)` }];
  let previous = `doc:${focus}`;
  for (const item of ordered.slice(-30)) {
    const id = `c:${item.commit.hash}`;
    const when = new Date(item.commit.at).toISOString().slice(0, 10);
    viewNodes.push({ id, text: `${when} ${item.commit.subject.slice(0, 48)}` });
    viewEdges.push({ from: previous, to: id, text: item.cited ? "cites" : `touches ${[...item.paths][0] ?? ""}`.slice(0, 30) });
    previous = id;
  }
  title = `timeline of ${focus}: ${ordered.length} commits after it was written`;
} else if (view === "kind") {
  const which = flag("kind", "sot");
  const keep = new Set(docs.filter((d) => d.declaredKind === which).map(key));
  viewNodes = [...keep].map((k) => ({ id: k, text: label(nodes.get(k)) }));
  viewEdges = edges
    .filter((e) => keep.has(key(e.from)) && keep.has(key(e.to)))
    .map((e) => ({ from: key(e.from), to: key(e.to), text: e.type }));
  title = `kind ${which}`;
} else {
  console.error(`unknown view "${view}" (domains · supersedes · orphans · neighborhood · kind · timeline)`);
  process.exit(2);
}

const safe = (id) => `n${Buffer.from(id).toString("hex").slice(0, 24)}`;

if (args.includes("--findings")) {
  const counts = findings.reduce((acc, f) => ({ ...acc, [f.code]: (acc[f.code] ?? 0) + 1 }), {});
  console.log(`nodes ${docs.length} · document edges ${edges.length} · commit edges ${commitEdges.length} · findings ${findings.length}`);
  for (const [code, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${code.padEnd(20)} ${n}`);
  for (const f of findings.slice(0, 20)) console.log(`\n  ${f.code}  ${f.path}\n    ${f.detail}`);
  process.exit(0);
}

if (format === "json") {
  console.log(JSON.stringify({ view: title, nodes: viewNodes, edges: viewEdges, findings }, null, 2));
} else if (format === "dot") {
  console.log(`digraph "${title}" {`);
  for (const n of viewNodes) console.log(`  ${safe(n.id)} [label="${n.text}"];`);
  for (const e of viewEdges) console.log(`  ${safe(e.from)} -> ${safe(e.to)} [label="${e.text}"];`);
  console.log("}");
} else {
  console.log(`%% ${title}: ${viewNodes.length} nodes, ${viewEdges.length} edges`);
  console.log("graph TD");
  for (const n of viewNodes) console.log(`  ${safe(n.id)}["${n.text}"]`);
  for (const e of viewEdges) console.log(`  ${safe(e.from)} -->|${e.text}| ${safe(e.to)}`);
}
