#!/usr/bin/env node
// Checks a plugin marketplace before it ships: structure, frontmatter against
// schema v1 and its tier rules, references across tiers, and an optional leak
// scan against a deny list that is kept outside this repository.
//
// Usage: node scripts/check-skills.mjs [<marketplace dir>] [--catalog <other marketplace>]... [--deny <file>]...

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

import {
  SCHEMA,
  descriptionDriftFindings,
  duplicatePluginFindings,
  gatedNameFindings,
  installDefaultFindings,
  parseFrontmatter,
  pluginNamingFindings,
  referenceFindings,
  skillFindings,
  trackedResultsFindings,
  unregisteredFindings,
} from "./skill-rules.mjs";
import { pluginSupport } from "./verified-runtimes.mjs";

const TIERS = new Set(SCHEMA.properties.metadata.properties.tier.enum);
const ALLOW_MARK = "leak-allow";
const TEXT_EXT = /\.(md|mdx|txt|json|jsonc|ya?ml|toml|mjs|cjs|js|ts|sh|py)$/u;

const args = process.argv.slice(2);
const denyFiles = [];
const catalogDirs = [];
let dir = ".";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--deny") denyFiles.push(args[++i]);
  else if (args[i] === "--catalog") catalogDirs.push(resolve(args[++i]));
  else dir = args[i];
}
dir = resolve(dir);

const problems = [];
const fail = (path, message) => problems.push(`${relative(process.cwd(), path) || path}: ${message}`);

// Every skill of one marketplace, with what the rules need.
function readSkills(root) {
  const manifestPath = join(root, ".claude-plugin", "marketplace.json");
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const out = { root, manifestPath, manifest, tier: manifest.metadata?.tier, skills: [], missing: [], plugins: [] };
  for (const plugin of manifest.plugins ?? []) {
    const pluginDir = resolve(root, plugin.source ?? "");
    out.plugins.push({ name: plugin.name, dir: pluginDir, description: plugin.description });
    if (!plugin.name || !existsSync(pluginDir)) {
      out.missing.push(`plugin ${plugin.name ?? "(unnamed)"} has no directory at ${plugin.source}`);
      continue;
    }
    if (!existsSync(join(pluginDir, ".claude-plugin", "plugin.json"))) {
      out.missing.push(`${plugin.name}: missing .claude-plugin/plugin.json`);
    }
    const skillsDir = join(pluginDir, "skills");
    if (!existsSync(skillsDir)) continue;
    for (const dirName of readdirSync(skillsDir)) {
      const path = join(skillsDir, dirName, "SKILL.md");
      if (!existsSync(path)) continue;
      const text = readFileSync(path, "utf8");
      const end = text.indexOf("\n---", 3);
      const refs = join(skillsDir, dirName, "references");
      out.skills.push({
        path,
        dirName,
        front: parseFrontmatter(text),
        body: end === -1 ? text : text.slice(end + 4),
        hasScripts: existsSync(join(skillsDir, dirName, "scripts")),
        localeFiles: existsSync(refs)
          ? readdirSync(refs)
              .map((f) => /\.([a-z]{2})\.md$/u.exec(f)?.[1])
              .filter(Boolean)
          : [],
      });
    }
  }
  return out;
}

const own = readSkills(dir);
if (own === null) {
  console.error(`no .claude-plugin/marketplace.json in ${dir}`);
  process.exit(2);
}
const tier = own.tier;
if (!TIERS.has(tier)) fail(own.manifestPath, `metadata.tier must be one of ${[...TIERS].join(", ")}`);
for (const message of own.missing) fail(own.manifestPath, message);

const catalog = new Map();
const others = catalogDirs.map(readSkills);
for (const other of [own, ...others]) {
  if (other === null) continue;
  for (const s of other.skills) if (s.front) catalog.set(s.dirName, other.tier);
}

const readJson = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null);
const pluginsRoot = join(dir, "plugins");
const hasSkills = (d) => existsSync(join(pluginsRoot, d, "skills")) && readdirSync(join(pluginsRoot, d, "skills")).length > 0;
const onDisk = existsSync(pluginsRoot) ? readdirSync(pluginsRoot).filter(hasSkills) : [];
const unregistered = unregisteredFindings(onDisk, own.plugins.map((p) => basename(p.dir)));
for (const message of unregistered) fail(own.manifestPath, message);

