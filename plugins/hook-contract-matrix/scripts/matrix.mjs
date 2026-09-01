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

const DENY_TOKEN = `HCMDENY${Math.floor(Math.random() * 1e6)
  .toString()
  .padStart(6, "0")}`;
// Two writes, one of which the probe refuses. The allowed one is the control:
// without it, a missing file could equally mean the refusal worked or the model
// never tried. Retrying or working around would answer a different question.
const BLOCKING_PROMPT = [
  "Run these two shell commands in order, and do not stop if one of them fails:",
  "1. echo allowed > hcm-allowed.txt",
  `2. echo denied > hcm-denied-${DENY_TOKEN}.txt`,
  "If a command is refused, accept the refusal: do not retry it, do not rephrase it,",
  "and do not achieve the same result another way. Then reply with the single word done.",
].join("\n");

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
    user_prompt_submit: fired.has("UserPromptSubmit"),
    // Firing, not blocking. Three plugins in this marketplace refuse commands
    // here, and a refusal that is delivered but ignored looks identical to one
    // that was honoured until something destructive gets through.
    pre_tool_use: fired.has("PreToolUse"),
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

function runClaude(work, logPath, options = {}) {
  const env = { ...process.env, HCM_LOG: logPath, HCM_INJECT_TOKEN: TOKEN };
  if (options.denyToken) env.HCM_DENY_TOKEN = options.denyToken;
  const r = spawnSync(
    "claude",
    ["-p", "--plugin-dir", PLUGIN_ROOT, "--permission-mode", "bypassPermissions"],
    { cwd: work, env, input: options.prompt ?? PROMPT, encoding: "utf8", timeout: 300_000 },
  );
  if (options.denyToken) return blockingResult("claude", version("claude"), work, readLog(logPath), null);
  return summarise(
    "claude",
    version("claude"),
    readLog(logPath),
    `${r.stdout ?? ""}${r.stderr ?? ""}`,
    r.error ? String(r.error.message) : null,
  );
}

// A refusal either stopped the tool or it did not, and the file system says
// which. The model's account of what happened is not the evidence.
function blockingResult(runtime, versionText, work, log, note) {
  const denials = log.filter((r) => r.denying);
  const controlRan = existsSync(join(work, "hcm-allowed.txt"));
  const deniedRan = existsSync(join(work, `hcm-denied-${DENY_TOKEN}.txt`));
  return {
    runtime,
    version: versionText,
    deny_token: DENY_TOKEN,
    refusal_emitted: denials.length > 0,
    control_command_ran: controlRan,
    refused_command_ran: deniedRan,
    // Only meaningful when the control ran: otherwise an absent file says the
    // model never tried, not that the refusal held.
    refusal_stopped_the_tool: controlRan && denials.length > 0 ? !deniedRan : null,
    note,
  };
}

function runCodex(work, logPath, options = {}) {
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
  if (options.denyToken) env.HCM_DENY_TOKEN = options.denyToken;
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
    [
      "exec",
      "--skip-git-repo-check",
      "--dangerously-bypass-hook-trust",
      options.prompt ?? PROMPT,
    ],
    { cwd: work, env, encoding: "utf8", timeout: 300_000 },
  );
  const out = options.denyToken
    ? blockingResult("codex", version("codex"), work, readLog(logPath), note ?? "hook trust bypassed for this measurement")
    : summarise(
        "codex",
        version("codex"),
        readLog(logPath),
        `${r.stdout ?? ""}${r.stderr ?? ""}`,
        note ?? "hook trust bypassed for this measurement",
      );
  rmSync(home, { recursive: true, force: true });
  return out;
}

// Firing and blocking are different claims and cost a turn each, so they are
// separate runs. Each runtime gets its own working directory: the evidence for
// blocking is which files exist afterwards.
const blocking = args.includes("--blocking");
const options = blocking ? { prompt: BLOCKING_PROMPT, denyToken: DENY_TOKEN } : {};

const rows = [];
const dirs = [];
const workFor = () => {
  const dir = mkdtempSync(join(tmpdir(), "hcm-work-"));
  dirs.push(dir);
  return dir;
};

if ((wanted === "all" || wanted === "claude") && have("claude")) {
  rows.push(runClaude(workFor(), join(mkdtempSync(join(tmpdir(), "hcm-log-")), "claude.jsonl"), options));
}
if ((wanted === "all" || wanted === "codex") && have("codex")) {
  rows.push(runCodex(workFor(), join(mkdtempSync(join(tmpdir(), "hcm-log-")), "codex.jsonl"), options));
}
for (const dir of dirs) rmSync(dir, { recursive: true, force: true });

if (rows.length === 0) {
  console.error("No supported runtime found on PATH. Install claude or codex, or pass --runtime.");
  process.exit(2);
}

if (args.includes("--json")) {
  console.log(JSON.stringify({ token: blocking ? DENY_TOKEN : TOKEN, mode: blocking ? "blocking" : "firing", rows }, null, 2));
} else if (blocking) {
  const mark = (value) => (value === null ? "unknown" : value ? "yes" : "NO");
  for (const row of rows) {
    console.log(`\n${row.runtime}  (${row.version})`);
    console.log(`  refusal emitted by the hook   ${mark(row.refusal_emitted)}`);
    console.log(`  control command ran           ${mark(row.control_command_ran)}`);
    console.log(`  refused command ran anyway    ${mark(row.refused_command_ran)}`);
    console.log(`  refusal stopped the tool      ${mark(row.refusal_stopped_the_tool)}`);
    if (row.control_command_ran === false) {
      console.log("  note: the control did not run, so this run proves nothing about the refusal");
    }
    if (row.note) console.log(`  note: ${row.note}`);
  }
  console.log("");
} else {
  const mark = (value) => (value ? "yes" : "NO");
  for (const row of rows) {
    console.log(`\n${row.runtime}  (${row.version})`);
    console.log(`  SessionStart fired            ${mark(row.session_start)}`);
    console.log(`  UserPromptSubmit fired        ${mark(row.user_prompt_submit)}`);
    console.log(`  PreToolUse fired              ${mark(row.pre_tool_use)}`);
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
