#!/usr/bin/env node
// Derives metadata.verified-runtimes from the eval score tables in each plugin README,
// so the README stays the single record and the frontmatter never claims more than it shows.
//
// Usage: node scripts/verified-runtimes.mjs <marketplace dir> [--check | --write] [--skip <plugin>,...]

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SCHEMA } from "./skill-rules.mjs";

export const RUNTIMES = SCHEMA.properties.metadata.properties["verified-runtimes"].items.enum;
const KEY = "verified-runtimes";

// Order matters only for display; a text naming more than one runtime is ambiguous.
const RUNTIME_PATTERNS = [
  ["codex-cli", /codex|gpt-\d/iu],
  ["gemini-cli", /gemini/iu],
  ["grok-cli", /grok/iu],
  ["antigravity", /antigravity/iu],
  ["claude-code", /claude|sonnet|opus|haiku/iu],
];
const RUNTIME_BY_LABEL = { "claude code": "claude-code", "codex cli": "codex-cli", "gemini cli": "gemini-cli", "grok cli": "grok-cli", antigravity: "antigravity" };

const runtimesIn = (text) => RUNTIME_PATTERNS.filter(([, re]) => re.test(text)).map(([name]) => name);
const cells = (line) => line.trim().replace(/^\|/u, "").replace(/\|$/u, "").split("|").map((c) => c.trim());
const isSeparator = (line) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/u.test(line);
const OPEN_MARK = /\(open\)|\bwith-only\b|\bwith only\b|\bopen\b(?! tier)/iu;

function firedOf(cell) {
  const ratio = /(\d+)\s*(?:\/|of)\s*(\d+)/u.exec(cell);
  if (ratio) return Number(ratio[1]) > 0;
  if (/^(yes|y|true)\b/iu.test(cell)) return true;
  if (/^(no|n|false)\b/iu.test(cell)) return false;
  return undefined;
}

/**
 * Score rows that show a skill fired and the with arm at 1.00, per skill and runtime.
 * @param {string} readme @param {Set<string>} skills the plugin's skill names
 * @returns {{ support: Map<string, Set<string>>, ambiguous: string[] }}
 */
