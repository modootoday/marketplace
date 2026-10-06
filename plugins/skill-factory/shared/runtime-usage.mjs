#!/usr/bin/env node
// Reads each agent CLI's remaining allowance from the operator's own logins, read-only.
// Never refreshes a token, never writes a credential file, never prints credential content.
// Usage: node runtime-usage.mjs [--json] [--min-remaining N] [codex|grok|gemini|claude|agy ...]
import { realpathSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { spawnSync } from "node:child_process";
const HOME = homedir();
const TIMEOUT_MS = 15000;
export const RUNTIMES = ["codex", "grok", "gemini", "claude", "agy"];

class UsageError extends Error {}

// Parse errors from JSON.parse can echo the input, so only the class and length ever leave this function.
function readJsonSecret(path) {
  let text = "";
  try {
    text = readFileSync(path, "utf8");
    return JSON.parse(text);
  } catch (e) {
    throw new UsageError(`cannot read ${path}: ${e?.constructor?.name ?? "Error"} (file length ${text.length})`);
  }
}

async function getJson(url, init = {}) {
  let res;
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (e) {
    throw new UsageError(`request failed: ${e?.name ?? "Error"}${e?.cause?.code ? ` ${e.cause.code}` : ""}`);
  }
  const text = await res.text();
  if (!res.ok) throw new UsageError(`HTTP ${res.status} from ${new URL(url).host}${new URL(url).pathname}`);
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new UsageError(`non-JSON response: ${e?.constructor?.name} (length ${text.length})`);
  }
}

function jwtExpiry(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function assertNotExpired(expiresAtMs, hint) {
  if (expiresAtMs && expiresAtMs <= Date.now()) {
    throw new UsageError(`access token expired at ${new Date(expiresAtMs).toISOString()}; not refreshed here (${hint})`);
  }
}

function windowLabel(seconds) {
  if (!seconds) return "window";
  if (seconds % 86400 === 0) return `${seconds / 86400}d`;
  if (seconds % 3600 === 0) return `${seconds / 3600}h`;
  return `${Math.round(seconds / 60)}m`;
}

const toIso = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const d = typeof v === "number" ? new Date(v < 1e12 ? v * 1000 : v) : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

// The binding window is the one with the least room left.
function summarize(result) {
  const scored = result.windows.filter((w) => typeof w.usedPercent === "number");
  if (scored.length === 0) return { usedPercent: null, resetsAt: null, ...result };
  const top = scored.reduce((a, b) => (b.usedPercent > a.usedPercent ? b : a));
  return { usedPercent: top.usedPercent, resetsAt: top.resetsAt, ...result };
}

// --- Codex -----------------------------------------------------------------

async function codexHttp() {
  const auth = readJsonSecret(join(process.env.CODEX_HOME ?? join(HOME, ".codex"), "auth.json"));
  const tokens = auth?.tokens;
  if (!tokens?.access_token) throw new UsageError("no ChatGPT tokens in ~/.codex/auth.json (API-key login has no plan allowance)");
  assertNotExpired(jwtExpiry(tokens.access_token), "run codex once to refresh");
  const url = "https://chatgpt.com/backend-api/wham/usage";
  const body = await getJson(url, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "ChatGPT-Account-Id": tokens.account_id ?? "",
      Accept: "application/json",
      originator: "codex_cli_rs",
    },
  });
  const windows = [];
  const addLimit = (rl, prefix) => {
    for (const key of ["primary_window", "secondary_window"]) {
      const w = rl?.[key];
      if (!w) continue;
      windows.push({ name: `${prefix}${windowLabel(w.limit_window_seconds)}`, usedPercent: w.used_percent, resetsAt: toIso(w.reset_at) });
    }
  };
  addLimit(body.rate_limit, "");
  for (const extra of body.additional_rate_limits ?? []) addLimit(extra.rate_limit, `${extra.limit_name ?? extra.metered_feature ?? "extra"} `);
  const c = body.credits;
  return {
    plan: body.plan_type ?? null,
    windows,
    credits: c ? { balance: c.balance ?? null, unlimited: Boolean(c.unlimited), hasCredits: Boolean(c.has_credits) } : null,
    limitReached: body.rate_limit?.limit_reached ?? null,
    source: `GET ${url}`,
    unofficial: true,
  };
}

