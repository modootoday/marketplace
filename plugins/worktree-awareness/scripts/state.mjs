#!/usr/bin/env node
// Tells the session which checkout it is standing in, once per prompt.
//
// It runs on UserPromptSubmit rather than SessionStart because SessionStart
// cannot block and its message is discarded: the model never sees it.
// UserPromptSubmit is the earliest event whose output reaches the model.

import { spawnSync } from "node:child_process";
import { basename } from "node:path";

const MODE = process.env.WORKTREE_AWARENESS ?? "on";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function git(args, cwd) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8", timeout: 5000 });
  return result.status === 0 ? (result.stdout ?? "").trim() : null;
}

function worktrees(cwd) {
  const raw = git(["worktree", "list", "--porcelain"], cwd);
  if (!raw) return [];
  const entries = [];
  let current = null;
  for (const line of raw.split("\n")) {
    if (line.startsWith("worktree ")) {
      current = { path: line.slice(9).trim(), branch: null, detached: false };
      entries.push(current);
    } else if (line.startsWith("branch ") && current) {
      current.branch = line.slice(7).replace("refs/heads/", "").trim();
    } else if (line === "detached" && current) {
      current.detached = true;
    }
  }
  return entries;
}

const raw = await readStdin().catch(() => "");
if (MODE === "off") process.exit(0);

let cwd = process.cwd();
try {
  cwd = JSON.parse(raw)?.cwd ?? cwd;
} catch {
  // fall back to the process directory
}

const root = git(["rev-parse", "--show-toplevel"], cwd);
if (!root) process.exit(0);

const all = worktrees(cwd);
const here = all.find((entry) => entry.path === root);
const others = all.filter((entry) => entry.path !== root);
const branch = here?.detached ? "detached HEAD" : (here?.branch ?? git(["rev-parse", "--abbrev-ref", "HEAD"], cwd));

// Only files someone else left behind matter here: a dirty tree is normal, a
// dirty tree you did not make is what turns a whole-tree gate red for everyone.
const dirty = (git(["status", "--porcelain"], cwd) ?? "").split("\n").filter(Boolean).length;

const lines = [`Checkout: ${basename(root)} (${root}) on ${branch}.`];

if (others.length > 0) {
  lines.push(
    `${others.length} other working tree${others.length === 1 ? "" : "s"} exist${others.length === 1 ? "s" : ""} for this repository: ${others
      .map((entry) => `${basename(entry.path)}${entry.branch ? ` on ${entry.branch}` : ""}`)
      .join(", ")}.`,
  );
  lines.push(
    "Do not move a branch another tree has checked out, and do not reset, clean or stash this one: another session's uncommitted work may be here.",
  );
}

if (dirty > 0) {
  lines.push(
    `${dirty} path${dirty === 1 ? "" : "s"} are already modified. Commit by naming paths so a commit cannot capture work it did not make.`,
  );
}

if (others.length === 0 && dirty === 0) process.exit(0);

process.stdout.write(
  `${JSON.stringify({
    hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: lines.join(" ") },
  })}\n`,
);
