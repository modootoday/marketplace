#!/usr/bin/env node
// Gathers the evidence a migration decision needs, and stops there.
//
// It does not decide anything. Status, relationships and placement are
// judgements that require reading the document, and a tool that fills them in
// from filenames produces a normalised pile that is confidently wrong.
//
// Output is a dossier per document: what history proves, what was already
// declared somewhere, and an explicit list of what is still unknown and why.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { loadConfig } from "./config.mjs";
import { parseFrontmatter, scan } from "./scan.mjs";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const outPath = flag("out", join(".spec", "_work", "dossier.jsonl"));

const config = loadConfig(repoRoot);

// Two ways in, and the second one is the general case. A repository that has
// already adopted the layout can be scanned; a repository that has not is read
// from a classification the reading pass produced, because in that repository
// there is no directory or filename shape entitled to say what a document is.
function fromClassification(path) {
  const rows = readFileSync(path, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const docs = [];
  for (const row of rows) {
    if (!row.kind || row.kind === "none") continue;
    const abs = join(repoRoot, row.path);
    if (!existsSync(abs)) continue;
    const text = readFileSync(abs, "utf8");
    const spec = config.kinds[row.kind];
    if (!spec) continue;
    docs.push({
      rel: row.path,
      package: row.package ?? ".",
      declaredKind: row.kind,
      id: row.id ?? basename(row.path).replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, ""),
      filename: basename(row.path),
      frontmatter: parseFrontmatter(text) ?? {},
      directoryDomain: row.domain ?? null,
      text,
      lines: text.split("\n").length,
      isChapter: Boolean(row.chapterOf),
      chapterOf: row.chapterOf ?? null,
    });
  }
  return docs;
}

const classifiedAt = resolve(repoRoot, flag("classified", join(".spec", "_work", "classifications.jsonl")));
let documents;
if (existsSync(classifiedAt)) {
  documents = fromClassification(classifiedAt);
  console.log(`reading classification  ${documents.length} documents the reading pass identified`);
} else {
  documents = scan(repoRoot, config).documents;
}
const docs = documents.filter((d) => !d.isChapter);

// One pass over history for every file. A per-file git log would take an hour at
// this scale and prove the same thing.
function historyIndex() {
  const created = new Map();
  const updated = new Map();
  const touches = new Map();
  const renamedFrom = new Map();

  let out = "";
  try {
    out = execFileSync("git", ["log", "--format=C|%ct|%s", "--name-status", "--reverse", "--find-renames"], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 512 * 1024 * 1024,
    });
  } catch {
    return { created, updated, touches, renamedFrom };
  }

  let when = null;
  let subject = "";
  for (const line of out.split("\n")) {
    if (line.startsWith("C|")) {
      const [, ts, ...rest] = line.split("|");
      when = Number(ts) * 1000;
      subject = rest.join("|");
      continue;
    }
    if (!line.trim() || !when) continue;
    const parts = line.split("\t");
    const status = parts[0][0];
    const path = status === "R" ? parts[2] : parts[1];
    if (!path) continue;

    if (status === "R") {
      renamedFrom.set(path, parts[1]);
      if (!created.has(path)) created.set(path, created.get(parts[1]) ?? when);
    } else if (!created.has(path)) {
      created.set(path, when);
    }
    updated.set(path, when);
    if (!touches.has(path)) touches.set(path, []);
    // The commit subjects are the cheapest honest account of what happened to a
    // document; a reader deciding its status wants them, not a guess from them.
    touches.get(path).push({ at: when, subject });
  }
  return { created, updated, touches, renamedFrom };
}

// Paths a document names are the cheapest link between what was written and
// what exists. Whether their presence means the work was done is a judgement;
// their presence is a fact.
const PATH_RE = /`([a-z0-9._@/-]*\/[a-z0-9._@/-]+)`/gi;