// Rollout files carry the same numbers as of the last turn; used when the HTTP read fails.
function codexEvents() {
  const root = join(HOME, ".codex", "sessions");
  const files = [];
  const walk = (dir, depth) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory() && depth < 4) walk(p, depth + 1);
      else if (name.endsWith(".jsonl")) files.push([st.mtimeMs, p]);
    }
  };
  if (existsSync(root)) walk(root, 0);
  files.sort((a, b) => b[0] - a[0]);
  for (const [, file] of files.slice(0, 20)) {
    const lines = readFileSync(file, "utf8").trimEnd().split("\n").reverse();
    for (const line of lines) {
      if (!line.includes('"rate_limits"')) continue;
      let ev;
      try {
        ev = JSON.parse(line);
      } catch {
        continue;
      }
      const rl = ev?.payload?.rate_limits;
      if (!rl?.primary) continue;
      const windows = ["primary", "secondary"]
        .filter((k) => rl[k])
        .map((k) => ({ name: windowLabel((rl[k].window_minutes ?? 0) * 60), usedPercent: rl[k].used_percent, resetsAt: toIso(rl[k].resets_at) }));
      return {
        plan: rl.plan_type ?? null,
        windows,
        credits: rl.credits ? { balance: rl.credits.balance ?? null, unlimited: Boolean(rl.credits.unlimited), hasCredits: Boolean(rl.credits.has_credits) } : null,
        asOf: toIso(ev.timestamp),
        source: "event: token_count.rate_limits in latest ~/.codex/sessions rollout",
        unofficial: false,
      };
    }
  }
  throw new UsageError("no rate_limits event in recent Codex sessions");
}

async function codex() {
  try {
    return await codexHttp();
  } catch (e) {
    if (!(e instanceof UsageError)) throw e;
    const fallback = codexEvents();
    return { ...fallback, note: `HTTP read failed (${e.message}); numbers are from the last session event` };
  }
}

// --- Grok ------------------------------------------------------------------

function grokPlanFromLog() {
  const log = join(process.env.GROK_HOME ?? join(HOME, ".grok"), "logs", "unified.jsonl");
  if (!existsSync(log)) return null;
  const st = statSync(log);
  const tail = readFileSync(log, "utf8").slice(Math.max(0, st.size - 2_000_000));
  const m = [...tail.matchAll(/"subscriptionTier":"([^"]{1,40})"/g)].pop();
  return m ? m[1] : null;
}

async function grok() {
  const auth = readJsonSecret(join(HOME, ".grok", "auth.json"));
  const entry = Object.values(auth ?? {}).find((v) => v && typeof v === "object" && v.key);
  if (!entry) throw new UsageError("no grok.com session in ~/.grok/auth.json");
  assertNotExpired(toIso(entry.expires_at) ? Date.parse(entry.expires_at) : null, "run grok once to refresh");
  const base = process.env.GROK_CLI_CHAT_PROXY_BASE_URL ?? "https://cli-chat-proxy.grok.com/v1";
  const url = `${base}/billing?format=credits`;
  const body = await getJson(url, { headers: { Authorization: `Bearer ${entry.key}`, Accept: "application/json" } });
  const cfg = body.config ?? body;
  const period = cfg.currentPeriod ?? {};
  const periodName = String(period.type ?? "").replace("USAGE_PERIOD_TYPE_", "").toLowerCase() || "period";
  const windows = [{ name: periodName, usedPercent: cfg.creditUsagePercent ?? null, resetsAt: toIso(period.end ?? cfg.billingPeriodEnd) }];
  for (const p of cfg.productUsage ?? []) {
    windows.push({ name: `${periodName} ${String(p.product ?? "product").slice(0, 24)}`, usedPercent: p.usagePercent ?? null, resetsAt: windows[0].resetsAt, informational: true });
  }
  const val = (o) => (o && typeof o === "object" ? (o.val ?? null) : (o ?? null));
  return {
    plan: grokPlanFromLog(),
    windows,
    credits: { prepaidBalance: val(cfg.prepaidBalance), onDemandUsed: val(cfg.onDemandUsed), onDemandCap: val(cfg.onDemandCap) },
    source: `GET ${url} (same call as the /usage modal, logged as "billing: fetched credits config")`,
    unofficial: true,
  };
}

