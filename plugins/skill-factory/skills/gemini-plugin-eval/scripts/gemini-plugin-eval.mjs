#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { spawnOwned, terminateOwned } from "../../../shared/owned-process.mjs";

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
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
import { priceFor as sharedPriceFor, costOf as sharedCostOf, pricesFor } from '../../../shared/pricing.mjs';
import { adcPath as configuredAdcPath, vertexConfig } from '../../../shared/cloud-config.mjs';

const USAGE = help('gemini');
function fail(message) {
  console.error(`gemini-plugin-eval: ${message}`);
  console.error(USAGE);
  process.exit(64);
}
const parseArgs = (argv) => parseSharedArgs(argv, 'gemini');
const priceFor = (model, opts, input = 0) => sharedPriceFor('gemini', model, opts, input);
const costOf = (usage, opts, model = opts.model) => sharedCostOf('gemini', usage, opts, model);

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

function geminiBinary(explicit) {
  if (explicit) return explicit;
  const found = spawnSync("sh", ["-c", "command -v gemini"], { encoding: "utf8" }).stdout.trim();
  if (!found) throw new Error("gemini is not on PATH");
  return found;
}

function defaultWork() {
  return join(tmpdir(), 'gemini-plugin-eval');
}

const userSettingsPath = join(homedir(), ".gemini", "settings.json");

function readJson(path) {
  if (!existsSync(path)) return undefined;
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch { throw new Error("configuration file is not valid JSON"); }
}

function userModel() {
  const model = readJson(userSettingsPath)?.model;
  return typeof model === "string" ? model : model?.name;
}
function mcpServers(names) {
  if (names.length === 0) return {};
  if (!existsSync(userSettingsPath)) fail("--mcp needs ~/.gemini/settings.json");
  const all = readJson(userSettingsPath).mcpServers ?? {};
  const out = {};
  for (const name of names) {
    if (!all[name]) fail(`--mcp ${name}: no mcpServers.${name} entry in ~/.gemini/settings.json`);
    out[name] = all[name];
  }
  return out;
}
const ALWAYS_EXCLUDED = ["google_web_search", "web_fetch", "list_background_processes", "read_background_output"];
const WRITE_TOOLS = ["write_file", "replace"];
const SHELL_TOOLS = ["run_shell_command"];
const JUDGE_EXCLUDED = [...ALWAYS_EXCLUDED, ...WRITE_TOOLS, ...SHELL_TOOLS, "invoke_agent", "activate_skill"];
const BUILTIN_SKILLS = ["skill-creator", "antigravity-support"];

const authState = { auth: { mode: "oauth", dir: null }, proxy: null };
function makeHome(root, exclude, servers = {}) {
  const home = join(root, "home");
  const gHome = join(home, ".gemini");
  mkdirSync(gHome, { recursive: true });
  const a = authState.auth;
  const authFiles = a.mode === "oauth" ? [a.adcPath] : [];
  const selectedType = a.mode === "api-key" ? "gemini-api-key" : "vertex-ai";
  const settings = {
    security: { auth: { selectedType } },
    tools: { exclude },
    skills: { disabled: BUILTIN_SKILLS },
  };
  if (Object.keys(servers).length) settings.mcpServers = servers;
  writeFileSync(join(gHome, "settings.json"), JSON.stringify(settings), { mode: 0o600 });
  if (a.mode !== "api-key") writeFileSync(join(gHome, ".env"), `GOOGLE_CLOUD_PROJECT=${a.project}\nGOOGLE_CLOUD_LOCATION=${a.location}\nGOOGLE_GENAI_USE_VERTEXAI=true\n`, { mode: 0o600 });
  const cwd = join(root, "cwd");
  mkdirSync(cwd, { recursive: true });
  const mcpText = Object.values(servers)
    .map((s) => `command = ${JSON.stringify(s.command ?? "")}\nargs = ${JSON.stringify(s.args ?? [])}`)
    .join("\n");
  return { root, home, gHome, cwd, authFiles, mcpRo: mcpBinds(mcpText) };
}
function keyVars() {
  if (authState.proxy) return { GOOGLE_API_KEY: authState.proxy.dummyKey, GOOGLE_VERTEX_BASE_URL: authState.proxy.url, GOOGLE_GENAI_USE_VERTEXAI: "true", GOOGLE_CLOUD_PROJECT: authState.auth.project, GOOGLE_CLOUD_LOCATION: authState.auth.location };
  if (authState.auth.mode === "api-key") return { [authState.auth.cliVar]: authState.auth.key };
  return { GOOGLE_APPLICATION_CREDENTIALS: authState.auth.adcPath, GOOGLE_GENAI_USE_VERTEXAI: "true", GOOGLE_CLOUD_PROJECT: authState.auth.project, GOOGLE_CLOUD_LOCATION: authState.auth.location };
}

