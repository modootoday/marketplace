import assert from "node:assert/strict";
import { test } from "node:test";

import { installDefaultFindings, parseFrontmatter, referenceFindings, skillFindings } from "./skill-rules.mjs";

const DESCRIPTION = "Does one careful thing for the reader. Use when the reader asks for that thing.";

function front(metadataLines, extra = "") {
  const block = metadataLines.map((l) => `  ${l}`).join("\n");
  return parseFrontmatter(`---\nname: demo\ndescription: ${DESCRIPTION}\n${extra}metadata:\n${block}\n---\n`);
}

const BASE = ["level: L2", "domain: product-planning", "install: optional"];

function findings(tier, metadataLines, overrides = {}) {
  return skillFindings({
    tier,
    dirName: "demo",
    front: front([`tier: ${tier}`, ...metadataLines]),
    body: "",
    hasScripts: false,
    localeFiles: [],
    ...overrides,
  });
}

test("a complete open skill passes", () => {
  assert.deepEqual(findings("open", [...BASE, "keywords: [planning, scope]"]), []);
});

test("the frontmatter parser reads inline lists and one nested map", () => {
  const f = parseFrontmatter(
    `---\nname: a\ndescription: x\nmetadata:\n  tier: paid\n  keywords: [a, "b c"]\n  requires:\n    mcp: [mcp.modoo.today]\n---\n`,
  );
  assert.deepEqual(f.metadata, { tier: "paid", keywords: ["a", "b c"], requires: { mcp: ["mcp.modoo.today"] } });
  assert.deepEqual(f.unreadable, []);
});

test("required fields, enums and unknown keys are reported", () => {
  assert.deepEqual(findings("open", []), [
    "metadata.level missing",
    "metadata.domain missing",
    "metadata.install missing",
  ]);
  const wrong = findings("open", ["level: L9", "domain: Product", "install: always", "colour: red"]);
  assert.ok(wrong.includes("metadata.colour is not in schema v1"));
  assert.ok(wrong.some((m) => m.startsWith("metadata.level L9 is not one of")));
  assert.ok(wrong.some((m) => m.startsWith("metadata.install always is not one of")));
  assert.ok(wrong.includes("metadata.domain must be kebab-case"));
});

test("a skill labelled with another tier is rejected", () => {
  const f = skillFindings({
    tier: "open",
    dirName: "demo",
    front: front(["tier: free", ...BASE]),
    body: "",
    hasScripts: false,
    localeFiles: [],
  });
  assert.ok(f.includes("metadata.tier free in a open marketplace"));
});

test("levels follow the tier: open L1-L3, free L4-L5", () => {
  assert.ok(findings("open", ["level: L4", "domain: x", "install: optional"]).some((m) => m.includes("does not belong")));
  assert.ok(findings("free", ["level: L2", "domain: x", "install: optional"]).some((m) => m.includes("does not belong")));
  assert.deepEqual(findings("free", ["level: L4", "domain: x", "install: optional"]), []);
});

test("open keywords are plain ASCII; free keywords may use any language", () => {
  assert.ok(findings("open", [...BASE, "keywords: [café menu]"]).includes("metadata.keywords must be English in the open tier"));
  assert.deepEqual(findings("free", ["level: L4", "domain: x", "install: optional", "keywords: [café menu]"]), []);
});

test("asset skills declare an output licence, and skills with scripts declare approval", () => {
  assert.ok(findings("open", ["level: L2", "domain: asset-image", "install: optional"]).includes("metadata.output-license missing"));
  assert.ok(findings("open", BASE, { hasScripts: true }).includes("metadata.approval missing"));
  assert.deepEqual(findings("open", [...BASE, "approval: scripts"], { hasScripts: true }), []);
});

test("open may not pair or call server tools, and caps install default", () => {
  const f = findings("open", [...BASE, "pair: [x]", "server-tools: [job_submit]"]);
  assert.ok(f.includes("metadata.pair is not allowed in the open tier"));
  assert.ok(f.includes("metadata.server-tools is not allowed in the open tier"));
  assert.deepEqual(installDefaultFindings(Array(5).fill({ install: "default" }), "open"), []);
  assert.equal(installDefaultFindings(Array(6).fill({ install: "default" }), "open").length, 1);
  assert.ok(findings("free", ["level: L4", "domain: x", "install: default"]).includes("metadata.install default is not allowed in the free tier"));
});

test("paid needs server tools, licence and approval, and estimates before it submits", () => {
  const paid = ["level: L2", "domain: asset-image", "install: catalog-only"];
  const missing = findings("paid", paid);
  assert.ok(missing.includes("metadata.server-tools missing"));
  assert.ok(missing.includes("metadata.output-license missing"));
  assert.ok(missing.includes("metadata.approval missing"));
  const full = [...paid, "server-tools: [job_estimate, job_submit]", "output-license: commercial", "approval: none"];
  assert.deepEqual(findings("paid", full, { body: "Call job_estimate, then job_submit." }), []);
  assert.ok(
    findings("paid", full, { body: "Call job_submit at once. Later job_estimate." }).includes(
      "job_estimate must come before job_submit in the body",
    ),
  );
  assert.ok(findings("paid", [...full.slice(0, 3), "server-tools: [run_anything]", "output-license: c", "approval: none"]).some((m) => m.includes("not a job_* tool")));
});

test("declared locales match the reference files present", () => {
  assert.deepEqual(findings("open", [...BASE, "locales: [ko]"], { localeFiles: ["ko"] }), []);
  assert.ok(findings("open", BASE, { localeFiles: ["ko"] }).some((m) => m.startsWith("metadata.locales")));
});

test("internal skills may be described in any language, never install by default, and name any tier", () => {
  const f = skillFindings({
    tier: "internal",
    dirName: "demo",
    front: parseFrontmatter(
      "---\nname: demo\ndescription: Procédure à suivre quand on modifie une règle de marque, numéro et justification compris.\nmetadata:\n  tier: internal\n  level: L4\n  domain: brand-sot\n  install: catalog-only\n---\n",
    ),
    body: "",
    hasScripts: false,
    localeFiles: [],
  });
  assert.deepEqual(f, []);
  assert.ok(findings("internal", ["level: L2", "domain: x", "install: default"]).includes("metadata.install default is not allowed in the internal tier"));
  const catalog = new Map([["paid-skill", "paid"], ["inner", "internal"]]);
  assert.deepEqual(referenceFindings({ tier: "internal", name: "demo", front: front(["pair: [paid-skill]"]), body: "" }, catalog), []);
  assert.deepEqual(referenceFindings({ tier: "open", name: "demo", front: front([]), body: "see inner" }, catalog), [
    "body names inner, a internal skill, from the open tier",
  ]);
});

test("references run down the tiers only, and a pair must resolve", () => {
  const catalog = new Map([
    ["open-skill", "open"],
    ["free-skill", "free"],
    ["paid-skill", "paid"],
  ]);
  const ref = (tier, pair, body) =>
    referenceFindings({ tier, name: "demo", front: front(pair ? [`pair: [${pair}]`] : []), body }, catalog);
  assert.deepEqual(ref("paid", "open-skill, free-skill", ""), []);
  assert.deepEqual(ref("free", "free-skill", ""), ["metadata.pair free-skill is a free skill"]);
  assert.deepEqual(ref("free", "ghost", ""), ["metadata.pair ghost is not in any catalog given"]);
  assert.deepEqual(ref("open", null, "Then run paid-skill for the rest."), [
    "body names paid-skill, a paid skill, from the open tier",
  ]);
  assert.deepEqual(ref("open", null, "Then run open-skill-extended."), []);
});
