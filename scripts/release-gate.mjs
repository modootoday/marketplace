#!/usr/bin/env node
// Refuses a plugin release whose eval suite does not show the skills firing and helping.
// Usage: release-gate.mjs <plugin-dir> [--from <eval.json>] [--max-cost-usd <n>] [--runs <n>]
// Without --from it runs `claude plugin eval` with --no-publish under the cost cap.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";

const INVOCATION_GRADERS = new Set(["skill-fired", "skill-not-fired"]);

function caseTags(pluginDir, caseDir) {
  try {
    const prompt = readFileSync(join(pluginDir, caseDir, "prompt.md"), "utf8");
    const match = /^tags:\s*\[(.*?)\]/mu.exec(prompt);
    if (!match) return [];
    return match[1].split(",").map((t) => t.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

/** Judges one eval result against the release rules; returns { ok, findings, warnings }. */
export function judge(result, skills, tagsOf) {
  const findings = [];
  const warnings = [];
  const cases = result.cases ?? [];
  if (cases.length < 3) findings.push(`${cases.length} cases; a release needs at least 3`);

  const covered = new Set();
  const deltas = [];
  for (const c of cases) {
    const tags = tagsOf(c.dir);
    const negative = tags.includes("negative");
    if (!negative) tags.forEach((t) => covered.add(t));
    const runs = c.arms?.with ?? [];
    if (runs.length === 0) findings.push(`${c.name}: no runs with the plugin`);
    for (const [i, run] of runs.entries()) {
      if (run.error) findings.push(`${c.name}: run ${i + 1} errored: ${run.error}`);
      for (const g of run.graders ?? []) {
        if (INVOCATION_GRADERS.has(g.name) && !g.passed) {
          findings.push(`${c.name}: ${g.name} failed in run ${i + 1}`);
        }
      }
    }
    if (negative) continue;
    const delta = c.aggregates?.delta ?? 0;
    deltas.push(delta);
    if (delta < 0) warnings.push(`${c.name}: scored lower with the plugin (delta ${delta})`);
  }

  for (const skill of skills) {
    if (!covered.has(skill)) findings.push(`${skill}: no positive eval case`);
  }
  const mean = deltas.length === 0 ? 0 : deltas.reduce((a, b) => a + b, 0) / deltas.length;
  if (!(mean > 0)) findings.push(`mean delta over positive cases is ${mean.toFixed(2)}; it must be above 0`);
  return { ok: findings.length === 0, findings, warnings, meanDelta: mean, cases: cases.length };
}

function option(args, name, fallback) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  return args[i + 1];
}

function main(args) {
  const pluginDir = args[0];
  if (!pluginDir) {
    console.error("usage: release-gate.mjs <plugin-dir> [--from <eval.json>] [--max-cost-usd <n>] [--runs <n>]");
    return 2;
  }
  let from = option(args, "--from");
  if (!from) {
    from = join(mkdtempSync(join(tmpdir(), "release-gate-")), "eval.json");
    execFileSync(
      "claude",
      ["plugin", "eval", pluginDir, "--no-publish", "--trust-plugin", "--runs", option(args, "--runs", "2"),
        "--judge-model", "sonnet", "--max-cost-usd", option(args, "--max-cost-usd", "5"), "--json", from],
      { stdio: "inherit" },
    );
  }
  const result = JSON.parse(readFileSync(from, "utf8"));
  const skills = readdirSync(join(pluginDir, "skills"), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  const verdict = judge(result, skills, (dir) => caseTags(pluginDir, dir));
  const name = basename(pluginDir);
  for (const w of verdict.warnings) console.log(`warn  ${name}: ${w}`);
  for (const f of verdict.findings) console.log(`block ${name}: ${f}`);
  console.log(
    `release-gate: ${name} ${verdict.ok ? "passes" : "refused"} (${verdict.cases} cases, mean delta ${verdict.meanDelta.toFixed(2)}, cost USD ${(result.costUsd ?? 0).toFixed(2)})`,
  );
  return verdict.ok ? 0 : 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = main(process.argv.slice(2));
}