function envFor(h, withKey = true) {
  return { ...process.env, HOME: h.home, GEMINI_CLI_TRUST_WORKSPACE: "true", ...(withKey ? keyVars() : {}) };
}

const iso = { mode: "bwrap", cli: null };
function launchSpec(gemini, h, args) {
  if (iso.mode === "none") return { command: gemini, args, env: envFor(h) };
  return isolate({
    command: iso.cli.command,
    args,
    env: cleanEnv({ HOME: h.home, GEMINI_CLI_TRUST_WORKSPACE: "true", ...keyVars() }, iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...h.mcpRo, ...h.authFiles],
  });
}
function setupSpec(command, h, args, readOnly) {
  if (iso.mode === "none") return { command, args, env: envFor(h, false) };
  return isolate({
    command,
    args,
    env: cleanEnv({ HOME: h.home, GEMINI_CLI_TRUST_WORKSPACE: "true" }, iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...readOnly],
  });
}

const CLAUDE_EVENTS = {
  PreToolUse: "BeforeTool",
  PostToolUse: "AfterTool",
  SessionStart: "SessionStart",
  SessionEnd: "SessionEnd",
  UserPromptSubmit: "BeforeAgent",
  Stop: "AfterAgent",
  PreCompact: "PreCompress",
  Notification: "Notification",
};
const CLAUDE_TOOLS = {
  Bash: "run_shell_command",
  Write: "write_file",
  Edit: "replace",
  MultiEdit: "replace",
  Read: "read_file",
  Glob: "glob",
  Grep: "grep_search",
  WebFetch: "web_fetch",
  WebSearch: "google_web_search",
};
const HOOK_SHIM = `import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
const r = spawnSync("sh", ["-c", process.argv[2]], { input: readFileSync(0), encoding: "utf8" });
let reason = null;
try {
  const o = JSON.parse(r.stdout.trim().split("\\n").pop() ?? "").hookSpecificOutput;
  if (o?.permissionDecision === "deny" || o?.permissionDecision === "ask") reason = o.permissionDecisionReason ?? "refused by hook";
} catch {}
if (reason) {
  process.stdout.write(JSON.stringify({ decision: "deny", reason }));
  process.exit(0);
}
process.stdout.write(r.stdout);
process.stderr.write(r.stderr);
process.exit(r.status ?? 1);
`;

const shq = (s) => `'${String(s).replaceAll("'", "'\\''")}'`;
function translateHooks(extDir) {
  const file = join(extDir, "hooks", "hooks.json");
  if (!existsSync(file)) return false;
  const shim = join(extDir, "hooks", "gemini-shim.mjs");
  writeFileSync(shim, HOOK_SHIM);
  const src = readJson(file);
  const out = { hooks: {} };
  for (const [event, groups] of Object.entries(src.hooks ?? {})) {
    const name = CLAUDE_EVENTS[event] ?? event;
    out.hooks[name] = groups.map((g) => {
      const wrap = (command) => `node ${shq(shim)} ${shq(command)}`;
      const group = {
        hooks: g.hooks.map((x) => {
          const hook = { ...x, command: wrap(String(x.command).replaceAll("${CLAUDE_PLUGIN_ROOT}", extDir)) };
          if (x.timeout) hook.timeout = Number(x.timeout) * 1000;
          return hook;
        }),
      };
      if (g.matcher) {
        group.matcher = g.matcher
          .split("|")
          .map((t) => CLAUDE_TOOLS[t] ?? t)
          .join("|");
      }
      return group;
    });
  }
  writeFileSync(file, JSON.stringify(out, null, 2));
  return true;
}

