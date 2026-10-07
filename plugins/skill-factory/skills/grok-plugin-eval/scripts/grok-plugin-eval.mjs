#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { spawnOwned, terminateOwned } from "../../../shared/owned-process.mjs";
import { randomUUID } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync,  } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const { bwrapAvailable, cleanEnv, cliBinds, describeIsolation, isolate, mcpBinds, redactSecrets, resolveAuth, runSpec } = await import(
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "shared", "isolate.mjs")
);
const { describeProxyStats, startRuntimeProxy } = await import(
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "shared", "cred-proxy.mjs")
);


import { stripPluginMcp } from '../../../shared/plugin-copy.mjs';
import { help, parseArgs as parseSharedArgs } from '../../../shared/options.mjs';
import { assertRuntimeLock } from '../../../shared/runtime-contract.mjs';
import { isolationScope } from "../../../shared/isolate.mjs";
import { costOf as sharedCostOf, pricesFor } from '../../../shared/pricing.mjs';

const USAGE = help('grok');
function fail(message) {
  console.error(`grok-plugin-eval: ${message}`);
  console.error(USAGE);
  process.exit(64);
}
const parseArgs = (argv) => parseSharedArgs(argv, 'grok');
const costOf = (usage, opts, model = opts.model) => sharedCostOf('grok', usage, opts, model);

