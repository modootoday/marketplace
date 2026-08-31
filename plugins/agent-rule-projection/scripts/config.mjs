// Where the rules live and which filename each runtime expects.
//
// The mapping is configuration, not convention: this plugin does not decide
// what your rule files are called, only that one of them is the source and the
// rest are projections of it.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const CONFIG_FILE = "agent-rule-projection.json";

export const DEFAULTS = {
  // Directory inside each package that holds the rule sources.
  sourceDir: ".agent/rules",
  // The always-loaded file. Keep it short: its size is paid on every turn.
  thin: "PACKAGE.RULE.md",
  // The full document, read on demand.
  full: "PACKAGE.md",
  // Projection filename in the package root -> which source it points at.
  projections: {
    "CLAUDE.md": "thin",
    "AGENTS.md": "full",
    "GEMINI.md": "thin",
  },
  // Glob-free package discovery: any directory containing sourceDir.
  ignore: ["node_modules", ".git", "dist", "build", ".next", ".output"],
};

export function loadConfig(root) {
  const path = join(root, CONFIG_FILE);
  if (!existsSync(path)) return { ...DEFAULTS, source: "defaults" };
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return { ...DEFAULTS, ...parsed, source: CONFIG_FILE };
  } catch (error) {
    throw new Error(`${CONFIG_FILE} is not valid JSON: ${error.message}`);
  }
}