export function parseReadme(readme, skills) {
  const lines = readme.split("\n");
  const tables = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].startsWith("|") || !lines[i + 1] || !isSeparator(lines[i + 1])) continue;
    let before = i - 1;
    while (before >= 0 && lines[before].trim() === "") before -= 1;
    const paragraph = [];
    while (before >= 0 && lines[before].trim() !== "" && !lines[before].startsWith("|") && !lines[before].startsWith("#")) {
      paragraph.unshift(lines[before]);
      before -= 1;
    }
    const header = cells(lines[i]).map((h) => h.toLowerCase());
    const rows = [];
    let j = i + 2;
    while (j < lines.length && lines[j].startsWith("|")) rows.push(cells(lines[j++]));
    tables.push({ header, rows, paragraph: paragraph.join(" ") });
    i = j - 1;
  }

  const skillsIn = (cell) => (cell.replace(/`/gu, "").match(/[a-z0-9]+(?:-[a-z0-9]+)*/gu) ?? []).filter((t) => skills.has(t));
  const caseSkills = new Map();
  for (const t of tables) {
    const c = t.header.indexOf("case");
    const s = t.header.indexOf("skill");
    if (c === -1 || s === -1) continue;
    for (const row of t.rows) {
      const name = (row[c] ?? "").replace(/`/gu, "");
      caseSkills.set(name, new Set([...(caseSkills.get(name) ?? []), ...skillsIn(row[s] ?? "")]));
    }
  }

  const support = new Map();
  const ambiguous = [];
  for (const t of tables) {
    const c = t.header.indexOf("case");
    const w = t.header.indexOf("with");
    if (c === -1 || w === -1) continue;
    const wo = t.header.indexOf("without");
    const s = t.header.indexOf("skill");
    const r =t.header.indexOf("runtime");
    const f = t.header.findIndex((h) => h === "fired" || h === "skill fired");
    // The sentence nearest the table names the runtime when the paragraph mentions several.
    const sentences = t.paragraph.split(/(?<=[.:;])\s+/u).map(runtimesIn).filter((x) => x.length > 0);
    const tableRuntimes = sentences.at(-1) ?? [];
    for (const row of t.rows) {
      const withCell = row[w] ?? "";
      const score = /^(\d+(?:\.\d+)?)/u.exec(withCell);
      if (!score || Number(score[1]) !== 1 || /did not fire/iu.test(withCell)) continue;
      // A case that already passes without the plugin is a regression check, not evidence.
      const without = /^(\d+(?:\.\d+)?)/u.exec(wo === -1 ? "" : (row[wo] ?? ""));
      if (!without || Number(without[1]) >= 1) continue;
      const caseName = (row[c] ?? "").replace(/`/gu, "");
      const label = `${caseName}`;
      const rest = row.filter((_, k) => k !== c && k !== s);
      const restText = rest.join(" | ");
      if (OPEN_MARK.test(restText)) continue;
      const named = s === -1 ? [...(caseSkills.get(caseName) ?? [])] : skillsIn(row[s] ?? "");
      if (named.length === 0) {
        const own = s === -1 ? "" : (row[s] ?? "");
        if (!/negative|must not fire/iu.test(`${caseName} ${own}`)) ambiguous.push(`${label}: no skill of this plugin named`);
        continue;
      }
      if (/negative|must not fire/iu.test(`${caseName} ${s === -1 ? "" : (row[s] ?? "")}`)) continue;
      let fired = true;
      if (f !== -1) fired = firedOf(row[f] ?? "");
      else if (/did not fire|not fire/iu.test(restText)) fired = false;
      if (fired === undefined) {
        ambiguous.push(`${label}: fired cell not understood`);
        continue;
      }
      if (!fired) continue;
      let found;
      if (r !== -1) {
        const named = RUNTIME_BY_LABEL[(row[r] ?? "").toLowerCase()];
        found = named ? [named] : runtimesIn(row[r] ?? "");
      } else {
        found = runtimesIn(restText);
        if (found.length === 0) found = tableRuntimes;
        if (found.length === 0) found = ["claude-code"];
      }
      if (found.length !== 1) {
        ambiguous.push(`${label}: row names ${found.join(" and ") || "no runtime"}`);
        continue;
      }
      for (const skill of named) support.set(skill, new Set([...(support.get(skill) ?? []), found[0]]));
    }
  }
  return { support, ambiguous };
}

const ordered = (set) => RUNTIMES.filter((r) => set.has(r));

/** @returns {{ skill: string, file: string, support: string[], ambiguous: string[] }[]} per skill of one plugin dir */
export function pluginSupport(pluginDir) {
  const skillsDir = join(pluginDir, "skills");
  if (!existsSync(skillsDir)) return [];
  const names = readdirSync(skillsDir).filter((n) => existsSync(join(skillsDir, n, "SKILL.md")));
  const readmePath = join(pluginDir, "README.md");
  const parsed = existsSync(readmePath)
    ? parseReadme(readFileSync(readmePath, "utf8"), new Set(names))
    : { support: new Map(), ambiguous: [] };
  return names.map((skill) => ({
    skill,
    file: join(skillsDir, skill, "SKILL.md"),
    support: ordered(parsed.support.get(skill) ?? new Set()),
    ambiguous: parsed.ambiguous,
  }));
}

/** The metadata line range of a SKILL.md and the current verified-runtimes line, if any. */
function locate(lines) {
  if (lines[0] !== "---") return null;
  const end = lines.indexOf("---", 1);
  const start = lines.findIndex((l, i) => i < end && /^metadata:\s*$/u.test(l));
  if (end === -1 || start === -1) return null;
  let last = start;
  let existing = -1;
  for (let i = start + 1; i < end; i += 1) {
    if (!/^\s/u.test(lines[i])) break;
    if (lines[i].trim() !== "") last = i;
    if (new RegExp(`^ {2}${KEY}:`, "u").test(lines[i])) existing = i;
  }
  return { last, existing };
}

export function claimedRuntimes(text) {
  const lines = text.split("\n");
  const at = locate(lines);
  if (!at || at.existing === -1) return [];
  const value = lines[at.existing].replace(new RegExp(`^ {2}${KEY}:`, "u"), "").trim();
  return value.replace(/^\[|\]$/gu, "").split(",").map((v) => v.trim()).filter(Boolean);
}

export function withRuntimes(text, runtimes) {
  const lines = text.split("\n");
  const at = locate(lines);
  if (!at) return text;
  const line = `  ${KEY}: [${runtimes.join(", ")}]`;
  if (at.existing !== -1) {
    if (runtimes.length === 0) lines.splice(at.existing, 1);
    else lines[at.existing] = line;
  } else if (runtimes.length > 0) {
    lines.splice(at.last + 1, 0, line);
  }
  return lines.join("\n");
}

function main() {
  const args = process.argv.slice(2);
  let root = ".";
  let mode = "report";
  let skip = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--check") mode = "check";
    else if (args[i] === "--write") mode = "write";
    else if (args[i] === "--skip") skip = args[++i].split(",");
    else root = args[i];
  }
  root = resolve(root);
  const pluginsDir = join(root, "plugins");
  const counts = Object.fromEntries(RUNTIMES.map((r) => [r, 0]));
  const diffs = [];
  const ambiguous = new Set();
  let skills = 0;
  let changed = 0;
  for (const plugin of readdirSync(pluginsDir).sort()) {
    if (skip.includes(plugin)) continue;
    for (const entry of pluginSupport(join(pluginsDir, plugin))) {
      skills += 1;
      for (const a of entry.ambiguous) ambiguous.add(`${plugin}: ${a}`);
      const text = readFileSync(entry.file, "utf8");
      const claimed = claimedRuntimes(text);
      for (const r of entry.support) counts[r] += 1;
      if (claimed.join(",") === entry.support.join(",")) continue;
      diffs.push(`${plugin}/${entry.skill}: frontmatter [${claimed.join(", ")}], README supports [${entry.support.join(", ")}]`);
      if (mode !== "write") continue;
      writeFileSync(entry.file, withRuntimes(text, entry.support));
      changed += 1;
    }
  }
  for (const d of diffs) console.log(mode === "write" ? `updated ${d}` : d);
  for (const a of ambiguous) console.log(`ambiguous ${a}`);
  console.log(`verified-runtimes: ${skills} skills, ${changed || diffs.length} ${mode === "write" ? "updated" : "differ"}; ${RUNTIMES.map((r) => `${r} ${counts[r]}`).join(", ")}`);
  if (mode === "check" && diffs.length > 0) process.exit(1);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
