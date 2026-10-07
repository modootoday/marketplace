#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { spawnOwned, terminateOwned } from "../../../shared/owned-process.mjs";

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { antigravityToolEvents } from '../../../shared/antigravity-events.mjs';
import { antigravityModel } from "../../../shared/antigravity-model.mjs";
import { stripPluginMcp } from '../../../shared/plugin-copy.mjs';

const { bwrapAvailable, cleanEnv, cliBinds, describeIsolation, isolate, redactSecrets, runSpec } = await import(
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "shared", "isolate.mjs")
);


import { help, parseArgs as parseSharedArgs } from '../../../shared/options.mjs';
import { assertRuntimeLock } from '../../../shared/runtime-contract.mjs';
import { isolationScope } from "../../../shared/isolate.mjs";
import { priceFor as sharedPriceFor, costOf as sharedCostOf, pricesFor } from '../../../shared/pricing.mjs';

const USAGE = help('antigravity');
function fail(message) {
  console.error(`antigravity-plugin-eval: ${message}`);
  console.error(USAGE);
  process.exit(64);
}
const parseArgs = (argv) => parseSharedArgs(argv, 'antigravity');
const priceFor = (model, opts, input = 0) => sharedPriceFor('antigravity', model, opts, input);
const costOf = (usage, opts, model = opts.model) => sharedCostOf('antigravity', usage, opts, model);

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
  const found = spawnSync("sh", ["-c", "command -v agy"], { encoding: "utf8" }).stdout.trim();
  if (!found) throw new Error("agy is not on PATH");
  return found;
}

function defaultWork() {
  return join(tmpdir(), 'antigravity-plugin-eval');
}

const userSettingsPath = join(homedir(), ".gemini", "antigravity-cli", "settings.json");

function readJson(path) {
  if (!existsSync(path)) return undefined;
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch { throw new Error("configuration file is not valid JSON"); }
}

function userModel() {
  const model = readJson(userSettingsPath)?.model;
  return typeof model === "string" ? model : model?.name;
}
const authState = { auth: { mode: "oauth", dir: null } };

const AUTH_FILES = ["antigravity-oauth-token"];
function makeHome(root) {
  const home = join(root, "home");
  const gHome = join(home, ".gemini", "antigravity-cli");
  mkdirSync(gHome, { recursive: true });
  const a = authState.auth;
  const authFiles = AUTH_FILES.map((f) => join(a.dir, f)).filter(existsSync);
  for (const f of authFiles) symlinkSync(f, join(gHome, basename(f)));
  const cwd = join(root, "cwd");
  mkdirSync(cwd, { recursive: true });
  return { root, home, gHome, cwd, authFiles };
}


function envFor(h) {
  return { ...process.env, HOME: h.home };
}

const iso = { mode: "bwrap", cli: null };
function launchSpec(gemini, h, args) {
  if (iso.mode === "none") return { command: gemini, args, env: envFor(h) };
  return isolate({
    command: iso.cli.command,
    args,
    env: cleanEnv({ HOME: h.home }, iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...h.authFiles],
  });
}
function setupSpec(command, h, args, readOnly) {
  if (iso.mode === "none") return { command, args, env: envFor(h, false) };
  return isolate({
    command,
    args,
    env: cleanEnv({ HOME: h.home }, iso.cli.nodeBinDirs),
    cwd: h.cwd,
    rw: [h.root],
    ro: [...iso.cli.ro, ...readOnly],
  });
}

async function runSetup(what, spec, h, timeoutMs) {
  const r = await runSpec(spec, { cwd: h.cwd, timeoutMs });
  if (r.code !== 0) throw new Error(`${what} exited ${r.code}: ${redactSecrets(r.stderr || r.stdout, authState.auth).slice(-300)}`);
}

async function installPlugin(gemini, h, pluginDir, marketplaceRoot, hooks) {
  if (!existsSync(join(pluginDir, "gemini-extension.json"))) throw new Error(`no gemini-extension.json in ${pluginDir}`);
  const command = iso.mode === "none" ? gemini : iso.cli.command;
  const args = ["plugin", "install", pluginDir];
  await runSetup("extensions install", setupSpec(command, h, args, [pluginDir, marketplaceRoot]), h, 180_000);
  const name = readJson(join(pluginDir, "gemini-extension.json")).name;
  const extDir = join(h.home, ".gemini", "config", "plugins", name);
  stripPluginMcp(extDir, { hooks });
}

async function runScaffold(c, h, pluginDir, marketplaceRoot) {
  const file = join(c.absDir, c.scaffold);
  const args = existsSync(file) ? [file] : ["-c", c.scaffold];
  const spec = iso.mode === "none" ? { command: "bash", args, env: { ...process.env, HOME: homedir() } } : setupSpec("bash", h, args, [pluginDir, marketplaceRoot]);
  await runSetup("scaffold", spec, h, 300_000);
}