async function runSetup(what, spec, h, timeoutMs) {
  const r = await runSpec(spec, { cwd: h.cwd, timeoutMs });
  if (r.code !== 0) throw new Error(`${what} exited ${r.code}: ${redactSecrets(r.stderr || r.stdout, authState.auth).slice(-300)}`);
}

async function installPlugin(gemini, h, pluginDir, marketplaceRoot, hooks) {
  if (!existsSync(join(pluginDir, "gemini-extension.json"))) throw new Error(`no gemini-extension.json in ${pluginDir}`);
  const command = iso.mode === "none" ? gemini : iso.cli.command;
  const args = ["extensions", "install", pluginDir, "--consent", "--skip-settings"];
  await runSetup("extensions install", setupSpec(command, h, args, [pluginDir, marketplaceRoot]), h, 180_000);
  const name = readJson(join(pluginDir, "gemini-extension.json")).name;
  const extDir = join(h.gHome, "extensions", name);
  stripPluginMcp(extDir, { hooks });
  if (hooks) translateHooks(extDir);
}

async function runScaffold(c, h, pluginDir, marketplaceRoot) {
  const file = join(c.absDir, c.scaffold);
  const args = existsSync(file) ? [file] : ["-c", c.scaffold];
  const spec = iso.mode === "none" ? { command: "bash", args, env: { ...process.env, HOME: homedir() } } : setupSpec("bash", h, args, [pluginDir, marketplaceRoot]);
  await runSetup("scaffold", spec, h, 300_000);
}

const children = new Set();
function runGemini(gemini, h, model, prompt, timeoutSeconds) {
  return new Promise((done) => {
    const started = Date.now();
    const args = ["--skip-trust", "-m", model, "--approval-mode", "yolo", "-o", "stream-json", "-p", ""];
    const spec = launchSpec(gemini, h, args);
    const child = spawnOwned(spec, {
      cwd: h.cwd,
      stdio: ["pipe", "pipe", "pipe"],
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
      const events = [];
      for (const line of stdout.split("\n")) {
        if (!line.startsWith("{")) continue;
        try {
          events.push(JSON.parse(line));
        } catch {
        }
      }
      const result = events.find((e) => e.type === "result");
      const usage = {};
      if (result?.stats) {
        const s = result.stats;
        usage.input_tokens = s.input_tokens ?? 0;
        usage.cached_input_tokens = s.cached ?? 0;
        usage.output_tokens = Math.max(0, (s.total_tokens ?? 0) - (s.input_tokens ?? 0));
      }
      let error = spawnError;
      if (!error && timedOut) error = `timeout after ${timeoutSeconds}s`;
      const fatal = events.find((e) => e.type === "error" && e.severity !== "warning");
      if (!error && fatal) error = JSON.stringify(fatal).slice(0, 500);
      if (!error && result && result.status !== "success") error = `result ${JSON.stringify(result.error ?? result.status).slice(0, 400)}`;
      if (!error && !result) error = `gemini produced no result (exit ${code}): ${stderr.slice(-300)}`;
      if (!error && code !== 0) error = `gemini exited ${code}: ${stderr.slice(-300)}`;
      if (error) error = redactSecrets(error, authState.auth);
      done({ events, reply: finalReply(events), usage, durationSeconds: Math.round((Date.now() - started) / 1000), error });
    });
    child.stdin.on("error", () => {});
    child.stdin.end(prompt);
  });
}
function finalReply(events) {
  let text = "";
  for (const e of events) {
    if (e.type === "tool_use" || e.type === "tool_result") text = "";
    else if (e.type === "message" && e.role === "assistant") text += e.content ?? "";
  }
  return text.trim();
}

const USAGE_KEYS = ["input_tokens", "cached_input_tokens", "output_tokens", "reasoning_output_tokens"];

function addUsage(total, usage) {
  for (const k of USAGE_KEYS) total[k] = (total[k] ?? 0) + (usage?.[k] ?? 0);
}

const toolUses = (events) => events.filter((e) => e.type === "tool_use");
function stepsOf(events) {
  return toolUses(events).length + (finalReply(events) ? 1 : 0);
}

