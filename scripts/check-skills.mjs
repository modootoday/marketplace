#!/usr/bin/env node
// Checks a plugin marketplace before it ships: structure, tier labels, and an
// optional leak scan against a deny list that is kept outside this repository.
//
// Usage: node scripts/check-skills.mjs [<marketplace dir>] [--deny <file>]...

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const TIERS = new Set(["open", "free", "paid"]);
const ALLOW_MARK = "leak-allow";
const TEXT_EXT = /\.(md|mdx|txt|json|jsonc|ya?ml|toml|mjs|cjs|js|ts|sh|py)$/u;

const args = process.argv.slice(2);
const denyFiles = [];
let dir = ".";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--deny") denyFiles.push(args[++i]);
  else dir = args[i];
}
dir = resolve(dir);

const problems = [];
const fail = (path, message) => problems.push(`${relative(process.cwd(), path) || path}: ${message}`);

function frontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  return end === -1 ? null : text.slice(3, end);
}

function field(front, key) {
  const match = new RegExp(`^${key}:\\s*(.*)$`, "mu").exec(front);
  return match ? match[1].trim().replace(/^["'](.*)["']$/u, "$1") : undefined;
}

function metadataField(front, key) {
  const block = /^metadata:\s*\n((?: {2}.*\n?)*)/mu.exec(front);
  if (!block) return undefined;
  const match = new RegExp(`^ {2}${key}:\\s*(.*)$`, "mu").exec(block[1]);
  return match ? match[1].trim() : undefined;
}

// Structure and tier.
const manifestPath = join(dir, ".claude-plugin", "marketplace.json");
if (!existsSync(manifestPath)) {
  console.error(`no .claude-plugin/marketplace.json in ${dir}`);
  process.exit(2);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const tier = manifest.metadata?.tier;
if (!TIERS.has(tier)) fail(manifestPath, `metadata.tier must be one of ${[...TIERS].join(", ")}`);

let skills = 0;
for (const plugin of manifest.plugins ?? []) {
  const pluginDir = resolve(dir, plugin.source ?? "");
  if (!plugin.name || !existsSync(pluginDir)) {
    fail(manifestPath, `plugin ${plugin.name ?? "(unnamed)"} has no directory at ${plugin.source}`);
    continue;
  }
  if (!existsSync(join(pluginDir, ".claude-plugin", "plugin.json"))) {
    fail(pluginDir, "missing .claude-plugin/plugin.json");
  }
  const skillsDir = join(pluginDir, "skills");
  if (!existsSync(skillsDir)) continue;
  for (const name of readdirSync(skillsDir)) {
    const path = join(skillsDir, name, "SKILL.md");
    if (!existsSync(path)) continue;
    skills += 1;
    const front = frontmatter(readFileSync(path, "utf8"));
    if (front === null) {
      fail(path, "no frontmatter");
      continue;
    }
    if (field(front, "name") !== name) fail(path, `name must equal the directory name ${name}`);
    const description = field(front, "description") ?? "";
    if (description.length < 40) fail(path, "description missing or shorter than 40 characters");
    // Triggers are English; other languages belong in metadata.keywords.
    if (/[^\x20-\x7E]/u.test(description)) fail(path, "description must be plain English ASCII");
    if (!/\bUse (?:when|whenever|before|after|for)\b/u.test(description)) {
      fail(path, "description should say when to use it (\"Use when ...\")");
    }
    const ownTier = metadataField(front, "tier");
    if (ownTier === undefined) fail(path, "metadata.tier missing");
    else if (ownTier !== tier) fail(path, `metadata.tier ${ownTier} in a ${tier} marketplace`);
  }
}

// Leak scan. The deny list names what must never appear; it is private by design.
const terms = [];
for (const file of denyFiles) {
  for (const raw of readFileSync(file, "utf8").split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    // /body/flags is a regex only when the tail is valid flags; /home/x is a path.
    const regex = /^\/(.+)\/([dgimsuy]*)$/u.exec(line);
    terms.push(
      regex
        ? { label: line, test: new RegExp(regex[1], regex[2] || "u") }
        : { label: line, test: { test: (s) => s.toLowerCase().includes(line.toLowerCase()) } },
    );
  }
}

let scanned = 0;
if (terms.length > 0) {
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      if (name === ".git" || name === "node_modules") continue;
      const full = join(d, name);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!TEXT_EXT.test(name)) continue;
      scanned += 1;
      readFileSync(full, "utf8")
        .split("\n")
        .forEach((line, index) => {
          if (line.includes(ALLOW_MARK)) return;
          for (const term of terms) {
            if (term.test.test(line)) fail(full, `line ${index + 1} matches deny-list entry ${term.label}`);
          }
        });
    }
  };
  walk(dir);
}

const leak = terms.length > 0 ? `, ${scanned} files scanned against ${terms.length} deny entries` : ", leak scan not run (no --deny)";
if (problems.length > 0) {
  for (const problem of problems) console.error(problem);
  console.error(`check-skills: ${problems.length} problem(s) in ${skills} skills (tier ${tier})${leak}`);
  process.exit(1);
}
console.log(`check-skills: ${skills} skills OK (tier ${tier})${leak}`);