// --- Gemini CLI and Antigravity (Code Assist) ------------------------------

function geminiBundle() {
  if (process.env.GEMINI_CLI_CORE_CHUNK) return process.env.GEMINI_CLI_CORE_CHUNK;
  const bin = spawnSync('sh', ['-c', 'command -v gemini'], { encoding: 'utf8' }).stdout?.trim();
  if (!bin) throw new UsageError('Gemini CLI not found; set GEMINI_CLI_CORE_CHUNK to its core bundle chunk');
  let root = dirname(realpathSync(bin));
  for (let depth = 0; depth < 5; depth++, root = dirname(root)) {
    const bundle = join(root, 'bundle');
    if (!existsSync(bundle)) continue;
    const matches = readdirSync(bundle).filter((f) => /^chunk-.*\.js$/.test(f) && readFileSync(join(bundle, f), 'utf8').includes('KeychainTokenStorage'));
    if (matches.length === 1) return join(bundle, matches[0]);
  }
  throw new UsageError('Cannot discover Gemini credential storage module; set GEMINI_CLI_CORE_CHUNK');
}

// Loads the OAuth token through the CLI's own storage class; file storage is forced so no keychain probe write happens.
async function geminiAccessToken() {
  const bundle = geminiBundle();
  if (!existsSync(bundle)) throw new UsageError(`Gemini CLI bundle chunk not found at ${bundle}`);
  process.env.GEMINI_FORCE_FILE_STORAGE = "true";
  const saved = { log: console.log, debug: console.debug, info: console.info, warn: console.warn, error: console.error };
  for (const k of Object.keys(saved)) console[k] = () => {};
  try {
    const mod = await import(pathToFileURL(bundle).href);
    const storage = new mod.KeychainTokenStorage("gemini-cli-oauth");
    const creds = await storage.getCredentials("main-account");
    return creds?.token ?? null;
  } catch (e) {
    throw new UsageError(`Gemini credential load failed: ${e?.constructor?.name ?? "Error"}`);
  } finally {
    Object.assign(console, saved);
  }
}

async function codeAssistQuota({ host, accessToken, quotaMethod, label }) {
  const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
  const load = await getJson(`${host}/v1internal:loadCodeAssist`, {
    method: "POST",
    headers,
    body: JSON.stringify({ metadata: { ideType: "IDE_UNSPECIFIED", platform: "PLATFORM_UNSPECIFIED", pluginType: "GEMINI" } }),
  });
  const project = typeof load.cloudaicompanionProject === "string" ? load.cloudaicompanionProject : load.cloudaicompanionProject?.id;
  if (!project) throw new UsageError(`${label}: loadCodeAssist returned no project (account not onboarded)`);
  const quota = await getJson(`${host}/v1internal:${quotaMethod}`, { method: "POST", headers, body: JSON.stringify({ project }) });
  const buckets = [...(quota.buckets ?? []), ...(quota.groups ?? []).flatMap((g) => g.buckets ?? [])];
  const windows = buckets.map((b) => ({
    name: String(b.displayName ?? b.modelId ?? b.bucketId ?? "bucket").slice(0, 40) + (b.tokenType ? ` ${b.tokenType}` : "") + (b.window ? ` ${b.window}` : ""),
    usedPercent: typeof b.remainingFraction === "number" ? Math.round((1 - b.remainingFraction) * 1000) / 10 : null,
    resetsAt: toIso(b.resetTime),
  }));
  return {
    plan: load.paidTier?.name ?? load.currentTier?.name ?? load.currentTier?.id ?? null,
    windows,
    credits: null,
    source: `POST ${host}/v1internal:loadCodeAssist + ${quotaMethod}`,
    unofficial: true,
  };
}