function mcpCallsOf(events, serverNames) {
  const failed = new Set(events.filter((e) => e.type === "tool_result" && e.status !== "success").map((e) => e.tool_id));
  return toolUses(events)
    .filter((e) => serverNames.some((s) => e.tool_name.includes(s)) || e.tool_name.startsWith("mcp_"))
    .map((e) => `${e.tool_name}${failed.has(e.tool_id) ? " (failed)" : ""}`);
}
function openedSkills(events) {
  const names = new Set();
  for (const e of toolUses(events)) {
    if (e.tool_name === "activate_skill" && e.parameters?.name) names.add(String(e.parameters.name));
    const path = e.parameters?.file_path ?? e.parameters?.path;
    for (const m of String(path ?? "").matchAll(/\/skills\/([\w.-]+)\/SKILL\.md/g)) names.add(m[1]);
  }
  return [...names];
}

function shellCommandsOf(events) {
  return toolUses(events)
    .filter((e) => e.tool_name === "run_shell_command")
    .map((e) => String(e.parameters?.command ?? ""));
}
function hookEvidenceOf(events) {
  const shellIds = new Map(toolUses(events).filter((e) => e.tool_name === "run_shell_command").map((e) => [e.tool_id, String(e.parameters?.command ?? "")]));
  const attempted = [...shellIds.values()];
  const blocked = [];
  for (const e of events) {
    if (e.type !== "tool_result" || e.status === "success" || !shellIds.has(e.tool_id)) continue;
    const out = String(e.output ?? e.error?.message ?? "");
    if (e.error?.type !== "policy_violation" && !/^Tool execution blocked/.test(out)) continue;
    blocked.push({ hookEvent: "BeforeTool", message: out.slice(0, 500), command: shellIds.get(e.tool_id), callId: e.tool_id });
  }
  const hookEvents = [
    ...attempted.map((command) => ({ kind: "attempted", command })),
    ...blocked.map((b) => ({ kind: "blocked", ...b })),
  ];
  return { attempted, hookEvents, hookBlocked: blocked.length };
}

