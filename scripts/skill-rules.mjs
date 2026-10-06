// Skill frontmatter rules shared by check-skills.mjs and its tests. The value sets
// come from schema/skill-metadata.v1.json so the contract has one source.

import { readFileSync } from "node:fs";

export const SCHEMA = JSON.parse(
  readFileSync(new URL("../schema/skill-metadata.v1.json", import.meta.url), "utf8"),
);
const META = SCHEMA.properties.metadata;
const RULES = SCHEMA["x-tier-rules"];

function scalar(raw) {
  const value = raw.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["'](.*)["']$/u, "$1"))
      .filter(Boolean);
  }
  return value.replace(/^["'](.*)["']$/u, "$1");
}

// The YAML subset skills use: top-level scalars, a metadata map, and one nested
// map under it (requires). Anything deeper is reported rather than half-read.
export function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const out = { metadata: undefined, unreadable: [] };
  let map = null;
  let nested = null;
  for (const line of text.slice(3, end).split("\n")) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    const top = /^([A-Za-z][\w-]*):\s*(.*)$/u.exec(line);
    if (top) {
      map = null;
      nested = null;
      if (top[1] === "metadata" && top[2].trim() === "") {
        out.metadata = {};
        map = out.metadata;
      } else {
        out[top[1]] = scalar(top[2]);
      }
      continue;
    }
    const second = /^ {2}([A-Za-z][\w.-]*):\s*(.*)$/u.exec(line);
    if (second && map) {
      nested = null;
      if (second[2].trim() === "") {
        map[second[1]] = {};
        nested = map[second[1]];
      } else {
        map[second[1]] = scalar(second[2]);
      }
      continue;
    }
    const third = /^ {4}([A-Za-z][\w.-]*):\s*(.*)$/u.exec(line);
    if (third && nested) {
      nested[third[1]] = scalar(third[2]);
      continue;
    }
    out.unreadable.push(line.trim());
  }
  return out;
}

