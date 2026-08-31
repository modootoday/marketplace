#!/usr/bin/env node
// Reads only. Reports role violations in rule documents and broken or missing
// projections. Never writes; `project.mjs` does that.

import { existsSync, lstatSync, readFileSync, readlinkSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { discoverPackages } from "./discover.mjs";
import { loadConfig } from "./config.mjs";

const root = resolve(process.argv[2] ?? process.cwd());
const config = loadConfig(root);
const packages = discoverPackages(root, config);

// The always-loaded document is paid for on every turn, so it holds rules and
// nothing else. These are the shapes that mean something other than a rule.
const ROLE_VIOLATIONS = [
  { name: "dated progress note", re: /^\s*[-*]?\s*(?:\d{4}[-/]\d{2}[-/]\d{2}|20\d{6})\b.*\b(done|complete[d]?|landed|shipped|migrated)\b/im },
  { name: "task list", re: /^\s*[-*]\s*\[[ xX]\]/m },
  { name: "phase status", re: /^#{1,6}\s*(?:phase|step|wave)\s*\d+.*\b(done|complete[d]?|in progress|todo)\b/im },
  { name: "changelog heading", re: /^#{1,6}\s*(changelog|history|이력)\b/im },
  { name: "runbook heading", re: /^#{1,6}\s*(runbook|how to run|operations?)\b/im },
];

const findings = [];

for (const pkg of packages) {
  const thin = join(pkg.rulesDir, config.thin);
  const full = join(pkg.rulesDir, config.full);

  if (existsSync(thin)) {
    const text = readFileSync(thin, "utf8");
    for (const rule of ROLE_VIOLATIONS) {
      if (rule.re.test(text)) {
        findings.push({
          kind: "role",
          path: relative(root, thin),
          detail: `${rule.name} belongs in the on-demand document, not the always-loaded one`,
        });
      }
    }
  }

  for (const [filename, target] of Object.entries(config.projections)) {
    const source = target === "full" ? full : thin;
    if (!existsSync(source)) continue;

    const link = join(pkg.dir, filename);
    if (!existsSync(link) && !isBrokenLink(link)) {
      findings.push({ kind: "missing", path: relative(root, link), detail: `no projection of ${relative(root, source)}` });
      continue;
    }

    let stat;
    try {
      stat = lstatSync(link);
    } catch {
      continue;
    }

    if (!stat.isSymbolicLink()) {
      findings.push({ kind: "copy", path: relative(root, link), detail: "a real file where a projection is expected; it will drift" });
      continue;
    }

    const resolved = resolve(pkg.dir, readlinkSync(link));
    if (!existsSync(resolved)) {
      findings.push({ kind: "broken", path: relative(root, link), detail: "points at nothing" });
    } else if (resolved !== resolve(source)) {
      findings.push({ kind: "retarget", path: relative(root, link), detail: `points at ${relative(root, resolved)}, expected ${relative(root, source)}` });
    }
  }
}

function isBrokenLink(path) {
  try {
    return lstatSync(path).isSymbolicLink();
  } catch {
    return false;
  }
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ root, config: config.source, packages: packages.length, findings }, null, 2));
} else {
  console.log(`packages with rules: ${packages.length}  (config: ${config.source})`);
  for (const finding of findings) {
    console.log(`  ${finding.kind.padEnd(9)} ${finding.path}\n            ${finding.detail}`);
  }
  console.log(findings.length === 0 ? "no findings" : `\n${findings.length} finding(s)`);
}

// Reporting is the job; a finding is not this tool's failure.
process.exit(0);