async function judge(ctx, root, rubric, reply) {
  const { gemini, opts } = ctx;
  const h = makeHome(root, JUDGE_EXCLUDED);
  const prompt = [
    "You grade one reply against a rubric. Use only the rubric and the reply; call no tools.",
    "Answer PASS only if the reply meets every item the rubric requires.",
    'Reply with one JSON object and nothing else: {"verdict": "PASS" or "FAIL", "failed_items": [strings], "reason": string}.',
    "",
    "<rubric>",
    rubric,
    "</rubric>",
    "",
    "<reply>",
    reply,
    "</reply>",
  ].join("\n");
  const r = await runGemini(gemini, h, opts.judgeModel, prompt, opts.judgeTimeout);
  try {
    const m = /\{[\s\S]*\}/.exec(r.reply);
    const v = JSON.parse(m[0]);
    if (v.verdict !== "PASS" && v.verdict !== "FAIL") throw new Error("no verdict");
    return { passed: v.verdict === "PASS", reason: v.reason, failedItems: v.failed_items ?? [], usage: r.usage };
  } catch {
    const why = r.error ?? r.reply.slice(0, 200);
    const noVerdict = Boolean(r.error) && !r.reply.trim();
    return { passed: false, noVerdict, reason: `judge gave no verdict: ${why}`, failedItems: [], usage: r.usage };
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
    if (run.attempted && /^(Bash|shell|exec|exec_command|run_shell_command)$/i.test(g.config.tool ?? "")) {
      const re = new RegExp(g.config.input_match ?? ".");
      const hits = run.attempted.filter((c) => re.test(c));
      const max = g.config.max === undefined ? Infinity : Number(g.config.max);
      const min = g.config.min === undefined ? 1 : Number(g.config.min);
      const range = `${min}..${max === Infinity ? "unbounded" : max}`;
      const passed = hits.length >= min && hits.length <= max;
      return { passed, explanation: `${g.config.tool} attempted ${hits.length}x (expected ${range}): ${hits.join(" | ") || "none"}` };
    }
    if (g.config.tool !== "Skill") return { passed: false, explanation: `tool ${g.config.tool} is not observable under Gemini` };
    const re = new RegExp(g.config.input_match ?? ".");
    const hits = run.opened.filter((s) => re.test(`"skill": "${s}"`));
    const max = g.config.max === undefined ? Infinity : Number(g.config.max);
    const min = g.config.min === undefined ? 1 : Number(g.config.min);
    const range = `${min}..${max === Infinity ? "unbounded" : max}`;
    const passed = hits.length >= min && hits.length <= max;
    return { passed, explanation: `Skill called ${hits.length}x (expected ${range}); skills activated: ${hits.join(", ") || "none"}` };
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
      console.error(`gemini-plugin-eval: ${relative(evalsDir, dir)}: case.yaml cases are not supported, skipped`);
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
<title>Gemini Eval Report</title><style>
:root{--bg:#fff;--fg:#1a1a1a;--muted:#666;--line:#ddd;--err:#b00020}
@media (prefers-color-scheme: dark){:root{--bg:#141414;--fg:#eee;--muted:#999;--line:#333;--err:#ff7a85}}
body{background:var(--bg);color:var(--fg);font:14px/1.5 system-ui,sans-serif;margin:0;padding:16px;max-width:1100px}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:6px;text-align:left;vertical-align:top}
tr.run td{color:var(--muted);font-size:13px}.err{color:var(--err)}ul{margin:4px 0;padding-left:20px}
</style></head><body><h1>Gemini eval: ${esc(s.plugins[0].name)}</h1>
<p>gemini ${esc(result.runtimeVersion)}; subject ${esc(s.modelOverride)}; judge ${esc(s.judgeModel)}; ablation ${esc(s.ablation)}; ${result.durationSeconds}s; costUsd ${result.costUsd === null ? "n/a" : result.costUsd.toFixed(4)}; tokens in ${result.tokens.input_tokens ?? 0} out ${result.tokens.output_tokens ?? 0}${result.partial ? `; partial (${esc(result.partialReason)})` : ""}</p>
<table><thead><tr><th>Case</th><th>With</th><th>Without</th><th>Delta</th><th>Fired</th><th>Pass rate</th></tr></thead><tbody>
${rows.join("\n")}
</tbody></table></body></html>
`;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.runtimeLock) {
    try {
      await assertRuntimeLock({
        runtime: "gemini",
        binary: geminiBinary(opts.gemini),
        path: opts.runtimeLock,
      });
      opts.notes.push("runtime compatibility lock verified");
    } catch (error) {
      fail(error.message);
    }
  }
  for (const note of opts.notes) console.error(`gemini-plugin-eval: ${note}`);
  opts.model ??= userModel();
  if (!opts.model) fail("no model: pass --model or set model.name in ~/.gemini/settings.json");
  opts.judgeModel ??= opts.model;
  opts.judgeEffort ??= opts.effort;
  opts.judgeTimeout = opts.timeout ?? 600;
  opts.work ??= defaultWork();
  opts.notes.push("--effort/--judge-effort: recorded only, Gemini CLI has no reasoning-effort option");
  const priced = priceFor(opts.model, opts, 0) !== null && priceFor(opts.judgeModel, opts, 0) !== null;
  if (opts.maxCostUsd !== undefined && !priced) {
    fail("--max-cost-usd requires known prices or --price-in/--price-out");
  }

  let sandbox = "read-only";
  const exclude = [...ALWAYS_EXCLUDED, ...WRITE_TOOLS, ...SHELL_TOOLS];
  const enable = (names) => {
    for (const n of names) exclude.splice(exclude.indexOf(n), 1);
  };
  const toolNotes = [];
  for (const t of opts.allowTools) {
    const base = t.replace(/\(.*$/, "");
    if ((base === "Write" || base === "Edit") && exclude.includes("write_file")) {
      sandbox = "workspace-write";
      enable(WRITE_TOOLS);
      toolNotes.push(`${t}: write_file and replace enabled, confined to the run dir by Gemini's workspace check`);
    } else if (base === "Bash" && exclude.includes("run_shell_command")) {
      enable(SHELL_TOOLS);
      toolNotes.push(`${t}: run_shell_command enabled, auto-approved and not sandboxed`);
    } else if (base === "Write" || base === "Edit" || base === "Bash") {
      toolNotes.push(`${t}: already enabled`);
    } else {
      toolNotes.push(`${t}: not mapped, Gemini has no equivalent gate`);
    }
  }
  if (opts.hooks && exclude.includes("run_shell_command")) {
    enable(SHELL_TOOLS);
    toolNotes.push("hooks: run_shell_command enabled so BeforeTool hooks have a call to guard, auto-approved and not sandboxed");
  }
  for (const n of toolNotes) console.error(`gemini-plugin-eval: --allow-tools ${n}`);
  if (!opts.scaffold) opts.notes.push("scaffold_script not run (pass --scaffold)");
  if (opts.hooks) {
    const note = "--hooks: hooks/hooks.json is translated to Gemini events and tool names in the with arm's installed extension; the without arm has no plugin";
    console.error(`gemini-plugin-eval: ${note}`);
    opts.notes.push(note);
  }
  const servers = mcpServers(opts.mcp);
  const realServers = opts.mocks === "off" || opts.allowRealServers;
  if (opts.mocks !== undefined || opts.allowRealServers) {
    let note = "no mocks exist under Gemini; the --mcp servers run for real in subject runs";
    if (opts.mcp.length === 0) note = "no-op without --mcp <name>, Gemini runs start no MCP server";
    if (opts.mocks === "record" && opts.mcp.length) note = "--mocks record has no recorder under Gemini; the --mcp servers still run for real";
    const flag = realServers ? "--mocks off/--allow-real-servers" : `--mocks ${opts.mocks}`;
    console.error(`gemini-plugin-eval: ${flag}: ${note}`);
    opts.notes.push(`${flag}: ${note}`);
  }
  if (opts.mcp.length) console.error(`gemini-plugin-eval: --mcp: subject runs get MCP servers ${opts.mcp.join(", ")}; the judge gets none`);

  try {
    authState.auth = resolveAuth({ runtime: "gemini", mode: opts.auth, authFrom: opts.authFrom, apiKeyEnv: opts.apiKeyEnv, operatorDir: join(homedir(), ".gemini") });
  } catch (err) {
    fail(err.message);
  }
  if (authState.auth.mode !== "api-key") {
    const adcPath = configuredAdcPath(opts.authFrom);
    if (!existsSync(adcPath)) fail("Vertex ADC file missing");
    let cloud;
    try { cloud = vertexConfig(opts); } catch (err) { fail(err.message); }
    authState.auth = { ...authState.auth, adcPath, ...cloud };
    if (authState.auth.mode === "oauth") authState.auth.record = { ...authState.auth.record, route: "vertex-ai; read-only host ADC bind, GOOGLE_APPLICATION_CREDENTIALS" };
  }
  if (authState.auth.mode === "proxy") {
    try {
      authState.proxy = await startRuntimeProxy({ runtime: "gemini", dir: authState.auth.dir, vertex: authState.auth, minValidMs: opts.suiteMinutes * 60_000 });
    } catch (err) {
      fail(`--auth proxy: ${err.message}`);
    }
    authState.auth = { ...authState.auth, key: authState.proxy.dummyKey, record: { mode: "proxy", source: authState.auth.source, route: authState.proxy.route } };
    opts.notes.push(`auth proxy: the sandbox holds a per-suite dummy key and ${authState.proxy.url}; ADC and bearer stay outside`);
  }
  const authNote = `auth ${authState.auth.mode} (${authState.auth.source})`;
  opts.notes.push(authNote);
  console.error(`gemini-plugin-eval: ${authNote}`);
  const gemini = geminiBinary(opts.gemini ?? process.env.GEMINI_BIN);
  const geminiVersion = execFileSync(gemini, ["--version"], { encoding: "utf8" }).trim();
  iso.mode = opts.isolation;
  if (iso.mode === "bwrap") {
    if (!bwrapAvailable()) throw new Error("bubblewrap is not installed; install it or pass --isolation none (debugging only)");
    iso.cli = cliBinds(gemini);
  }
  opts.notes.push(describeIsolation(iso.mode));
  console.error(`gemini-plugin-eval: ${describeIsolation(iso.mode)}`);
  const plugin = basename(opts.pluginDir);
  const marketplaceRoot = dirname(dirname(opts.pluginDir));
  const manifest = readJson(join(opts.pluginDir, ".claude-plugin", "plugin.json")) ?? {};
  let evalDirName = opts.evalDir ?? manifest.experimental?.evals ?? "evals";
  if (isAbsolute(evalDirName)) evalDirName = relative(opts.pluginDir, evalDirName);
  evalDirName = evalDirName.replace(/^\.\//, "").replace(/\/$/, "");
  const evalsDir = join(opts.pluginDir, evalDirName);
  if (!existsSync(evalsDir)) fail(`no eval dir ${evalsDir}`);
  if (!existsSync(join(opts.pluginDir, "gemini-extension.json"))) fail(`no gemini-extension.json in ${opts.pluginDir}`);

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
    if (priced && opts.maxCostUsd !== undefined && spent.usd >= opts.maxCostUsd) stopReason = "max-cost-usd";
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
  const ctx = { gemini, opts };
  const slots = cases.map((c) => Object.fromEntries(armNames.map((arm) => [arm, new Array(c.runs).fill(null)])));

  async function executeRun(ci, arm, i) {
    const c = cases[ci];
    const root = join(runRoot, c.name, `${arm}-${i}`);
    const runStarted = new Date().toISOString();
    const launched = await pool(async () => {
      if (checkBudget()) return null;
      const h = makeHome(root, exclude, servers);
      try {
        if (opts.scaffold && c.scaffold) await runScaffold(c, h, opts.pluginDir, marketplaceRoot);
        if (arm === "with") await installPlugin(gemini, h, opts.pluginDir, marketplaceRoot, opts.hooks);
      } catch (err) {
        return { events: [], reply: "", usage: {}, durationSeconds: 0, error: `setup failed: ${String(err.stderr || err).slice(0, 400)}` };
      }
      const res = await runGemini(gemini, h, opts.model, c.prompt, c.timeoutSeconds);
      account(res.usage, opts.model);
      return res;
      if (opts.hooks) res.hookEvidence = hookEvidenceOf(res.events);
      return res;
    });
    if (!launched) return;
    const r = launched;
    mkdirSync(root, { recursive: true });
    writeFileSync(join(root, "trace.jsonl"), redactSecrets(r.events.map((e) => JSON.stringify(e)).join("\n"), authState.auth));
    const opened = openedSkills(r.events);
    const fired = c.tags.length ? opened.some((s) => c.tags.includes(s)) : opened.length > 0;
    const hookEvidence = r.hookEvidence;
    const shell = shellCommandsOf(r.events);
    const run = { opened, reply: r.reply, attempted: hookEvidence?.attempted ?? (exclude.includes("run_shell_command") ? undefined : shell) };
    const judgeUsage = {};
    let skippedPaidGraders = false;
    const unanswered = Boolean(r.error) && !r.reply.trim() && toolUses(r.events).length === 0;
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
      turns: stepsOf(r.events),
      costUsd: costOf(r.usage, opts, opts.model),
      judgeCostUsd: costOf(judgeUsage, opts, opts.judgeModel),
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
      mcpCalls: mcpCallsOf(r.events, opts.mcp),
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
    console.error(`gemini-plugin-eval: ${aggregates.runsFailedBeforeAnswer}/${allRuns.length} runs failed before the model answered (auth, setup or CLI); they have no score`);
  }

  const result = {
    schemaVersion: 1,
    runtime: "gemini",
    runtimeVersion: geminiVersion,
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
      auth: authState.auth.record,
      evalDir: evalDirName,
      sandbox,
      approvalMode: "yolo",
      toolsExcluded: exclude,
      allowTools: toolNotes,
      prices: pricesFor('gemini', opts),
      maxCostUsd: opts.maxCostUsd ?? null,
      maxTokens: opts.maxTokens ?? null,
      notes: opts.notes,
      plugins: [{ name: manifest.name ?? plugin, version: manifest.version ?? null, path: opts.pluginDir }],
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
  const out = JSON.stringify(result, null, 2);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "aggregate-result.json"), out);
  const reportPath = opts.report ?? join(outputDir, "report.html");
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, htmlReport(result));
  if (typeof opts.json === "string") writeFileSync(opts.json, out);
  else if (opts.json) console.log(out);
  console.error(`gemini-plugin-eval: results ${join(outputDir, "aggregate-result.json")}, report ${reportPath}`);

  if (stopReason === "interrupted") process.exit(130);
  if (stopReason) process.exit(2);
  if (allRuns.length > 0 && allRuns.every((r) => r.failedBeforeAnswer)) process.exit(3);
  if (scoredCases.some((c) => c.aggregates.score < opts.threshold)) process.exit(1);
}

main().catch((err) => {
  console.error(`gemini-plugin-eval: ${redactSecrets(err.message ?? err.constructor?.name ?? "Error", authState.auth)}`);
  process.exit(70);
});