const children = new Set();
function runGemini(gemini, h, model, prompt, timeoutSeconds, effort) {
  return new Promise((done) => {
    const started = Date.now();
    const args = [
      "--model",
      model,
      ...antigravityModel(model, effort).args,
      "--dangerously-skip-permissions",
      "--sandbox",
      "--output-format",
      "json",
      "--print-timeout",
      `${timeoutSeconds}s`,
      "-p",
      prompt,
    ];
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
      try {
        const parsed = JSON.parse(stdout);
        if (!Array.isArray(parsed)) events.push({ ...parsed, type: "result" });
      } catch {}
      for (const line of (events.length ? [] : stdout.split("\n"))) {
        if (!line.startsWith("{")) continue;
        try {
          events.push(JSON.parse(line));
        } catch {
        }
      }
      const result = events.find((e) => e.type === "result");
      const usage = {};
      if (result?.usage) {
        const s = result.usage;
        usage.input_tokens = (s.input_tokens ?? 0) + (s.cache_read_tokens ?? 0);
        usage.cached_input_tokens = s.cache_read_tokens ?? 0;
        usage.reasoning_output_tokens = s.thinking_tokens ?? 0;
        usage.output_tokens = (s.output_tokens ?? 0) + (s.thinking_tokens ?? 0);
      } else if (result?.stats) {
        const s = result.stats;
        usage.input_tokens = (s.input_tokens ?? 0) + (s.cache_read_tokens ?? 0);
        usage.cached_input_tokens = s.cached ?? 0;
        usage.output_tokens = Math.max(0, (s.total_tokens ?? 0) - (s.input_tokens ?? 0));
      }
      let error = spawnError;
      if (!error && timedOut) error = `timeout after ${timeoutSeconds}s`;
      const fatal = events.find((e) => e.type === "error" && e.severity !== "warning");
      if (!error && fatal) error = JSON.stringify(fatal).slice(0, 500);
      if (!error && result && (result.is_error || result.error || (result.status && result.status.toLowerCase() !== "success"))) error = "Antigravity returned an error";
      if (!error && !result) error = `Antigravity produced no JSON result (exit ${code}; stdout length ${stdout.length}; stderr length ${stderr.length})`;
      if (!error && code !== 0) error = `gemini exited ${code}: ${stderr.slice(-300)}`;
      if (error) error = redactSecrets(error, authState.auth);
      try {
        events.push(...antigravityToolEvents(h.home));
      } catch (evidenceError) {
        error = redactSecrets(String(evidenceError), authState.auth);
      }
      done({ events, reply: finalReply(events), usage, durationSeconds: Math.round((Date.now() - started) / 1000), error });
    });
    child.stdin.on("error", () => {});
    child.stdin.end();
  });
}
function finalReply(events) {
  const result = events.findLast((e) => e.type === "result");
  if (typeof result?.result === "string") return result.result.trim();
  if (typeof result?.response === "string") return result.response.trim();
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
  const h = makeHome(root);
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
  const r = await runGemini(gemini, h, opts.judgeModel, prompt, opts.judgeTimeout, opts.judgeEffort);
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
      console.error(`antigravity-plugin-eval: ${relative(evalsDir, dir)}: case.yaml cases are not supported, skipped`);
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
</style></head><body><h1>Antigravity eval: ${esc(s.plugins[0].name)}</h1>
<p>antigravity ${esc(result.runtimeVersion)}; subject ${esc(s.modelOverride)}; judge ${esc(s.judgeModel)}; ablation ${esc(s.ablation)}; ${result.durationSeconds}s; costUsd ${result.costUsd === null ? "n/a" : result.costUsd.toFixed(4)}; tokens in ${result.tokens.input_tokens ?? 0} out ${result.tokens.output_tokens ?? 0}${result.partial ? `; partial (${esc(result.partialReason)})` : ""}</p>
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
        runtime: "antigravity",
        binary: geminiBinary(opts.gemini),
        path: opts.runtimeLock,
      });
      opts.notes.push("runtime compatibility lock verified");
    } catch (error) {
      fail(error.message);
    }
  }
  for (const note of opts.notes) console.error(`antigravity-plugin-eval: ${note}`);
  opts.model ??= userModel();
  if (!opts.model) fail("no model: pass --model or set model.name in ~/.gemini/antigravity-cli/settings.json");
  opts.judgeModel ??= opts.model;
  try {
    const subject = antigravityModel(opts.model, opts.effort, {
      explicitEffort: process.argv.includes("--effort"),
    });
    opts.effort = subject.effort;
    opts.judgeEffort ??= opts.effort;
    const judge = antigravityModel(opts.judgeModel, opts.judgeEffort, {
      explicitEffort: process.argv.includes("--judge-effort"),
    });
    opts.judgeEffort = judge.effort;
    if (subject.fixedPreset || judge.fixedPreset) {
      opts.notes.push("Named Gemini model presets control effort; unsupported effort flags are omitted");
    }
  } catch (error) {
    fail(error.message);
  }
  opts.judgeEffort ??= opts.effort;
  opts.judgeTimeout = opts.timeout ?? 600;
  opts.work ??= defaultWork();
  const priced = priceFor(opts.model, opts, 0) !== null && priceFor(opts.judgeModel, opts, 0) !== null;
  if (opts.maxCostUsd !== undefined && !priced) fail("--max-cost-usd requires known prices or --price-in/--price-out");

  const sandbox = "terminal-restricted";
  const toolNotes = [];
  opts.notes.push("Antigravity default tool exclusions and disabled built-in skills are unavailable; native --sandbox applies terminal restrictions only");
  if (!opts.scaffold) opts.notes.push("scaffold_script not run (pass --scaffold)");
  if (opts.hooks) opts.notes.push("native plugin hooks enabled; hook evidence compatibility is not verified");

  try {
    authState.auth = { mode: "oauth", dir: resolve(opts.authFrom ?? join(homedir(), ".gemini", "antigravity-cli")), source: opts.authFrom ? "auth-from" : "operator", record: { mode: "oauth", source: opts.authFrom ? "auth-from" : "operator", route: "Antigravity OAuth; token visible in the sandbox; read-only login bind" } };
    if (!existsSync(join(authState.auth.dir, "antigravity-oauth-token"))) fail("No antigravity-oauth-token login file; credential refresh is prohibited");
    opts.notes.push("gemini-3.5-flash-lite title/summary request excluded from JSON usage and reported cost; ceiling stops launches after observed usage, not a provider billing cap");
  } catch (err) {
    fail(err.message);
  }
  const authNote = `auth ${authState.auth.mode} (${authState.auth.source})`;
  opts.notes.push(authNote);
  console.error(`antigravity-plugin-eval: ${authNote}`);
  const gemini = geminiBinary(opts.gemini ?? process.env.ANTIGRAVITY_BIN);
  const antigravityVersion = execFileSync(gemini, ["--version"], { encoding: "utf8" }).trim();
  iso.mode = opts.isolation;
  if (iso.mode === "bwrap") {
    if (!bwrapAvailable()) throw new Error("bubblewrap is not installed; install it or pass --isolation none (debugging only)");
    iso.cli = cliBinds(gemini);
  }
  opts.notes.push(describeIsolation(iso.mode));
  console.error(`antigravity-plugin-eval: ${describeIsolation(iso.mode)}`);
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
      const h = makeHome(root);
      try {
        if (opts.scaffold && c.scaffold) await runScaffold(c, h, opts.pluginDir, marketplaceRoot);
        if (arm === "with") await installPlugin(gemini, h, opts.pluginDir, marketplaceRoot, opts.hooks);
      } catch (err) {
        return { events: [], reply: "", usage: {}, durationSeconds: 0, error: `setup failed: ${String(err.stderr || err).slice(0, 400)}` };
      }
      const res = await runGemini(gemini, h, opts.model, c.prompt, c.timeoutSeconds, opts.effort);
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
    const run = { opened, reply: r.reply, attempted: hookEvidence?.attempted ?? shell };
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
    console.error(`antigravity-plugin-eval: ${aggregates.runsFailedBeforeAnswer}/${allRuns.length} runs failed before the model answered (auth, setup or CLI); they have no score`);
  }

  const result = {
    schemaVersion: 1,
    runtime: "antigravity",
    runtimeVersion: antigravityVersion,
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
      approvalMode: "yolo",
      toolsExcluded: [],
      allowTools: toolNotes,
      prices: pricesFor("antigravity", opts),
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
  console.error(`antigravity-plugin-eval: results ${join(outputDir, "aggregate-result.json")}, report ${reportPath}`);

  if (stopReason === "interrupted") process.exit(130);
  if (stopReason) process.exit(2);
  if (allRuns.length > 0 && allRuns.every((r) => r.failedBeforeAnswer)) process.exit(3);
  if (scoredCases.some((c) => c.aggregates.score < opts.threshold)) process.exit(1);
}

main().catch((err) => {
  console.error(`antigravity-plugin-eval: ${redactSecrets(err.message ?? err.constructor?.name ?? "Error", authState.auth)}`);
  process.exit(70);
});