async function gemini() {
  let selected = null;
  try {
    selected = readJsonSecret(join(HOME, ".gemini", "settings.json"))?.security?.auth?.selectedType ?? null;
  } catch {
    selected = null;
  }
  const token = await geminiAccessToken();
  if (!token?.accessToken) {
    throw new UsageError(`no Google OAuth login stored (CLI auth type: ${selected ?? "unknown"}); API-key auth has no quota read endpoint`);
  }
  assertNotExpired(token.expiresAt, "run gemini once to refresh");
  const host = process.env.CODE_ASSIST_ENDPOINT ?? "https://cloudcode-pa.googleapis.com";
  return codeAssistQuota({ host, accessToken: token.accessToken, quotaMethod: "retrieveUserQuota", label: "gemini" });
}

// The 429 text carries the reset as a relative duration; the log line timestamp anchors it.
function agyFromLog() {
  const dir = join(HOME, ".gemini", "antigravity-cli", "log");
  if (!existsSync(dir)) throw new UsageError("no Antigravity log directory");
  const files = readdirSync(dir).filter((f) => /^cli-\d{8}_\d{6}\.log$/.test(f)).sort().reverse();
  for (const f of files.slice(0, 30)) {
    const year = f.slice(4, 8);
    const lines = readFileSync(join(dir, f), "utf8").split("\n").reverse();
    for (const line of lines) {
      const m = line.match(/^[EWI](\d{2})(\d{2}) (\d{2}:\d{2}:\d{2})\.\d+ .*quota.*?Resets in ((?:\d+h)?(?:\d+m)?(?:\d+s)?)/i);
      if (!m || !m[4]) continue;
      const at = Date.parse(`${year}-${m[1]}-${m[2]}T${m[3]}Z`);
      const d = m[4].match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
      const secs = Number(d[1] ?? 0) * 3600 + Number(d[2] ?? 0) * 60 + Number(d[3] ?? 0);
      const resetsAt = new Date(at + secs * 1000).toISOString();
      const exhausted = resetsAt > new Date().toISOString();
      return {
        plan: null,
        windows: [{ name: "individual quota", usedPercent: exhausted ? 100 : null, resetsAt }],
        credits: null,
        asOf: new Date(at).toISOString(),
        source: `event: RESOURCE_EXHAUSTED text in ${f}`,
        unofficial: false,
        note: exhausted ? "quota reached at the logged call; numbers below 100% are not in the log" : "logged reset has passed; current usage unknown",
      };
    }
  }
  throw new UsageError("no quota message in recent Antigravity logs");
}

async function agy() {
  let httpError;
  try {
    const tok = readJsonSecret(join(HOME, ".gemini", "antigravity-cli", "antigravity-oauth-token"));
    const accessToken = tok?.token?.access_token;
    if (!accessToken) throw new UsageError("no access token in antigravity-oauth-token");
    assertNotExpired(Date.parse(tok.token.expiry ?? ""), "run agy once to refresh");
    const host = process.env.AGY_CODE_ASSIST_ENDPOINT ?? "https://daily-cloudcode-pa.googleapis.com";
    return await codeAssistQuota({ host, accessToken, quotaMethod: "retrieveUserQuotaSummary", label: "agy" });
  } catch (e) {
    if (!(e instanceof UsageError)) throw e;
    httpError = e.message;
  }
  return { ...agyFromLog(), note2: `quota read skipped: ${httpError}` };
}

// --- Claude Code -----------------------------------------------------------

async function claude() {
  const creds = readJsonSecret(join(HOME, ".claude", ".credentials.json"));
  const o = creds?.claudeAiOauth;
  if (!o?.accessToken) throw new UsageError("no claude.ai OAuth login in ~/.claude/.credentials.json");
  assertNotExpired(o.expiresAt, "run claude once to refresh");
  const url = "https://api.anthropic.com/api/oauth/usage";
  const body = await getJson(url, { headers: { Authorization: `Bearer ${o.accessToken}`, "anthropic-beta": "oauth-2025-04-20", Accept: "application/json" } });
  const windows = [];
  for (const [key, v] of Object.entries(body)) {
    if (!v || typeof v !== "object" || Array.isArray(v) || typeof v.utilization !== "number" || key === "extra_usage") continue;
    windows.push({ name: key, usedPercent: v.utilization, resetsAt: toIso(v.resets_at), ...(v.limit_dollars != null ? { informational: true, limitDollars: v.limit_dollars, usedDollars: v.used_dollars } : {}) });
  }
  const binding = windows.filter((w) => !w.informational);
  const extra = body.extra_usage;
  return {
    plan: [o.subscriptionType, o.rateLimitTier].filter(Boolean).join(" / ") || null,
    windows,
    bindingWindows: binding.map((w) => w.name),
    credits: extra ? { extraUsageEnabled: Boolean(extra.is_enabled), usedCredits: extra.used_credits ?? null, monthlyLimit: extra.monthly_limit ?? null } : null,
    source: `GET ${url} (anthropic-beta: oauth-2025-04-20)`,
    unofficial: true,
  };
}