function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  const fields = {};
  const lines = (m?.[1] ?? "").split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(lines[i]);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value === "|" || value === ">") {
      const block = [];
      while (i + 1 < lines.length && /^\s+\S|^\s*$/.test(lines[i + 1])) {
        i += 1;
        block.push(lines[i].replace(/^\s{2}/, ""));
      }
      fields[kv[1]] = block.join(value === "|" ? "\n" : " ").trim();
      continue;
    }
    const list = /^\[(.*)\]$/.exec(value);
    if (list) {
      fields[kv[1]] = list[1]
        .split(",")
        .map((s) => s.trim().replace(/^['"](.*)['"]$/, "$1"))
        .filter(Boolean);
      continue;
    }
    value = value.replace(/^'(.*)'$/, "$1").replace(/^"(.*)"$/, "$1");
    fields[kv[1]] = value;
  }
  return fields;
}

const stripFrontmatter = (text) => {
  const m = /^---\n[\s\S]*?\n---\n?/.exec(text);
  return (m ? text.slice(m[0].length) : text).trim();
};

function globToRegex(glob) {
  let re = "";
  for (const ch of glob) {
    if (ch === "*") re += ".*";
    else if (ch === "?") re += ".";
    else re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`);
}

function grokBinary(explicit) {
  if (explicit) return explicit;
  const found = spawnSync("sh", ["-c", "command -v grok"], { encoding: "utf8" }).stdout.trim();
  if (!found) throw new Error("grok is not on PATH");
  return found;
}

const NET_PROFILE = "eval-read-only-net";

const realGrokHome =() => process.env.GROK_HOME ?? join(homedir(), ".grok");

function defaultWork() {
  return join(tmpdir(), 'grok-plugin-eval');
}

function defaultModel(grok) {
  const out = spawnSync(grok, ["models"], { encoding: "utf8" }).stdout ?? "";
  return /Default model:\s*(\S+)/.exec(out)?.[1];
}

function readJson(path) {
  if (!existsSync(path)) return undefined;
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch { throw new Error("configuration file is not valid JSON"); }
}

const tableHeader = (line) => /^\s*\[\[?\s*([^\]]+?)\s*\]\]?\s*(#.*)?$/.exec(line)?.[1];
function mcpTables(names) {
  if (names.length === 0) return "";
  const sources = [join(realGrokHome(), "config.toml")].filter(existsSync);
  if (sources.length === 0) fail("--mcp needs GROK_HOME/config.toml (default ~/.grok/config.toml)");
  const out = [];
  for (const name of names) {
    const keys = [`mcp_servers.${name}`, `mcp_servers."${name}"`];
    const owns = (h) => keys.some((k) => h === k || h.startsWith(`${k}.`));
    let found = false;
    for (const source of sources) {
      const picked = [];
      let inside = false;
      for (const line of readFileSync(source, "utf8").split("\n")) {
        const h = tableHeader(line);
        if (h !== undefined) inside = owns(h.replace(/\s*\.\s*/g, "."));
        if (inside) picked.push(line);
      }
      if (picked.length === 0) continue;
      out.push(...picked);
      found = true;
      break;
    }
    if (!found) fail(`--mcp ${name}: no [mcp_servers.${name}] table in GROK_HOME/config.toml (default ~/.grok/config.toml)`);
  }
  return `\n${out.join("\n")}\n`;
}
function makeHome(root, sandbox, extraConfig = "") {
  const home = join(root, "home");
  const grokHome = join(home, ".grok");
  mkdirSync(grokHome, { recursive: true });
  const lines = ["[skills]", `ignore = ["${join(grokHome, "bundled", "skills")}"]`, "", "[memory]", "enabled = false"];
  if (authState.auth.mode !== "oauth") lines.push("", "[auth]", 'preferred_method = "api_key"');
  const configPath = join(grokHome, "config.toml");
  writeFileSync(configPath, `${lines.join("\n")}\n${extraConfig}`, { mode: 0o600 });
  chmodSync(configPath, 0o600);
  writeFileSync(join(grokHome, "sandbox.toml"), `[profiles.${NET_PROFILE}]\nextends = "read-only"\nrestrict_network = false\n`);
  const auth = authState.auth.mode === "oauth" ? join(authState.auth.dir, "auth.json") : null;
  const hasAuth = auth !== null && existsSync(auth);
  if (hasAuth) symlinkSync(auth, join(grokHome, "auth.json"));
  const cwd = join(root, "cwd");
  mkdirSync(cwd, { recursive: true });
  return { root, home, grokHome, cwd, sandbox, auth: hasAuth ? auth : null, mcpRo: mcpBinds(extraConfig) };
}

const GROK_VARS = (h) => ({ HOME: h.home, GROK_HOME: h.grokHome, GROK_MEMORY: "0", GROK_WEB_FETCH: "0" });

const authState = { auth: { mode: "oauth", dir: null }, proxy: null };
function keyVars() {
  if (authState.proxy) {
    const v1 = `${authState.proxy.url}/v1`;
    return { XAI_API_KEY: authState.proxy.dummyKey, GROK_MODELS_BASE_URL: v1, GROK_CLI_CHAT_PROXY_BASE_URL: v1 };
  }
  if (authState.auth.mode === "api-key") return { [authState.auth.cliVar]: authState.auth.key };
  return {};
}

function envFor(h, withKey = true) {
  const env = { ...process.env, ...GROK_VARS(h), ...(withKey ? keyVars() : {}) };
  delete env.GROK_SANDBOX;
  delete env.GROK_AGENT;
  return env;
}

const iso = { mode: "bwrap", cli: null };
function launchSpec(grok, h, args) {
  if (iso.mode === "none") return { command: grok, args, env: envFor(h) };
  return isolate({
    command: iso.cli.command,
    args,
    env: cleanEnv({ ...GROK_VARS(h), ...keyVars() }, iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...h.mcpRo, ...(h.auth ? [h.auth] : [])],
  });
}
function setupSpec(command, h, args, readOnly) {
  if (iso.mode === "none") return { command, args, env: envFor(h, false) };
  return isolate({
    command,
    args,
    env: cleanEnv(GROK_VARS(h), iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...readOnly],
  });
}

async function runSetup(what, spec, h, timeoutMs) {
  const r = await runSpec(spec, { cwd: h.cwd, timeoutMs });
  if (r.code !== 0) throw new Error(`${what} exited ${r.code}: ${redactSecrets(r.stderr || r.stdout, authState.auth).slice(-300)}`);
}
async function installPlugin(grok, h, pluginDir, marketplaceRoot, withHooks) {
  const command = iso.mode === "none" ? grok : iso.cli.command;
  await runSetup("plugin install", setupSpec(command, h, ["plugin", "install", pluginDir, "--trust"], [pluginDir, marketplaceRoot]), h, 300_000);
  const registry = readJson(join(h.grokHome, "installed-plugins", "registry.json"));
  for (const repo of Object.values(registry?.repos ?? {})) {
    stripPluginMcp(repo.path, { hooks: withHooks });
  }
}

async function runScaffold(c, h, pluginDir, marketplaceRoot) {
  const file = join(c.absDir, c.scaffold);
  const args = existsSync(file) ? [file] : ["-c", c.scaffold];
  const spec = iso.mode === "none" ? { command: "bash", args, env: process.env } : setupSpec("bash", h, args, [pluginDir, marketplaceRoot]);
  await runSetup("scaffold", spec, h, 300_000);
}

const children = new Set();

const USAGE_KEYS = ["input_tokens", "cached_input_tokens", "output_tokens", "reasoning_output_tokens"];

function addUsage(total, usage) {
  for (const k of USAGE_KEYS) total[k] = (total[k] ?? 0) + (usage?.[k] ?? 0);
}

function normalizeUsage(u) {
  return {
    input_tokens: u?.input_tokens ?? 0,
    cached_input_tokens: u?.cache_read_input_tokens ?? 0,
    output_tokens: u?.output_tokens ?? 0,
    reasoning_output_tokens: u?.reasoning_tokens ?? 0,
  };
}

function toolCallsOf(events) {
  return events.filter((e) => e.type === "tool_call");
}
function statusOf(events) {
  const status = new Map();
  for (const e of events) {
    if (e.type === "tool_call_update" && e.status) status.set(e.toolCallId, e.status);
  }
  return status;
}
function replyOf(events) {
  let last = -1;
  events.forEach((e, i) => {
    if (e.type === "tool_call") last = i;
  });
  const text = (from) =>
    events
      .slice(from)
      .filter((e) => e.type === "text")
      .map((e) => e.data)
      .join("");
  return text(last + 1).trim() || text(0).trim();
}

function parseLines(stdout) {
  const events = [];
  for (const line of stdout.split("\n")) {
    if (!line.startsWith("{")) continue;
    try {
      events.push(JSON.parse(line));
    } catch {
    }
  }
  return events;
}

function runGrok(grok, h, prompt, args, timeoutSeconds, format) {
  return new Promise((done) => {
    const promptFile = join(h.root, `prompt-${randomUUID()}.txt`);
    writeFileSync(promptFile, prompt);
    const started = Date.now();
    const full = ["--prompt-file", promptFile, "--output-format", format, "--sandbox", h.sandbox, "--permission-mode", "bypassPermissions", ...args];
    const spec = launchSpec(grok, h, full);
    const child = spawnOwned(spec, {
      cwd: h.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });
    children.add(child);
    let stdout = "";
    let stderr = "";
    let spawnError = null;
    let timedOut = false;
    child.stdout.on("data", (d) => {
      stdout += d;
    });
    child.stderr.on("data", (d) => {
      stderr = (stderr + d).slice(-4000);
    });
    const timer = setTimeout(() => {
      timedOut = true;
      terminateOwned(child);
    }, timeoutSeconds * 1000);
    child.on("error", (err) => {
      spawnError = String(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      children.delete(child);
      let events = [];
      let reply = "";
      let usage = normalizeUsage();
      let costUsd = 0;
      let turns = 0;
      let structured = null;
      let stopReason = null;
      if (format === "streaming-json") {
        events = parseLines(stdout);
        reply = replyOf(events);
        const end = events.find((e) => e.type === "end");
        stopReason = end?.stopReason ?? null;
        turns = end?.num_turns ?? 0;
        costUsd = end?.total_cost_usd ?? 0;
        if (end) usage = normalizeUsage(end.usage);
        else for (const e of events.filter((ev) => ev.type === "usage")) addUsage(usage, normalizeUsage(e.usage));
      } else {
        try {
          const j = JSON.parse(stdout);
          reply = j.text ?? "";
          structured = j.structuredOutput ?? null;
          stopReason = j.stopReason ?? null;
          turns = j.num_turns ?? 0;
          costUsd = j.total_cost_usd ?? 0;
          usage = normalizeUsage(j.usage);
        } catch {
        }
      }
      const failed = events.find((e) => e.type === "error");
      let error = spawnError;
      if (!error && timedOut) error = `timeout after ${timeoutSeconds}s`;
      if (!error && failed) error = JSON.stringify(failed).slice(0, 500);
      if (!error && code !== 0) error = `grok exited ${code}: ${(stderr || stdout).slice(-300)}`;
      if (!error && stopReason !== "end_turn") error = `stopReason ${stopReason ?? "missing"}: ${(stderr || stdout).slice(-200)}`;
      if (error) error = redactSecrets(error, authState.auth);
      done({ events, reply, usage, costUsd, turns, structured, durationSeconds: Math.round((Date.now() - started) / 1000), error });
    });
  });
}

const SKILL_PATH = /\/skills\/([\w.-]+)\/SKILL\.md/g;
function openedSkills(events) {
  const names = new Set();
  for (const e of toolCallsOf(events)) {
    if (["grep", "list_dir", "search_replace", "write"].includes(e.toolName)) continue;
    for (const m of JSON.stringify(e.rawInput ?? {}).matchAll(SKILL_PATH)) names.add(m[1]);
  }
  return [...names];
}

function commandsOf(events) {
  return toolCallsOf(events)
    .filter((e) => e.toolName === "run_terminal_command")
    .map((e) => String(e.rawInput?.command ?? ""));
}

function mcpCallsOf(events) {
  const status = statusOf(events);
  return toolCallsOf(events)
    .filter((e) => e.toolName === "use_tool" || String(e.toolName).startsWith("mcp"))
    .map((e) => {
      const r = e.rawInput ?? {};
      const label = String(r.tool_name ?? e.toolName).replace("__", "/");
      return `${label}${status.get(e.toolCallId) === "failed" ? " (failed)" : ""}`;
    });
}

function jsonlOf(file) {
  const rows = [];
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (!line.startsWith("{")) continue;
    try {
      rows.push(JSON.parse(line));
    } catch {
    }
  }
  return rows;
}

function historyFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = join(dir, d.name);
    if (d.isDirectory()) return historyFiles(p);
    return d.name === "chat_history.jsonl" ? [p] : [];
  });
}
function hookEvidenceOf(grokHome, events) {
  const attempted = commandsOf(events);
  const byId = new Map(toolCallsOf(events).map((e) => [e.toolCallId, e]));
  const blocked = [];
  for (const file of historyFiles(join(grokHome, "sessions"))) {
    for (const row of jsonlOf(file)) {
      if (row.type !== "tool_result") continue;
      const m = /^Hook denied:\s*([\s\S]*)$/.exec(String(row.content ?? ""));
      if (!m) continue;
      const call = byId.get(row.tool_call_id);
      blocked.push({ hookEvent: null, message: m[1].trim(), command: String(call?.rawInput?.command ?? call?.toolName ?? ""), callId: row.tool_call_id });
    }
  }
  const hookEvents = [
    ...attempted.map((command) => ({ kind: "attempted", command })),
    ...blocked.map((b) => ({ kind: "blocked", ...b })),
  ];
  return { attempted, hookEvents, hookBlocked: blocked.length };
}

const VERDICT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "failed_items", "reason"],
  properties: {
    verdict: { type: "string", enum: ["PASS", "FAIL"] },
    failed_items: { type: "array", items: { type: "string" } },
    reason: { type: "string" },
  },
};

async function judge(ctx, root, rubric, reply) {
  const { grok, opts } = ctx;
  const h = makeHome(root, "read-only");
  const prompt = [
    "You grade one reply against a rubric. Use only the rubric and the reply; run no commands.",
    "Answer PASS only if the reply meets every item the rubric requires.",
    "",
    "<rubric>",
    rubric,
    "</rubric>",
    "",
    "<reply>",
    reply,
    "</reply>",
  ].join("\n");
  const args = ["-m", opts.judgeModel, "--effort", opts.judgeEffort, "--tools", "", "--disable-web-search", "--json-schema", JSON.stringify(VERDICT_SCHEMA)];
  const r = await runGrok(grok, h, prompt, args, opts.judgeTimeout, "json");
  const v = r.structured ?? tryParse(r.reply);
  if (v && (v.verdict === "PASS" || v.verdict === "FAIL")) {
    return { passed: v.verdict === "PASS", reason: v.reason, failedItems: v.failed_items ?? [], usage: r.usage, costUsd: r.costUsd };
  }
  const why = r.error ?? r.reply.slice(0, 200);
  const noVerdict = Boolean(r.error) && !r.reply.trim() && !r.structured;
  return { passed: false, noVerdict, reason: `judge gave no verdict: ${why}`, failedItems: [], usage: r.usage, costUsd: r.costUsd };
}

function tryParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function readGraders(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const text = readFileSync(join(dir, f), "utf8");
      const fm = frontmatter(text);
      const body = stripFrontmatter(text);
      const { type, weight, ...rest } = fm;
      const config = type === "llm" ? { criteria: body, focus: "last_message", ...rest } : rest;
      return { name: f.replace(/\.md$/, ""), type, weight: Number(weight ?? 1), graderMarkdown: body, config };
    });
}
function graderRole(g, ablation) {
  const negative = g.type === "tool_used" && Number(g.config.max) === 0;
  let withOnly = g.config.arm === "with" || (g.type === "tool_used" && g.config.arm !== "both");
  if (negative || ablation === "none") withOnly = false;
  return { withOnly, arms: withOnly ? ["with"] : ["with", "without"] };
}

function gradeFree(g, run) {
  if (g.type === "tool_used") {
    if (/^(Bash|shell|exec|exec_command|run_terminal_command)$/i.test(g.config.tool ?? "")) {
      const re = new RegExp(g.config.input_match ?? ".");
      const hits = run.attempted.filter((c) => re.test(c));
      const max = g.config.max === undefined ? Infinity : Number(g.config.max);
      const min = g.config.min === undefined ? 1 : Number(g.config.min);
      const range = `${min}..${max === Infinity ? "unbounded" : max}`;
      const passed = hits.length >= min && hits.length <= max;
      return { passed, explanation: `${g.config.tool} attempted ${hits.length}x (expected ${range}): ${hits.join(" | ") || "none"}` };
    }
    if (g.config.tool !== "Skill") return { passed: false, explanation: `tool ${g.config.tool} is not observable under Grok` };
    const re = new RegExp(g.config.input_match ?? ".");
    const hits = run.opened.filter((s) => re.test(`"skill": "${s}"`));
    const max = g.config.max === undefined ? Infinity : Number(g.config.max);
    const min = g.config.min === undefined ? 1 : Number(g.config.min);
    const range = `${min}..${max === Infinity ? "unbounded" : max}`;
    const passed = hits.length >= min && hits.length <= max;
    return { passed, explanation: `Skill called ${hits.length}x (expected ${range}); SKILL.md read: ${hits.join(", ") || "none"}` };
  }
  if (g.type === "regex") {
    const pattern = g.config.pattern ?? g.graderMarkdown;
    const passed = new RegExp(pattern, g.config.flags ?? "").test(run.reply);
    return { passed, explanation: `pattern ${pattern}`, evidence: run.reply };
  }
  return null;
}
function makePool(size) {
  let active = 0;
  const queue = [];
  const release = () => {
    active -= 1;
    const next = queue.shift();
    if (!next) return;
    active += 1;
    next();
  };
  return async (fn, front = false) => {
    if (active < size) active += 1;
    else await new Promise((r) => (front ? queue.unshift(r) : queue.push(r)));
    try {
      return await fn();
    } finally {
      release();
    }
  };
}

function findCases(evalsDir) {
  const found = [];
  const walk = (dir) => {
    if (existsSync(join(dir, "prompt.md"))) {
      found.push(dir);
      return;
    }
    if (existsSync(join(dir, "case.yaml"))) {
      console.error(`grok-plugin-eval: ${relative(evalsDir, dir)}: case.yaml cases are not supported, skipped`);
      return;
    }
    for (const n of readdirSync(dir).sort()) {
      if (n === "results" || n === "mocks" || n.startsWith(".")) continue;
      if (statSync(join(dir, n)).isDirectory()) walk(join(dir, n));
    }
  };
  walk(evalsDir);
  return found;
}

function loadCase(dir, evalDirName, opts) {
  const promptMd = readFileSync(join(dir, "prompt.md"), "utf8");
  const fm = frontmatter(promptMd);
  const tags = Array.isArray(fm.tags) ? fm.tags : [];
  let timeoutSeconds = 600;
  if (fm.timeout_seconds) timeoutSeconds = Number(fm.timeout_seconds);
  if (opts.timeout) timeoutSeconds = opts.timeout;
  return {
    name: basename(dir),
    absDir: dir,
    dir: join(evalDirName, relative(join(opts.pluginDir, evalDirName), dir)),
    tags,
    scaffold: fm.scaffold_script,
    prompt: stripFrontmatter(promptMd),
    runs: opts.runs ?? (fm.runs ? Number(fm.runs) : 3),
    timeoutSeconds,
    maxTurns: fm.max_turns ? Number(fm.max_turns) : null,
    graders: readGraders(join(dir, "graders")),
  };
}

function mean(values) {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

const fmt = (n) => (n === null || n === undefined ? "-" : Number(n).toFixed(2));

function verdictLabel(g) {
  if (g.passed === null) return "NOT GRADED";
  return `${g.passed ? "PASS" : "FAIL"}${g.scored ? "" : " (indicator)"}`;
}

function htmlReport(result) {
  const rows = [];
  for (const c of result.cases) {
    const a = c.aggregates;
    rows.push(
      `<tr><td>${esc(c.name)}</td><td>${fmt(a.score)}</td><td>${fmt(a.scoreWithout)}</td><td>${fmt(a.delta)}</td><td>${esc(a.fired)}</td><td>${fmt(a.passRate)}</td></tr>`,
    );
    for (const [arm, runs] of Object.entries(c.arms)) {
      runs.forEach((r, i) => {
        const verdicts = r.graders
          .map((g) => `<li><b>${esc(g.name)}</b> ${verdictLabel(g)}: ${esc(g.explanation)}</li>`)
          .join("");
        const err = r.error ? `<p class="err">${esc(r.error)}</p>` : "";
        rows.push(
          `<tr class="run"><td colspan="6">${esc(arm)} run ${i + 1}: score ${fmt(r.score)}, fired ${r.fired ? "yes" : "no"}, ${r.durationSeconds}s, tokens in ${r.tokens.input_tokens ?? 0} out ${r.tokens.output_tokens ?? 0}${err}<ul>${verdicts}</ul></td></tr>`,
        );
      });
    }
  }
  const s = result.suite;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Grok Eval Report</title><style>
:root{--bg:#fff;--fg:#1a1a1a;--muted:#666;--line:#ddd;--err:#b00020}
@media (prefers-color-scheme: dark){:root{--bg:#141414;--fg:#eee;--muted:#999;--line:#333;--err:#ff7a85}}
body{background:var(--bg);color:var(--fg);font:14px/1.5 system-ui,sans-serif;margin:0;padding:16px;max-width:1100px}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:6px;text-align:left;vertical-align:top}
tr.run td{color:var(--muted);font-size:13px}.err{color:var(--err)}ul{margin:4px 0;padding-left:20px}
</style></head><body><h1>Grok eval: ${esc(s.plugins[0].name)}</h1>
<p>${esc(result.runtimeVersion)}; subject ${esc(s.modelOverride)} (${esc(s.effort)}); judge ${esc(s.judgeModel)} (${esc(s.judgeEffort)}); ablation ${esc(s.ablation)}; ${result.durationSeconds}s; costUsd ${result.costUsd === null ? "n/a" : result.costUsd.toFixed(4)}; tokens in ${result.tokens.input_tokens ?? 0} out ${result.tokens.output_tokens ?? 0}${result.partial ? `; partial (${esc(result.partialReason)})` : ""}</p>
<table><thead><tr><th>Case</th><th>With</th><th>Without</th><th>Delta</th><th>Fired</th><th>Pass rate</th></tr></thead><tbody>
${rows.join("\n")}
</tbody></table></body></html>
`;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.runtimeLock) {
    try {
      opts.verifyRuntime = await assertRuntimeLock({
        runtime: "grok",
        binary: grokBinary(opts.grok),
        path: opts.runtimeLock,
      });
      opts.notes.push("runtime compatibility lock verified");
    } catch (error) {
      fail(error.message);
    }
  }
  for (const note of opts.notes) console.error(`grok-plugin-eval: ${note}`);
  try {
    authState.auth = resolveAuth({ runtime: "grok", mode: opts.auth, authFrom: opts.authFrom, apiKeyEnv: opts.apiKeyEnv, operatorDir: realGrokHome() });
  } catch (err) {
    fail(err.message);
  }
  if (authState.auth.mode !== "api-key" && authState.auth.source === "auth-from" && !existsSync(join(authState.auth.dir, "auth.json"))) {
    fail(`--auth-from ${authState.auth.dir} has no auth.json`);
  }
  if (authState.auth.mode === "proxy") {
    try {
      authState.proxy = await startRuntimeProxy({ runtime: "grok", dir: authState.auth.dir, minValidMs: opts.suiteMinutes * 60_000 });
    } catch (err) {
      fail(`--auth proxy: ${err.message} (or pass --auth api-key, or --auth oauth for debugging)`);
    }
    authState.auth = { ...authState.auth, key: authState.proxy.dummyKey, record: { mode: "proxy", source: authState.auth.source, route: authState.proxy.route } };
    opts.notes.push(`auth proxy: the sandbox holds a per-suite dummy key and ${authState.proxy.url}; the session key (expires ${authState.proxy.expiresAt}) stays outside`);
  }
  const authNote = `auth ${authState.auth.mode} (${authState.auth.source})`;
  opts.notes.push(authNote);
  console.error(`grok-plugin-eval: ${authNote}`);
  const grok = grokBinary(opts.grok ?? process.env.GROK_BIN);
  const grokVersion = execFileSync(grok, ["--version"], { encoding: "utf8" }).trim();
  iso.mode = opts.isolation;
  if (iso.mode === "bwrap") {
    if (!bwrapAvailable()) throw new Error("bubblewrap is not installed; install it or pass --isolation none (debugging only)");
    iso.cli = cliBinds(grok);
  }
  opts.notes.push(describeIsolation(iso.mode));
  console.error(`grok-plugin-eval: ${describeIsolation(iso.mode)}`);
  opts.model ??= defaultModel(grok);
  if (!opts.model) fail("no model: pass --model or configure a default in Grok CLI");
  opts.judgeModel ??= opts.model;
  const priced = pricesFor("grok", opts) !== null;
  if (opts.maxCostUsd !== undefined && !priced) fail("--max-cost-usd requires known prices or --price-in/--price-out");
  opts.judgeEffort ??= opts.effort;
  opts.judgeTimeout = opts.timeout ?? 600;
  opts.work ??= defaultWork();

  let sandbox = "read-only";
  const toolNotes = [];
  for (const t of opts.allowTools) {
    const base = t.replace(/\(.*$/, "");
    if (base === "Write" || base === "Edit") {
      sandbox = "workspace";
      toolNotes.push(`${t}: sandbox profile workspace (writes in the run dir and /tmp)`);
    } else if (base === "Bash") {
      toolNotes.push(`${t}: no change, shell commands already run in the sandbox`);
    } else {
      toolNotes.push(`${t}: not mapped, Grok has no equivalent gate`);
    }
  }
  for (const n of toolNotes) console.error(`grok-plugin-eval: --allow-tools ${n}`);
  if (opts.mcp.length && sandbox === "read-only") {
    sandbox = NET_PROFILE;
    const note = `--mcp: sandbox ${NET_PROFILE} (read-only filesystem, network allowed) because the sandbox also confines MCP server processes; shell commands then reach the network in both arms`;
    console.error(`grok-plugin-eval: ${note}`);
    opts.notes.push(note);
  }
  if (!opts.scaffold) opts.notes.push("scaffold_script not run (pass --scaffold)");
  if (opts.hooks) {
    const note = "--hooks: the with arm keeps the plugin's hooks (installed with --trust); without --hooks the installed copy has its hooks removed";
    console.error(`grok-plugin-eval: ${note}`);
    opts.notes.push(note);
  }
  const mcpConfig = mcpTables(opts.mcp);
  const realServers = opts.mocks === "off" || opts.allowRealServers;
  if (opts.mocks !== undefined || opts.allowRealServers) {
    let note = "no mocks exist under Grok; the --mcp servers run for real in subject runs";
    if (opts.mcp.length === 0) note = "no-op without --mcp <name>, Grok runs start no MCP server";
    if (opts.mocks === "record" && opts.mcp.length) note = "--mocks record has no recorder under Grok; the --mcp servers still run for real";
    const flag = realServers ? "--mocks off/--allow-real-servers" : `--mocks ${opts.mocks}`;
    console.error(`grok-plugin-eval: ${flag}: ${note}`);
    opts.notes.push(`${flag}: ${note}`);
  }
  if (opts.mcp.length) console.error(`grok-plugin-eval: --mcp: subject runs get MCP servers ${opts.mcp.join(", ")}; the judge gets none`);

  const plugin = basename(opts.pluginDir);
  const marketplaceRoot = dirname(dirname(opts.pluginDir));
  const marketplace = readJson(join(marketplaceRoot, ".claude-plugin", "marketplace.json"));
  if (!marketplace?.name) fail(`no .claude-plugin/marketplace.json with a name under ${marketplaceRoot}`);
  const manifest = readJson(join(opts.pluginDir, ".claude-plugin", "plugin.json")) ?? {};
  let evalDirName = opts.evalDir ?? manifest.experimental?.evals ?? "evals";
  if (isAbsolute(evalDirName)) evalDirName = relative(opts.pluginDir, evalDirName);
  evalDirName = evalDirName.replace(/^\.\//, "").replace(/\/$/, "");
  const evalsDir = join(opts.pluginDir, evalDirName);
  if (!existsSync(evalsDir)) fail(`no eval dir ${evalsDir}`);

  const globs = opts.cases.map(globToRegex);
  const cases = findCases(evalsDir)
    .map((d) => loadCase(d, evalDirName, opts))
    .filter((c) => globs.length === 0 || globs.some((re) => re.test(c.name)))
    .filter((c) => opts.tags.length === 0 || c.tags.some((t) => opts.tags.includes(t)));
  if (cases.length === 0) fail("no case matches the filters");

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const runRoot = join(opts.work, `${plugin}-${stamp}`);
  const outputDir = opts.outputDir ?? join(evalsDir, "results", stamp);
  const startedAt = new Date().toISOString();
  const armNames = opts.ablation === "none" ? ["with"] : ["with", "without"];
  const spent = { usd: 0, tokens: {} };
  let stopReason = null;
  const checkBudget = () => {
    if (stopReason) return stopReason;
    const used = (spent.tokens.input_tokens ?? 0) + (spent.tokens.output_tokens ?? 0);
    if (opts.maxTokens !== undefined && used >= opts.maxTokens) stopReason = "max-tokens";
    if (opts.maxCostUsd !== undefined && spent.usd >= opts.maxCostUsd) stopReason = "max-cost-usd";
    return stopReason;
  };
  const account = (usage, model) => {
    addUsage(spent.tokens, usage);
    spent.usd += costOf(usage, opts, model) ?? 0;
  };
  process.on("SIGINT", () => {
    stopReason = "interrupted";
    for (const child of children) {
      terminateOwned(child);
    }
  });

  const pool = makePool(opts.concurrency);
  const ctx = { grok, opts };
  const slots = cases.map((c) => Object.fromEntries(armNames.map((arm) => [arm, new Array(c.runs).fill(null)])));

  async function executeRun(ci, arm, i) {
    const c = cases[ci];
    const root = join(runRoot, c.name, `${arm}-${i}`);
    const runStarted = new Date().toISOString();
    const launched = await pool(async () => {
      if (checkBudget()) return null;
      const h = makeHome(root, sandbox, mcpConfig);
      try {
        if (opts.scaffold && c.scaffold) await runScaffold(c, h, opts.pluginDir, marketplaceRoot);
        if (arm === "with") await installPlugin(grok, h, opts.pluginDir, marketplaceRoot, opts.hooks);
      } catch (err) {
        return { events: [], reply: "", usage: normalizeUsage(), costUsd: 0, turns: 0, durationSeconds: 0, error: `setup failed: ${String(err.stderr || err).slice(0, 400)}` };
      }
      const args = ["-m", opts.model, "--effort", opts.effort, "--disable-web-search"];
      const res = await runGrok(grok, h, c.prompt, args, c.timeoutSeconds, "streaming-json");
      account(res.usage, opts.model);
      return res;
      if (opts.hooks) res.hookEvidence = hookEvidenceOf(h.grokHome, res.events);
      return res;
    });
    if (!launched) return;
    const r = launched;
    writeFileSync(join(root, "trace.jsonl"), redactSecrets(r.events.map((e) => JSON.stringify(e)).join("\n"), authState.auth));
    const opened = openedSkills(r.events);
    const fired = c.tags.length ? opened.some((s) => c.tags.includes(s)) : opened.length > 0;
    const hookEvidence = r.hookEvidence;
    const run = { opened, reply: r.reply, attempted: hookEvidence?.attempted ?? commandsOf(r.events) };
    const judgeUsage = {};
    let judgeCostUsd = 0;
    let skippedPaidGraders = false;
    const unanswered = Boolean(r.error) && !r.reply.trim() && toolCallsOf(r.events).length === 0;
    const graded = await Promise.all(
      c.graders.map(async (g) => {
        const role = graderRole(g, opts.ablation);
        if (!role.arms.includes(arm)) return null;
        const base = { name: g.name, weight: g.weight, withOnly: role.withOnly, scored: !role.withOnly };
        if (unanswered) return { ...base, passed: null, scored: false, explanation: "not graded: the run failed before the model answered", evidence: null };
        if (g.type !== "llm") {
          const v = gradeFree(g, run);
          if (!v) return null;
          return { name: base.name, passed: v.passed, weight: base.weight, explanation: v.explanation, withOnly: base.withOnly, scored: base.scored, evidence: v.evidence ?? null };
        }
        if (r.error) return { ...base, passed: false, explanation: "run failed, not judged", judgeVotes: [], evidence: r.reply };
        const votes = await Promise.all(
          Array.from({ length: opts.judgeVotes }, (_, k) =>
            pool(async () => {
              if (checkBudget()) return null;
              const v = await judge(ctx, join(root, `judge-${g.name}-${k}`), g.graderMarkdown, r.reply);
              account(v.usage, opts.judgeModel);
              addUsage(judgeUsage, v.usage);
              judgeCostUsd += costOf(v.usage, opts, opts.judgeModel) ?? 0;
              return v;
            }, true),
          ),
        );
        if (votes.some((v) => !v)) {
          skippedPaidGraders = true;
          return null;
        }
        const answered = votes.filter((v) => !v.noVerdict);
        if (answered.length === 0) {
          return { ...base, passed: null, scored: false, explanation: `not graded: every judge call failed before answering. ${votes[0].reason.slice(0, 300)}`, judgeVotes: [], evidence: r.reply };
        }
        const passes = answered.filter((v) => v.passed).length;
        const passed = passes * 2 > answered.length;
        const majority = answered.find((v) => v.passed === passed);
        const tally = votes.map((v) => (v.noVerdict ? "ERROR" : v.passed ? "PASS" : "FAIL")).join(" ");
        return {
          ...base,
          passed,
          explanation: `judge votes: ${tally}. ${majority.reason}`,
          judgeVotes: answered.map((v) => v.passed),
          judgeReasons: votes.map((v) => v.reason),
          failedItems: majority.failedItems,
          evidence: r.reply,
        };
      }),
    );
    const graders = graded.filter(Boolean);
    const scored = graders.filter((g) => g.scored);
    const totalWeight = scored.reduce((a, g) => a + g.weight, 0);
    const passedWeight = scored.filter((g) => g.passed).reduce((a, g) => a + g.weight, 0);
    const ungraded = skippedPaidGraders || graders.some((g) => g.passed === null);
    let score = 0;
    if (!r.error && totalWeight > 0) score = passedWeight / totalWeight;
    if (!r.error && totalWeight === 0 && ungraded) score = null;
    if (unanswered) score = null;
    slots[ci][arm][i] = {
      score,
      passed: score !== null && score >= opts.threshold,
      turns: r.turns,
      costUsd: costOf(r.usage, opts, opts.model),
      judgeCostUsd: priced ? judgeCostUsd : null,
      durationSeconds: r.durationSeconds,
      startedAt: runStarted,
      error: r.error,
      failedBeforeAnswer: unanswered,
      tracePath: join(root, "trace.jsonl"),
      skippedPaidGraders,
      graders,
      tokens: r.usage,
      judgeTokens: judgeUsage,
      fired,
      skillsOpened: opened,
      mcpCalls: mcpCallsOf(r.events),
      contaminated: arm === "without" && fired,
      ...(hookEvidence ? { hookEvents: hookEvidence.hookEvents, hookBlocked: hookEvidence.hookBlocked } : {}),
    };
    const errText = r.error ? `, error ${r.error.slice(0, 120)}` : "";
    let scoreText = score === null ? "none (graders skipped or not graded)" : score.toFixed(2);
    if (unanswered) scoreText = "none (failed before the model answered)";
    console.error(`${c.name} ${arm} ${i + 1}/${c.runs}: score ${scoreText}, skills opened [${opened.join(", ")}]${errText}`);
  }

  const jobs = [];
  cases.forEach((c, ci) => {
    for (const arm of armNames) for (let i = 0; i < c.runs; i += 1) jobs.push(executeRun(ci, arm, i));
  });
  await Promise.all(jobs);

  const caseResults = cases.map((c, ci) => {
    const arms = {};
    for (const arm of armNames) arms[arm] = slots[ci][arm].filter(Boolean);
    const withRuns = arms.with;
    const scoredRuns = (runs) => runs.filter((r) => r.score !== null);
    const aggregates = {
      score: mean(scoredRuns(withRuns).map((r) => r.score)),
      passRate: mean(scoredRuns(withRuns).map((r) => (r.passed ? 1 : 0))),
    };
    if (arms.without) {
      aggregates.scoreWithout = mean(scoredRuns(arms.without).map((r) => r.score));
      aggregates.passRateWithout = mean(scoredRuns(arms.without).map((r) => (r.passed ? 1 : 0)));
      aggregates.delta = aggregates.score === null || aggregates.scoreWithout === null ? null : aggregates.score - aggregates.scoreWithout;
    }
    aggregates.fired = `${withRuns.filter((r) => r.fired).length}/${withRuns.length}`;
    aggregates.firedRate = mean(withRuns.map((r) => (r.fired ? 1 : 0)));
    return {
      name: c.name,
      dir: c.dir,
      source: "prose",
      promptMarkdown: c.prompt,
      runsPerCase: c.runs,
      timeoutSeconds: c.timeoutSeconds,
      maxTurns: c.maxTurns,
      graders: c.graders,
      arms,
      aggregates,
    };
  });

  const scoredCases = caseResults.filter((c) => c.aggregates.score !== null);
  const deltas = caseResults.map((c) => c.aggregates.delta).filter((d) => d !== null && d !== undefined);
  const aggregates = {
    casesTotal: caseResults.length,
    casesPassed: scoredCases.filter((c) => c.aggregates.score >= opts.threshold).length,
    overallScore: mean(scoredCases.map((c) => c.aggregates.score)),
    overallPassRate: mean(scoredCases.map((c) => c.aggregates.passRate)),
  };
  if (opts.ablation !== "none") aggregates.meanDelta = mean(deltas);
  const allRuns = caseResults.flatMap((c) => Object.values(c.arms).flat());
  aggregates.runsFailedBeforeAnswer = allRuns.filter((r) => r.failedBeforeAnswer).length;
  if (aggregates.runsFailedBeforeAnswer) {
    console.error(`grok-plugin-eval: ${aggregates.runsFailedBeforeAnswer}/${allRuns.length} runs failed before the model answered (auth, setup or CLI); they have no score`);
  }

  const result = {
    schemaVersion: 1,
    runtime: "grok",
    runtimeVersion: grokVersion,
    startedAt,
    durationSeconds: Math.round((Date.now() - Date.parse(startedAt)) / 1000),
    costUsd: priced ? spent.usd : null,
    partial: Boolean(stopReason),
    partialReason: stopReason,
    tokens: spent.tokens,
    suite: {
      root: opts.pluginDir,
      ablation: opts.ablation,
      modelOverride: opts.model,
      judgeModel: opts.judgeModel,
      effort: opts.effort,
      judgeEffort: opts.judgeEffort,
      judgeVotes: opts.judgeVotes,
      caseFilter: opts.cases.length ? opts.cases.join(",") : null,
      tagFilter: opts.tags.length ? opts.tags : null,
      threshold: opts.threshold,
      concurrency: opts.concurrency,
      mcp: opts.mcp,
      hooks: opts.hooks,
      isolation: opts.isolation,
      isolationScope: isolationScope(opts.isolation),
      auth: authState.auth.record,
      evalDir: evalDirName,
      sandbox,
      allowTools: toolNotes,
      prices: pricesFor("grok", opts),
      maxCostUsd: opts.maxCostUsd ?? null,
      maxTokens: opts.maxTokens ?? null,
      notes: opts.notes,
      plugins: [
        {
          name: manifest.name ?? plugin,
          version: manifest.version ?? null,
          path: opts.pluginDir,
        },
      ],
    },
    cases: caseResults,
    aggregates,
  };

  if (authState.proxy) {
    opts.notes.push(describeProxyStats(authState.proxy.stats));
    await authState.proxy.close();
  }
  if (!opts.keep) {
    for (const c of caseResults) for (const runs of Object.values(c.arms)) for (const r of runs) r.tracePath = null;
    rmSync(runRoot, { recursive: true, force: true });
  }
  if (opts.verifyRuntime) await opts.verifyRuntime();
  result.suite.runtimeLock = {
    checkedBefore: Boolean(opts.verifyRuntime),
    checkedAfter: Boolean(opts.verifyRuntime),
  };
  const out = JSON.stringify(result, null, 2);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "aggregate-result.json"), out);
  const reportPath = opts.report ?? join(outputDir, "report.html");
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, htmlReport(result));
  if (typeof opts.json === "string") writeFileSync(opts.json, out);
  else if (opts.json) console.log(out);
  console.error(`grok-plugin-eval: results ${join(outputDir, "aggregate-result.json")}, report ${reportPath}`);

  if (stopReason === "interrupted") process.exit(130);
  if (stopReason) process.exit(2);
  if (allRuns.length > 0 && allRuns.every((r) => r.failedBeforeAnswer)) process.exit(3);
  if (scoredCases.some((c) => c.aggregates.score < opts.threshold)) process.exit(1);
}

main().catch((err) => {
  console.error(`grok-plugin-eval: ${redactSecrets(err.message ?? err.constructor?.name ?? "Error", authState.auth)}`);
  process.exit(70);
});
