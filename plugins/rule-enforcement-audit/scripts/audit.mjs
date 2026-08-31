#!/usr/bin/env node
// Reports which of a project's written agent rules are actually enforced.
//
// It does not guess the mapping. Matching prose to a hook is exactly the
// judgement a tool gets wrong, and a wrong map is worse than none: it reports
// coverage that does not exist. So the tool counts, lists, and remembers what
// you decided; you supply the map once and it tells you when it goes stale.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const MAP_FILE = "rule-enforcement.json";

const RULE_SOURCES = [
  "CLAUDE.md",
  "AGENTS.md",
  "GEMINI.md",
  "GROK.md",
  ".cursorrules",
  ".github/copilot-instructions.md",
];

const RULE_DIRS = [".agent/rules", ".claude/rules", ".codex/rules", ".cursor/rules"];

const HOOK_SOURCES = [
  ".claude/settings.json",
  ".claude/settings.local.json",
  ".codex/hooks.json",
  ".grok/hooks",
  ".cursor/hooks.json",
];

// A rule is a line that forbids or requires something. Anything softer is
// guidance, and counting guidance as a rule inflates the denominator until the
// number stops meaning anything.
const OBLIGATION =
  /\b(must not|must never|never|do not|don't|always|required|prohibited|forbidden|shall not)\b|금지|하지 마라|해서는 안|반드시|의무|말 것/i;

function walk(dir, depth = 0, out = []) {
  if (depth > 4) return out;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, depth + 1, out);
    else if (/\.(md|mdc)$/.test(entry.name)) out.push(path);
  }
  return out;
}

function extractRules(root) {
  const files = [];
  for (const name of RULE_SOURCES) {
    const path = join(root, name);
    if (existsSync(path) && statSync(path).isFile()) files.push(path);
  }
  for (const dir of RULE_DIRS) {
    const path = join(root, dir);
    if (existsSync(path)) files.push(...walk(path));
  }

  const rules = [];
  for (const file of files) {
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    text.split("\n").forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.length < 12 || trimmed.length > 400) return;
      if (!/^([-*]|\d+\.|>)\s/.test(trimmed) && !/^#{1,6}\s/.test(trimmed) === false) return;
      if (!OBLIGATION.test(trimmed)) return;
      rules.push({
        id: `${relative(root, file)}:${index + 1}`,
        file: relative(root, file),
        line: index + 1,
        text: trimmed.replace(/^([-*]|\d+\.|>)\s+/, "").slice(0, 160),
      });
    });
  }
  return rules;
}

function enforcementPoints(root) {
  const points = [];
  for (const source of HOOK_SOURCES) {
    const path = join(root, source);
    if (!existsSync(path)) continue;
    if (statSync(path).isDirectory()) {
      for (const name of readdirSync(path).filter((n) => n.endsWith(".json"))) {
        points.push(...readHooks(join(path, name), root));
      }
    } else {
      points.push(...readHooks(path, root));
    }
  }
  for (const dir of [".claude/plugins", "plugins"]) {
    const path = join(root, dir);
    if (!existsSync(path)) continue;
    for (const file of walkJson(path)) points.push(...readHooks(file, root));
  }
  return points;
}

function walkJson(dir, depth = 0, out = []) {
  if (depth > 3) return out;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkJson(path, depth + 1, out);
    else if (entry.name === "hooks.json") out.push(path);
  }
  return out;
}

function readHooks(path, root) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return [];
  }
  const hooks = parsed.hooks ?? parsed;
  const points = [];
  for (const [event, groups] of Object.entries(hooks)) {
    if (!Array.isArray(groups)) continue;
    for (const group of groups) {
      for (const handler of group.hooks ?? []) {
        points.push({
          id: `${relative(root, path)}#${event}:${handler.command?.slice(0, 60) ?? handler.type}`,
          event,
          matcher: group.matcher ?? "*",
          source: relative(root, path),
        });
      }
    }
  }
  return points;
}

const args = process.argv.slice(2);
const root = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const rules = extractRules(root);
const points = enforcementPoints(root);

const mapPath = join(root, MAP_FILE);
let map = {};
if (existsSync(mapPath)) {
  try {
    map = JSON.parse(readFileSync(mapPath, "utf8"));
  } catch {
    console.error(`${MAP_FILE} is not valid JSON.`);
    process.exit(2);
  }
}

const decided = map.rules ?? {};
const enforced = [];
const declaredOnly = [];
const unmapped = [];

for (const rule of rules) {
  const decision = decided[rule.id];
  if (!decision) unmapped.push(rule);
  else if (decision.enforcedBy) enforced.push({ ...rule, by: decision.enforcedBy });
  else declaredOnly.push({ ...rule, why: decision.note ?? "no enforcement recorded" });
}

if (args.includes("--init")) {
  const seed = { rules: Object.fromEntries(rules.map((r) => [r.id, { text: r.text, enforcedBy: null, note: "" }])) };
  writeFileSync(mapPath, `${JSON.stringify(seed, null, 2)}\n`);
  console.log(`Wrote ${MAP_FILE} with ${rules.length} rules, all unmapped. Fill in enforcedBy where a hook covers one.`);
  process.exit(0);
}

if (args.includes("--json")) {
  console.log(JSON.stringify({ root, rules: rules.length, points: points.length, enforced, declaredOnly, unmapped }, null, 2));
  process.exit(0);
}

console.log(`rules found            ${rules.length}`);
console.log(`enforcement points     ${points.length}`);
console.log(`  mapped as enforced   ${enforced.length}`);
console.log(`  declared only        ${declaredOnly.length}`);
console.log(`  not yet judged       ${unmapped.length}`);

if (points.length > 0) {
  const byEvent = points.reduce((acc, p) => ({ ...acc, [p.event]: (acc[p.event] ?? 0) + 1 }), {});
  console.log(`\nhooks by event: ${Object.entries(byEvent).map(([e, n]) => `${e} ${n}`).join(", ")}`);
}

if (declaredOnly.length > 0) {
  console.log(`\ndeclared only — these hold only while someone remembers them:`);
  for (const rule of declaredOnly.slice(0, 20)) console.log(`  ${rule.file}:${rule.line}  ${rule.text}`);
  if (declaredOnly.length > 20) console.log(`  … ${declaredOnly.length - 20} more`);
}

if (unmapped.length > 0) {
  console.log(`\nnot yet judged — run with --init to seed ${MAP_FILE}, then decide each:`);
  for (const rule of unmapped.slice(0, 20)) console.log(`  ${rule.file}:${rule.line}  ${rule.text}`);
  if (unmapped.length > 20) console.log(`  … ${unmapped.length - 20} more`);
}

// Reporting is the job. A project with unenforced rules is the normal case, not
// a failure of this tool.
process.exit(0);