const list = (value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

/**
 * Findings for one skill.
 * @param {{ tier: string, dirName: string, front: any, body: string, hasScripts: boolean,
 *   localeFiles: string[] }} skill
 */
export function skillFindings({ tier, dirName, front, body, hasScripts, localeFiles }) {
  const found = [];
  const add = (message) => found.push(message);
  if (front.name !== dirName) add(`name must equal the directory name ${dirName}`);
  const description = typeof front.description === "string" ? front.description : "";
  if (description.length < 40) add("description missing or shorter than 40 characters");
  if (RULES.descriptionAsciiOnly.includes(tier) && /[^\x20-\x7E]/u.test(description)) {
    add("description must be plain English ASCII");
  }
  const needsTrigger = RULES.descriptionTriggerRequired.includes(tier);
  if (needsTrigger && !/\bUse (?:when|whenever|before|after|for)\b/u.test(description)) {
    add('description should say when to use it ("Use when ...")');
  }
  for (const line of front.unreadable) add(`frontmatter line not understood: ${line}`);
  const m = front.metadata;
  if (m === undefined) {
    add("metadata block missing");
    return found;
  }
  for (const key of META.required) if (m[key] === undefined) add(`metadata.${key} missing`);
  for (const key of Object.keys(m)) {
    if (!(key in META.properties)) add(`metadata.${key} is not in schema v1`);
  }
  const enumOf = (key) => META.properties[key].enum;
  for (const key of ["tier", "level", "install", "approval"]) {
    if (m[key] !== undefined && !enumOf(key).includes(m[key])) {
      add(`metadata.${key} ${m[key]} is not one of ${enumOf(key).join(", ")}`);
    }
  }
  if (m.tier !== undefined && m.tier !== tier) add(`metadata.tier ${m.tier} in a ${tier} marketplace`);
  if (m.domain !== undefined && !new RegExp(META.properties.domain.pattern, "u").test(m.domain)) {
    add("metadata.domain must be kebab-case");
  }
  if (m.level !== undefined && !RULES.levels[tier].includes(m.level)) {
    add(`metadata.level ${m.level} does not belong in the ${tier} tier (${RULES.levels[tier].join(", ")})`);
  }
  if (RULES.keywordsAsciiOnly.includes(tier) && list(m.keywords).some((k) => /[^\x20-\x7E]/u.test(k))) {
    add(`metadata.keywords must be English in the ${tier} tier`);
  }
  if (m.requires !== undefined) {
    if (typeof m.requires !== "object" || Array.isArray(m.requires)) add("metadata.requires must be a map");
    else {
      for (const key of Object.keys(m.requires)) {
        if (!(key in META.properties.requires.properties)) add(`metadata.requires.${key} is not in schema v1`);
      }
    }
  }
  const license = RULES.outputLicenseRequired[tier];
  const isAsset = typeof m.domain === "string" && m.domain.startsWith("asset");
  if (m["output-license"] === undefined && (license === "always" || (license === "asset-domains" && isAsset))) {
    add("metadata.output-license missing");
  }
  const approval = RULES.approvalRequired[tier];
  if (m.approval === undefined && (approval === "always" || (approval === "with-scripts" && hasScripts))) {
    add("metadata.approval missing");
  }
  if (RULES.pairMayName[tier].length === 0 && m.pair !== undefined) {
    add(`metadata.pair is not allowed in the ${tier} tier`);
  }
  const serverTools = RULES.serverTools[tier];
  if (serverTools === "forbidden" && m["server-tools"] !== undefined) {
    add(`metadata.server-tools is not allowed in the ${tier} tier`);
  }
  if (serverTools === "required") {
    const tools = list(m["server-tools"]);
    if (tools.length === 0) add("metadata.server-tools missing");
    const allowed = META.properties["server-tools"].items.enum;
    for (const t of tools) if (!allowed.includes(t)) add(`metadata.server-tools ${t} is not a job_* tool`);
    const estimate = body.indexOf("job_estimate");
    const submit = body.indexOf("job_submit");
    if (submit !== -1 && (estimate === -1 || estimate > submit)) {
      add("job_estimate must come before job_submit in the body");
    }
  }
  if (m.install === "default" && RULES.installDefault[tier] === 0) {
    add(`metadata.install default is not allowed in the ${tier} tier`);
  }
  const declared = [...list(m.locales)].sort().join(",");
  const present = [...new Set(localeFiles)].sort().join(",");
  if (declared !== present) add(`metadata.locales [${declared}] does not match references/*.<locale>.md [${present}]`);
  return found;
}

/**
 * References that point up the tiers: a pair or a body mention of a skill that
 * only exists in a higher tier, and a pair that names nothing.
 * @param {{ tier: string, name: string, front: any, body: string }} skill
 * @param {Map<string, string>} catalog skill name -> tier, across every catalog given
 */
export function referenceFindings({ tier, name, front, body }, catalog) {
  const found = [];
  const rank = RULES.rank;
  const allowed = RULES.pairMayName[tier];
  for (const target of list(front.metadata?.pair)) {
    const targetTier = catalog.get(target);
    if (targetTier === undefined) found.push(`metadata.pair ${target} is not in any catalog given`);
    else if (!allowed.includes(targetTier)) found.push(`metadata.pair ${target} is a ${targetTier} skill`);
  }
  for (const [other, otherTier] of catalog) {
    if (other === name || rank[otherTier] <= rank[tier]) continue;
    if (new RegExp(`(^|[^a-z0-9-])${other}([^a-z0-9-]|$)`, "u").test(body)) {
      found.push(`body names ${other}, a ${otherTier} skill, from the ${tier} tier`);
    }
  }
  return found;
}

/** @param {{ install?: string }[]} metadatas @param {string} tier */
export function installDefaultFindings(metadatas, tier) {
  const count = metadatas.filter((m) => m?.install === "default").length;
  const cap = RULES.installDefault[tier];
  return count > cap && cap > 0 ? [`${count} skills use install default; the ${tier} tier allows ${cap}`] : [];
}

const PLUS = "-plus";

/** Plugin directories that hold skills but are named by no marketplace entry. */
export function unregisteredFindings(skillPluginDirs, registeredDirs) {
  const known = new Set(registeredDirs);
  return skillPluginDirs
    .filter((d) => !known.has(d))
    .map((d) => `plugin directory ${d} has skills but no marketplace.json entry; register it or remove it`);
}

/** Tracked paths under plugins/<name>/evals/results/, which hold host-specific run output. */
export function trackedResultsFindings(trackedFiles) {
  return trackedFiles
    .filter((f) => /^plugins\/[^/]+\/evals\/results\//u.test(f))
    .map((f) => `${f} is tracked by git; eval results stay local and are gitignored`);
}

/** Free-tier plugins end in -plus so they never collide with an open plugin; open ones never do. */
export function pluginNamingFindings(tier, names) {
  if (tier === "free") {
    return names.filter((n) => !n.endsWith(PLUS)).map((n) => `plugin ${n} must end in ${PLUS} in the free tier`);
  }
  if (tier === "open") {
    return names.filter((n) => n.endsWith(PLUS)).map((n) => `plugin ${n} must not end in ${PLUS} in the open tier`);
  }
  return [];
}

/** @param {string[]} names @param {Map<string, string[]>} others tier -> plugin names of every other catalog */
export function duplicatePluginFindings(names, others) {
  const found = [];
  for (const name of names) {
    for (const [otherTier, otherNames] of others) {
      if (otherNames.includes(name)) found.push(`plugin ${name} also exists in the ${otherTier} tier`);
    }
  }
  return found;
}

/** The description sources of one plugin must say the same thing. */
export function descriptionDriftFindings({ name, entry, plugin, gemini }) {
  const sources = { "marketplace.json": entry, "plugin.json": plugin, "gemini-extension.json": gemini };
  const present = Object.entries(sources).filter(([, v]) => v !== undefined);
  if (new Set(present.map(([, v]) => v)).size <= 1) return [];
  return [`plugin ${name} descriptions differ: ${present.map(([k, v]) => `${k} "${v.slice(0, 60)}"`).join(" | ")}`];
}

/**
 * Skills that exist only outside the open tier, named anywhere in an open-tier file.
 * @param {string} text @param {Map<string, string>} catalog skill name -> tier @param {Set<string>} ownNames
 */
export function gatedNameFindings(text, catalog, ownNames) {
  const found = [];
  for (const [other, otherTier] of catalog) {
    if (otherTier === "open" || ownNames.has(other)) continue;
    if (new RegExp(`(^|[^a-z0-9-])${other}([^a-z0-9-]|$)`, "u").test(text)) {
      found.push(`names ${other}, a ${otherTier} skill, from the open tier`);
    }
  }
  return found;
}
