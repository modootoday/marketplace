#!/usr/bin/env node
// Runs one minimal session per runtime with this plugin loaded, then reports
// which lifecycle events the runtime actually delivered.
//
// Every row is an observation, never an inference: an event counts as
// delivered only if the probe wrote a line for it, and injected context counts
// as delivered only if the token appears in the model's reply.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TOKEN = `HCM${Math.floor(Math.random() * 1e6)
  .toString()
  .padStart(6, "0")}`;
const PROMPT =
  "Run exactly one shell command: echo hook-contract-matrix. Then reply with the single word done.";

const args = process.argv.slice(2);
const wanted = args.includes("--runtime") ? args[args.indexOf("--runtime") + 1] : "all";

function have(bin) {
  return spawnSync("sh", ["-c", `command -v ${bin}`], { encoding: "utf8" }).status === 0;
}

function version(bin, flag = "--version") {
  const r = spawnSync(bin, [flag], { encoding: "utf8" });
  return (r.stdout || r.stderr || "").trim().split("\n")[0] || "unknown";
}

function readLog(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function summarise(runtime, versionText, log, transcript, note) {
  const fired = new Set(log.map((r) => r.event));
  const stopRecords = log.filter((r) => r.event === "Stop");
  return {
    runtime,
    version: versionText,
    session_start: fired.has("SessionStart"),
    post_tool_use: fired.has("PostToolUse"),
    stop: fired.has("Stop"),
    injection_reached_model: transcript.includes(TOKEN),
    stop_hook_active_present: stopRecords.some((r) => r.stop_hook_active !== null),
    last_assistant_message_present: stopRecords.some((r) => r.has_last_assistant_message),
    plugin_root_env: log.some((r) => r.env?.plugin_root),
    project_dir_env: log.some((r) => r.env?.project_dir),
    note,
  };
}

function runClaude(work, logPath) {
  const env = { ...process.env, HCM_LOG: logPath, HCM_INJECT_TOKEN: TOKEN };
  const r = spawnSync(
    "claude",
    ["-p", "--plugin-dir", PLUGIN_ROOT, "--permission-mode", "bypassPermissions"],
    { cwd: work, env, input: PROMPT, encoding: "utf8", timeout: 300_000 },
  );
  return summarise(
    "claude",
    version("claude"),
    readLog(logPath),
    `${r.stdout ?? ""}${r.stderr ?? ""}`,
    r.error ? String(r.error.message) : null,
  );
}

function runCodex(work, logPath) {
  const home = mkdtempSync(join(tmpdir(), "hcm-codex-"));
  // Install from the real marketplace root. A synthetic manifest pointing at an
  // absolute source is rejected: sources must be relative to the marketplace.
  const marketRoot = resolve(PLUGIN_ROOT, "..", "..");
  const marketName = JSON.parse(
    readFileSync(join(marketRoot, ".claude-plugin", "marketplace.json"), "utf8"),
  ).name;
  const pluginName = JSON.parse(
    readFileSync(join(PLUGIN_ROOT, ".claude-plugin", "plugin.json"), "utf8"),
  ).name;
  writeFileSync(
    join(home, "config.toml"),
    `approval_policy = "never"\nsandbox_mode = "danger-full-access"\n\n[projects."${work}"]\ntrust_level = "trusted"\n`,
  );
  const authSource = join(process.env.HOME ?? "", ".codex", "auth.json");
  if (existsSync(authSource)) {
    writeFileSync(join(home, "auth.json"), readFileSync(authSource));
  }

  const env = { ...process.env, CODEX_HOME: home, HCM_LOG: logPath, HCM_INJECT_TOKEN: TOKEN };
  let note = null;
  try {
    execFileSync("codex", ["plugin", "marketplace", "add", marketRoot], { env, encoding: "utf8" });
    execFileSync("codex", ["plugin", "add", `${pluginName}@${marketName}`], {
      env,
      encoding: "utf8",
    });
  } catch (error) {
    note = `install failed: ${String(error.message).split("\n")[0]}`;
  }

  const r = spawnSync(
    "codex",
    ["exec", "--skip-git-repo-check", "--dangerously-bypass-hook-trust", PROMPT],
    { cwd: work, env, encoding: "utf8", timeout: 300_000 },
  );
  const out = summarise(
    "codex",
    version("codex"),
    readLog(logPath),
    `${r.stdout ?? ""}${r.stderr ?? ""}`,
    note ?? "hook trust bypassed for this measurement",
  );
  rmSync(home, { recursive: true, force: true });
  return out;
}

const rows = [];
const work = mkdtempSync(join(tmpdir(), "hcm-work-"));

if ((wanted === "all" || wanted === "claude") && have("claude")) {
  rows.push(runClaude(work, join(mkdtempSync(join(tmpdir(), "hcm-log-")), "claude.jsonl")));
}
if ((wanted === "all" || wanted === "codex") && have("codex")) {
  rows.push(runCodex(work, join(mkdtempSync(join(tmpdir(), "hcm-log-")), "codex.jsonl")));
}
rmSync(work, { recursive: true, force: true });

if (rows.length === 0) {
  console.error("No supported runtime found on PATH. Install claude or codex, or pass --runtime.");
  process.exit(2);
}

if (args.includes("--json")) {
  console.log(JSON.stringify({ token: TOKEN, rows }, null, 2));
} else {
  const mark = (value) => (value ? "yes" : "NO");
  for (const row of rows) {
    console.log(`\n${row.runtime}  (${row.version})`);
    console.log(`  SessionStart fired            ${mark(row.session_start)}`);
    console.log(`  PostToolUse fired             ${mark(row.post_tool_use)}`);
    console.log(`  Stop fired                    ${mark(row.stop)}`);
    console.log(`  injected context reached model ${mark(row.injection_reached_model)}`);
    console.log(`  stop_hook_active in payload   ${mark(row.stop_hook_active_present)}`);
    console.log(`  last_assistant_message present ${mark(row.last_assistant_message_present)}`);
    console.log(`  CLAUDE_PLUGIN_ROOT set        ${mark(row.plugin_root_env)}`);
    console.log(`  CLAUDE_PROJECT_DIR set        ${mark(row.project_dir_env)}`);
    if (row.note) console.log(`  note: ${row.note}`);
  }
  console.log("");
}