// Candidates, not conclusions. Whether a path-shaped token names a real
// location, a placeholder in an instruction, or an example is a reading
// judgement, and every heuristic added here is that judgement smuggled into a
// regular expression -- where the next exception cannot see it.
function pathCandidates(text) {
  const lines = text.split("\n");
  const found = new Map();
  lines.forEach((line, index) => {
    for (const m of line.matchAll(PATH_RE)) {
      const token = m[1].replace(/^\.\//, "").replace(/\*+$/, "").replace(/\/$/, "");
      if (token.length < 4 || token.includes("://")) continue;
      if (found.has(token)) continue;
      found.set(token, { token, line: index + 1, context: line.trim().slice(0, 160) });
    }
  });
  return [...found.values()].slice(0, 40);
}

// Commits whose subject cites the document, by id or by its slug. A plan that
// was carried out usually leaves its name in the history.
function citationIndex(repoRoot) {
  const byToken = new Map();
  let out = "";
  try {
    out = execFileSync("git", ["log", "--format=%ct|%s"], { cwd: repoRoot, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  } catch {
    return byToken;
  }
  for (const line of out.split("\n")) {
    const i = line.indexOf("|");
    if (i === -1) continue;
    const at = Number(line.slice(0, i)) * 1000;
    const subject = line.slice(i + 1);
    for (const token of subject.toLowerCase().match(/[a-z0-9][a-z0-9-]{6,}/g) ?? []) {
      if (!byToken.has(token)) byToken.set(token, []);
      byToken.get(token).push({ at, subject });
    }
  }
  return byToken;
}

const history = historyIndex();
const citations = citationIndex(repoRoot);

// One pass for path -> last touch, so "was this area worked on after the
// document was written" costs nothing per document.
const pathTouched = new Map();
try {
  const out = execFileSync("git", ["log", "--format=C|%ct", "--name-only"], {
    cwd: repoRoot, encoding: "utf8", maxBuffer: 512 * 1024 * 1024,
  });
  let when = null;
  for (const line of out.split("\n")) {
    if (line.startsWith("C|")) { when = Number(line.slice(2)) * 1000; continue; }
    if (!line.trim() || !when) continue;
    if (!pathTouched.has(line)) pathTouched.set(line, when);
  }
} catch {
  // history unavailable; the implementation block simply reports less
}
const day = (ms) => (ms ? new Date(ms).toISOString().slice(0, 10).replace(/-/g, "") : null);
const list = (v) => (v ? (Array.isArray(v) ? v : [v]).map(String).filter(Boolean) : []);
const idFrom = (ref) => basename(String(ref)).replace(/\.(sot|page)\.md$/, "").replace(/\.md$/, "");

const dossiers = [];
const summary = { withCreated: 0, statusUsable: 0, statusFreeText: 0, withDeclared: 0, needsReading: 0 };

for (const doc of docs) {
  const spec = config.kinds[doc.declaredKind];
  const fm = doc.frontmatter ?? {};
  const created = day(history.created.get(doc.rel));
  const updated = day(history.updated.get(doc.rel));
  const commits = history.touches.get(doc.rel) ?? [];

  const statusUsable = fm.status && spec.status.includes(fm.status) ? fm.status : null;
  const declared = {
    supersedes: list(fm.supersedes).map(idFrom),
    references: [...new Set([...list(fm.sot_ref).map(idFrom), ...[...doc.text.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1])])],
  };

  // Named honestly so the reading pass knows what it is being asked for, rather
  // than discovering an empty field and inventing a value to fill it.
  const unknown = [];
  if (!statusUsable) unknown.push({ field: "status", why: fm.status ? `free text: ${fm.status}` : "absent" });
  if (declared.supersedes.length === 0) unknown.push({ field: "supersedes", why: "no relationship declared anywhere" });
  unknown.push({ field: "reviewed", why: "nobody has confirmed this document" });

  if (created) summary.withCreated += 1;
  if (statusUsable) summary.statusUsable += 1;
  else if (fm.status) summary.statusFreeText += 1;
  if (declared.supersedes.length || declared.references.length) summary.withDeclared += 1;
  if (unknown.length > 0) summary.needsReading += 1;

  dossiers.push({
    source: doc.rel,
    package: doc.package,
    // Derived: provable from the filename, the directory or git.
    derived: {
      kind: doc.declaredKind,
      id: doc.id,
      domain: spec.domain === false ? null : (fm.domain ?? doc.directoryDomain ?? null),
      created,
      updated,
      renamedFrom: history.renamedFrom.get(doc.rel) ?? null,
      lines: doc.lines,
      chapters: documents.filter((d) => d.chapterOf === doc.id).map((d) => d.rel),
    },
    // Declared: someone wrote it down; carrying it across is derivation.
    declared: { status: statusUsable, ...declared },
    // Unknown: requires reading the document. Left for a person or a model.
    unknown,
    // Evidence for that reading, not a substitute for it.
    evidence: {
      commits: commits.slice(-8).map((c) => ({ on: day(c.at), subject: c.subject.slice(0, 120) })),
      headings: doc.text.split("\n").filter((l) => /^#{1,3}\s/.test(l)).slice(0, 12).map((l) => l.replace(/^#+\s*/, "").slice(0, 90)),
    },
    // Implementation evidence: facts about the code, never a verdict on whether
    // the document's work happened. That verdict needs the document read.
    implementation: (() => {
      const createdAt = history.created.get(doc.rel) ?? 0;
      const candidates = pathCandidates(doc.text).map((c) => {
        const exists = existsSync(join(repoRoot, c.token));
        let touchedAfter = false;
        for (const [f, at] of pathTouched) {
          if ((f === c.token || f.startsWith(`${c.token}/`)) && at > createdAt) {
            touchedAfter = true;
            break;
          }
        }
        // exists and touchedAfter are facts about the tree. Whether this token
        // was ever meant to be a path is left to the reader, with the line it
        // appeared on as the evidence for deciding.
        return { ...c, exists, touchedAfter };
      });
      const slug = doc.id.replace(/^\d{4,14}[-_]?/, "");
      const cited = (citations.get(slug) ?? []).slice(-5).map((c) => ({ on: day(c.at), subject: c.subject.slice(0, 110) }));
      const boxes = doc.text.match(/^\s*[-*] \[[ xX]\]/gm) ?? [];
      return {
        pathCandidates: candidates,
        candidatesPresent: candidates.filter((c) => c.exists).length,
        candidatesTouchedAfterWriting: candidates.filter((c) => c.touchedAfter).length,
        commitsCitingSlug: cited,
        tasks: { done: boxes.filter((b) => /\[[xX]\]/.test(b)).length, open: boxes.filter((b) => /\[ \]/.test(b)).length },
      };
    })(),
    proposedPath: join(
      flag("into", ".spec"),
      spec.dir,
      spec.domain !== false && (fm.domain ?? doc.directoryDomain) ? String(fm.domain ?? doc.directoryDomain) : "",
      doc.filename,
    ),
  });
}

const full = resolve(repoRoot, outPath);
mkdirSync(dirname(full), { recursive: true });
writeFileSync(full, `${dossiers.map((d) => JSON.stringify(d)).join("\n")}\n`);

console.log(`documents               ${docs.length}`);
console.log(`created date recovered  ${summary.withCreated}`);
console.log(`status already usable   ${summary.statusUsable}`);
console.log(`status is free text     ${summary.statusFreeText}   (moved to the reading pass, not mapped)`);
console.log(`relationships declared  ${summary.withDeclared}`);
console.log(`needs reading           ${summary.needsReading}`);
console.log(`\ndossier written to ${outPath}`);
console.log("Nothing was normalised. A document set is decided by reading it, not by this script.");
