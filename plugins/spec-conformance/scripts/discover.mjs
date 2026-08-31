#!/usr/bin/env node
// Finds candidate design documents in a repository that has no convention yet.
//
// This runs before anything else, and it assumes nothing: not a directory, not
// a filename shape, not a frontmatter field. A tool that only sees documents
// already arranged correctly cannot see the pile it exists to sort out.
//
// It classifies nothing. Every document gets signals and no verdict, because
// whether a file is a design document, a readme, a changelog or a note is a
// reading judgement, and a heuristic that decides it here is a convention
// imposed on a repository that has not chosen one.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const outPath = flag("out", join(".spec", "_work", "candidates.jsonl"));

// Only places a document certainly is not. Everything else is looked at, and
// nothing here decides what a document is about.
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "out",
  ".next",
  ".output",
  ".turbo",
  ".cache",
  "coverage",
  "vendor",
  "target",
  "__snapshots__",
]);

const DOC_EXTENSIONS = new Set([".md", ".mdx", ".markdown", ".rst", ".adoc", ".txt"]);

function walk(dir, depth, out) {
  if (depth > 12) return out;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path, depth + 1, out);
    } else if (DOC_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      out.push(path);
    }
  }
  return out;
}

function frontmatterKeys(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  return [...new Set(text.slice(4, end).split("\n").map((l) => l.match(/^([A-Za-z_][\w.-]*):/)?.[1]).filter(Boolean))];
}

function historyDates(root) {
  const created = new Map();
  const updated = new Map();
  try {
    const out = execFileSync("git", ["log", "--format=C|%ct", "--name-only", "--reverse"], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 512 * 1024 * 1024,
    });
    let when = null;
    for (const line of out.split("\n")) {
      if (line.startsWith("C|")) {
        when = Number(line.slice(2)) * 1000;
        continue;
      }
      if (!line.trim() || !when) continue;
      if (!created.has(line)) created.set(line, when);
      updated.set(line, when);
    }
  } catch {
    // not a repository, or history unavailable
  }
  return { created, updated };
}

const files = walk(repoRoot, 0, []);
const { created, updated } = historyDates(repoRoot);
const day = (ms) => (ms ? new Date(ms).toISOString().slice(0, 10).replace(/-/g, "") : null);

const candidates = [];
for (const path of files) {
  const rel = relative(repoRoot, path);
  let text = "";
  try {
    text = readFileSync(path, "utf8");
  } catch {
    continue;
  }
  const lines = text.split("\n");
  const headings = lines.filter((l) => /^#{1,3}\s/.test(l)).map((l) => l.replace(/^#+\s*/, "").trim().slice(0, 90));

  candidates.push({
    path: rel,
    // Where it sits, without deciding what that means.
    directory: dirname(rel),
    filename: rel.split("/").pop(),
    // Shape signals a reader can weigh. None of them classifies anything: a
    // leading timestamp is common in proposals and also in meeting notes.
    signals: {
      bytes: statSync(path).size,
      lines: lines.length,
      leadingDigits: (rel.split("/").pop().match(/^(\d+)/) ?? [])[1]?.length ?? 0,
      hasFrontmatter: text.startsWith("---"),
      frontmatterKeys: frontmatterKeys(text) ?? [],
      title: headings[0] ?? null,
      headings: headings.slice(0, 12),
      taskBoxes: (text.match(/^\s*[-*] \[[ xX]\]/gm) ?? []).length,
      wikilinks: [...new Set([...text.matchAll(/\[\[([^\]|]+)\]\]/g)].map((m) => m[1]))].slice(0, 20),
      created: day(created.get(rel)),
      updated: day(updated.get(rel)),
    },
    // Filled in by the reading pass. Absent means nobody has looked yet, which
    // is different from "not a design document".
    classification: null,
  });
}

const full = resolve(repoRoot, outPath);
mkdirSync(dirname(full), { recursive: true });
writeFileSync(full, `${candidates.map((c) => JSON.stringify(c)).join("\n")}\n`);

const byDir = candidates.reduce((acc, c) => {
  const top = c.directory.split("/")[0] || ".";
  return { ...acc, [top]: (acc[top] ?? 0) + 1 };
}, {});

console.log(`candidate documents ${candidates.length}`);
console.log(`with frontmatter    ${candidates.filter((c) => c.signals.hasFrontmatter).length}`);
console.log(`with a date prefix  ${candidates.filter((c) => c.signals.leadingDigits >= 8).length}`);
console.log(`with task boxes     ${candidates.filter((c) => c.signals.taskBoxes > 0).length}`);
console.log(`\nby top-level directory`);
for (const [dir, n] of Object.entries(byDir).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${String(n).padStart(5)}  ${dir}`);
}
console.log(`\nwritten to ${outPath}`);
console.log("Nothing was classified. Which of these are design documents, and of what kind, is decided by reading them.");
