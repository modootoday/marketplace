#!/usr/bin/env node
// PostToolUse handler. Runs a package's own check after that package is edited,
// once per debounce window, and reports failures back to the model.
//
// The window exists because an agent edits several files in a row: without it
// the check runs on every keystroke-sized change and the cost lands on every
// turn. It is a convenience, so it never blocks and never speaks when it passes.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";

const CONFIG_FILE = "monorepo-package-validate.json";
const MODE = process.env.MONOREPO_PACKAGE_VALIDATE ?? "on";

const DEFAULTS = {
  // What marks a package root when walking up from an edited file.
  marker: "package.json",
  // Run in the package directory. Skipped when the script it names is absent.
  command: "npm run --if-present validate",
  // Only run this often per package, per session.
  debounceSeconds: 60,
  // Never walk above this many levels looking for a package root.
  maxDepth: 8,
};

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin().catch(() => "");
if (MODE === "off") process.exit(0);

let payload = {};
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const edited = payload?.tool_input?.file_path ?? payload?.tool_input?.path;
const cwd = payload?.cwd ?? process.cwd();
if (typeof edited !== "string" || !edited) process.exit(0);

let config = { ...DEFAULTS };
const configPath = join(cwd, CONFIG_FILE);
if (existsSync(configPath)) {
  try {
    config = { ...DEFAULTS, ...JSON.parse(readFileSync(configPath, "utf8")) };
  } catch {
    // An unreadable config is not a reason to interrupt an edit.
    process.exit(0);
  }
}

// Walk up from the edited file to the nearest package root.
let dir = dirname(resolve(cwd, edited));
let root = null;
for (let depth = 0; depth < config.maxDepth; depth += 1) {
  if (existsSync(join(dir, config.marker))) {
    root = dir;
    break;
  }
  const parent = dirname(dir);
  if (parent === dir) break;
  dir = parent;
}
if (!root || root === cwd) process.exit(0);

// One stamp per session and package: two sessions editing the same package
// should not silence each other's checks.
const key = `${payload.session_id ?? "nosession"}-${relative(cwd, root).split(sep).join("-")}`;
const stampDir = join(tmpdir(), "monorepo-package-validate");
const stamp = join(stampDir, `${key}.stamp`);
mkdirSync(stampDir, { recursive: true });

if (existsSync(stamp)) {
  const age = (Date.now() - statSync(stamp).mtimeMs) / 1000;
  if (age < config.debounceSeconds) process.exit(0);
  utimesSync(stamp, new Date(), new Date());
} else {
  writeFileSync(stamp, "");
}

const result = spawnSync("sh", ["-c", config.command], {
  cwd: root,
  encoding: "utf8",
  timeout: 120_000,
});

// Silence on success is the contract: a hook that speaks every time is a hook
// whose output stops being read.
if (result.status === 0 || result.status === null) process.exit(0);

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim().split("\n").slice(-40).join("\n");
process.stdout.write(
  `${JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: `The package at ${relative(cwd, root)} fails its own check after this edit:\n\n${output}`,
    },
  })}\n`,
);