const READERS = { codex, grok, gemini, claude, agy };

export async function usage(runtime) {
  const reader = READERS[runtime];
  if (!reader) return { runtime, error: `unknown runtime ${runtime}` };
  try {
    const r = await reader();
    // Informational buckets (per-product shares, dollar grants) do not gate a run.
    const gating = r.windows.filter((w) => !w.informational);
    const s = summarize({ ...r, windows: gating });
    return { runtime, ...s, windows: r.windows };
  } catch (e) {
    const msg = e instanceof UsageError ? e.message : `${e?.constructor?.name ?? "Error"} in ${runtime} reader`;
    return { runtime, error: msg };
  }
}

// --- CLI -------------------------------------------------------------------

const utc = (iso) => (iso ? `${iso.slice(0, 16).replace("T", " ")} UTC` : "-");

function creditsText(c) {
  if (!c) return "-";
  return Object.entries(c)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
}

function printTable(results) {
  const rows = [["runtime", "plan", "window", "used%", "left%", "resets (UTC)"]];
  for (const r of results) {
    if (r.error) {
      rows.push([r.runtime, "-", "ERROR", "-", "-", "-"]);
      continue;
    }
    for (const w of r.windows) {
      const used = typeof w.usedPercent === "number" ? String(w.usedPercent) : "?";
      const left = typeof w.usedPercent === "number" ? String(Math.round((100 - w.usedPercent) * 10) / 10) : "?";
      rows.push([r.runtime, r.plan ?? "-", w.name + (w.informational ? " (info)" : ""), used, left, utc(w.resetsAt)]);
    }
  }
  const widths = rows[0].map((_, i) => Math.max(...rows.map((row) => row[i].length)));
  for (const row of rows) console.log(row.map((c, i) => c.padEnd(widths[i])).join("  ").trimEnd());
  console.log("");
  for (const r of results) {
    if (r.error) {
      console.log(`${r.runtime}: error: ${r.error}`);
      continue;
    }
    const tags = [r.unofficial ? "unofficial endpoint" : "local CLI log/event, no network", r.asOf ? `as of ${r.asOf}` : null].filter(Boolean).join(", ");
    console.log(`${r.runtime}: source ${r.source} [${tags}]; credits ${creditsText(r.credits)}`);
    for (const n of [r.note, r.note2]) if (n) console.log(`  note: ${n}`);
  }
}

async function main(argv) {
  const args = argv.slice(2);
  let json = false;
  let floor = null;
  const picked = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--json") json = true;
    else if (a === "--min-remaining") {
      floor = Number(args[++i]);
      if (!Number.isFinite(floor)) return usageExit("--min-remaining needs a number");
    } else if (a === "-h" || a === "--help") return usageExit(null);
    else if (RUNTIMES.includes(a)) picked.push(a);
    else return usageExit(`unknown argument ${a}`);
  }
  const list = picked.length ? picked : RUNTIMES;
  const results = await Promise.all(list.map((r) => usage(r)));
  if (json) console.log(JSON.stringify(results, null, 2));
  else printTable(results);
  if (floor === null) return 0;
  const below = results.filter((r) => !r.error && typeof r.usedPercent === "number" && 100 - r.usedPercent < floor);
  if (below.length && !json) console.log(`below floor ${floor}% remaining: ${below.map((r) => r.runtime).join(", ")}`);
  return below.length ? 3 : 0;
}

function usageExit(msg) {
  if (msg) console.error(`runtime-usage: ${msg}`);
  console.error("usage: node runtime-usage.mjs [--json] [--min-remaining N] [codex|grok|gemini|claude|agy ...]");
  return msg ? 2 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = await main(process.argv);
}
