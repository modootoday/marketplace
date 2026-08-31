#!/usr/bin/env node
// Creates and repairs projections. Prints a plan and changes nothing unless
// --write is passed, because this is the only script here that touches files.

import { existsSync, lstatSync, readlinkSync, symlinkSync, unlinkSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { discoverPackages } from "./discover.mjs";
import { loadConfig } from "./config.mjs";

const args = process.argv.slice(2);
const write = args.includes("--write");
const root = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const config = loadConfig(root);

const actions = [];

for (const pkg of discoverPackages(root, config)) {
  for (const [filename, target] of Object.entries(config.projections)) {
    const source = join(pkg.rulesDir, target === "full" ? config.full : config.thin);
    if (!existsSync(source)) continue;

    const link = join(pkg.dir, filename);
    const wanted = relative(pkg.dir, source);

    let current = null;
    let isLink = false;
    try {
      const stat = lstatSync(link);
      isLink = stat.isSymbolicLink();
      if (isLink) current = readlinkSync(link);
    } catch {
      // absent
    }

    if (current === wanted) continue;

    if (current === null && !isLink && existsSync(link)) {
      // A real file. Replacing it would destroy content this tool did not write.
      actions.push({ verb: "skip", link, detail: "a real file is here; move it into the rules directory first" });
      continue;
    }

    actions.push({ verb: current === null ? "create" : "retarget", link, wanted, current });
  }
}

for (const action of actions) {
  const shown = relative(root, action.link);
  if (action.verb === "skip") {
    console.log(`skip     ${shown}\n         ${action.detail}`);
    continue;
  }
  console.log(`${action.verb.padEnd(8)} ${shown} -> ${action.wanted}${action.current ? ` (was ${action.current})` : ""}`);
  if (!write) continue;
  if (action.current !== null) unlinkSync(action.link);
  symlinkSync(action.wanted, action.link);
}

const changes = actions.filter((a) => a.verb !== "skip").length;
console.log(
  write
    ? `\n${changes} projection(s) written`
    : `\n${changes} projection(s) would change. Nothing was written; pass --write to apply.`,
);