const ownPluginNames = own.plugins.map((p) => p.name);
for (const message of pluginNamingFindings(tier, ownPluginNames)) fail(own.manifestPath, message);
const otherTiers = new Map();
for (const other of others) {
  if (other !== null) otherTiers.set(other.tier, [...(otherTiers.get(other.tier) ?? []), ...other.plugins.map((p) => p.name)]);
}
for (const message of duplicatePluginFindings(ownPluginNames, otherTiers)) fail(own.manifestPath, message);

for (const plugin of own.plugins) {
  const claude = readJson(join(plugin.dir, ".claude-plugin", "plugin.json"));
  const gemini = readJson(join(plugin.dir, "gemini-extension.json"));
  const drift = { name: plugin.name, entry: plugin.description, plugin: claude?.description, gemini: gemini?.description };
  for (const message of descriptionDriftFindings(drift)) fail(own.manifestPath, message);
}

let gitNote = "";
try {
  const top = execFileSync("git", ["-C", dir, "rev-parse", "--show-toplevel"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  if (resolve(top) !== dir) throw new Error("not the checkout root");
  const tracked = execFileSync("git", ["-C", dir, "ls-files"], { encoding: "utf8", maxBuffer: 1 << 26 }).split("\n").filter(Boolean);
  for (const message of trackedResultsFindings(tracked)) fail(own.manifestPath, message);
} catch {
  gitNote = "tracked-results check skipped (not a git checkout)";
  console.log(`note: ${gitNote}`);
}

// A stale claim fails; a supported runtime missing from the field only warns.
const warnings = [];
for (const plugin of own.plugins) {
  for (const entry of existsSync(plugin.dir) ? pluginSupport(plugin.dir) : []) {
    const skill = own.skills.find((s) => s.path === entry.file);
    const claimed = skill?.front?.metadata?.["verified-runtimes"];
    const claims = Array.isArray(claimed) ? claimed : claimed === undefined ? [] : [claimed];
    for (const runtime of claims) {
      if (!entry.support.includes(runtime)) {
        fail(entry.file, `verified-runtimes claims ${runtime} but no README row supports it`);
      }
    }
    for (const runtime of entry.support) {
      if (!claims.includes(runtime)) warnings.push(`${relative(process.cwd(), entry.file)}: README supports ${runtime}, not in verified-runtimes`);
    }
  }
}
for (const warning of warnings) console.warn(`warning: ${warning}`);

for (const s of own.skills) {
  if (s.front === null) {
    fail(s.path, "no frontmatter");
    continue;
  }
  for (const message of skillFindings({ tier, ...s })) fail(s.path, message);
  for (const message of referenceFindings({ tier, name: s.dirName, front: s.front, body: s.body }, catalog)) {
    fail(s.path, message);
  }
}
for (const message of installDefaultFindings(own.skills.map((s) => s.front?.metadata), tier)) {
  fail(own.manifestPath, message);
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
  // The deny list names every term it bans, so it would match itself.
  const denyPaths = new Set(denyFiles.map((f) => resolve(f)));
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      if (name === ".git" || name === "node_modules") continue;
      const full = join(d, name);
      if (denyPaths.has(full)) continue;
      // Eval runs write local results with host paths; they are gitignored, never published.
      if (name === "results" && d.endsWith("evals")) continue;
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

// Gated names leak from any open-tier file, not only SKILL.md (graders, READMEs, eval prompts).
if (tier === "open" && catalogDirs.length > 0) {
  const ownNames = new Set(own.skills.map((s) => s.dirName));
  const walkNames = (d) => {
    for (const name of readdirSync(d)) {
      if (name === ".git" || name === "node_modules") continue;
      const full = join(d, name);
      if (name === "results" && d.endsWith("evals")) continue;
      if (statSync(full).isDirectory()) {
        walkNames(full);
        continue;
      }
      if (!TEXT_EXT.test(name) || name === "SKILL.md") continue;
      for (const message of gatedNameFindings(readFileSync(full, "utf8"), catalog, ownNames)) fail(full, message);
    }
  };
  walkNames(dir);
}

const skills = own.skills.length;
const refs = catalogDirs.length > 0 ? `, references checked against ${catalog.size} skills` : "";
const leak = terms.length > 0 ? `, ${scanned} files scanned against ${terms.length} deny entries` : ", leak scan not run (no --deny)";
if (problems.length > 0) {
  for (const problem of problems) console.error(problem);
  console.error(`check-skills: ${problems.length} problem(s) in ${skills} skills (tier ${tier})${refs}${leak}`);
  process.exit(1);
}
console.log(`check-skills: ${skills} skills OK (tier ${tier})${refs}${leak}`);
