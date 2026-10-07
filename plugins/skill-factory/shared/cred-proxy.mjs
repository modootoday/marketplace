// Credential-injecting reverse proxy for the plugin-eval harnesses. It runs in the harness process,
// outside bwrap: the sandbox gets a loopback URL and a per-suite dummy key, the proxy swaps the dummy
// for the real credential, so no real token, key or refresh token is ever inside the sandbox.
import { createDecipheriv, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync, mkdtempSync, symlinkSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { hostname, userInfo, tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { execFileSync } from "node:child_process";

const HOP = new Set(["connection", "keep-alive", "transfer-encoding", "upgrade", "proxy-connection", "te", "trailer", "host", "content-length"]);
const DROP_IN = new Set(["authorization", "cookie", "chatgpt-account-id", "x-api-key", "x-goog-api-key", "x-xai-token-auth"]);

export const DEFAULT_MIN_VALID_MS = 30 * 60_000;

function jwtExp(token) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString()).exp * 1000;
  } catch {
    return null;
  }
}

// Parse errors are rethrown without the message: a JSON error quotes the file it failed on.
function readJsonQuiet(path, what) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (err) {
    throw new Error(`${what}: cannot read ${path} (${err.code ?? err.constructor.name})`);
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`${what}: ${path} is not valid JSON (${err.constructor.name}, ${text.length} chars)`);
  }
}

function minutes(ms) {
  return Math.round(ms / 60_000);
}

function requireLife(expMs, minValidMs, refreshHint) {
  if (!expMs) throw new Error(`the token has no readable expiry; ${refreshHint}`);
  const left = expMs - Date.now();
  if (left < minValidMs) {
    throw new Error(`the token expires in ${minutes(Math.max(0, left))} min, inside the suite budget of ${minutes(minValidMs)} min; ${refreshHint}`);
  }
}

// Codex ChatGPT login: reads auth.json on every request, never refreshes and never writes it.
export function codexChatgptCredentials(authJsonPath, { minValidMs = DEFAULT_MIN_VALID_MS } = {}) {
  const read = () => {
    const t = readJsonQuiet(authJsonPath, "codex login").tokens ?? {};
    if (!t.access_token || !t.account_id) throw new Error(`${authJsonPath} has no ChatGPT access token`);
    return { token: t.access_token, account: t.account_id, exp: jwtExp(t.access_token) };
  };
  return {
    route: "codex: model_provider evalproxy (base_url + env_key) -> chatgpt.com/backend-api/codex",
    upstream: "https://chatgpt.com/backend-api/codex",
    allow: ["/responses", "/models"],
    check() {
      const { exp } = read();
      requireLife(exp, minValidMs, "refresh it with the codex CLI outside the sandbox (codex login; a plain codex run refreshes only 8 days after the last refresh or in the last 5 min) or pass a smaller --suite-minutes");
      return { expiresAt: new Date(exp).toISOString() };
    },
    headers() {
      const { token, account } = read();
      return { authorization: `Bearer ${token}`, "chatgpt-account-id": account };
    },
  };
}

// Grok session login: the CLI refreshes by atomic rename, so the file is read per request and the
// proxy never refreshes; a refresh by the operator's own grok is picked up on the next request.
export function grokSessionCredentials(authJsonPath, { minValidMs = DEFAULT_MIN_VALID_MS } = {}) {
  const read = () => {
    const j = readJsonQuiet(authJsonPath, "grok login");
    const entry = Object.values(j ?? {}).find((v) => v && typeof v === "object" && typeof v.key === "string" && v.key);
    if (!entry) throw new Error(`${authJsonPath} has no session key`);
    return { token: entry.key, exp: Date.parse(entry.expires_at ?? "") || null };
  };
  return {
    route: "grok: preferred_method api_key + dummy XAI_API_KEY, GROK_MODELS_BASE_URL (and GROK_CLI_CHAT_PROXY_BASE_URL) -> cli-chat-proxy.grok.com with the session key",
    upstream: "https://cli-chat-proxy.grok.com",
    allow: ["/v1/responses", "/v1/chat/completions", "/v1/models"],
    check() {
      const { exp } = read();
      requireLife(exp, minValidMs, "refresh it with the grok CLI outside the sandbox (grok login; a plain grok -p refreshes only in the last 5 min, GROK_AUTH_EARLY_INVALIDATION_SECS widens that) or pass a smaller --suite-minutes");
      return { expiresAt: new Date(exp).toISOString() };
    },
    headers() {
      const { token } = read();
      return { authorization: `Bearer ${token}`, "x-xai-token-auth": "xai-grok-cli" };
    },
  };
}

// The Gemini CLI keeps a saved API key in gemini-credentials.json, AES-256-GCM under a key derived
// from host and user name; it is decrypted here, outside the sandbox, the same way the CLI does.
function geminiStoredApiKey(geminiDir) {
  const file = join(geminiDir, "gemini-credentials.json");
  if (!existsSync(file)) return null;
  let store;
  try {
    const [iv, tag, enc] = readFileSync(file, "utf8").split(":");
    const key = scryptSync("gemini-cli-oauth", `${hostname()}-${userInfo().username}-gemini-cli`, 32);
    const d = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"), { authTagLength: 16 });
    d.setAuthTag(Buffer.from(tag, "hex"));
    store = JSON.parse(d.update(enc, "hex", "utf8") + d.final("utf8"));
  } catch (err) {
    throw new Error(`gemini login: cannot decrypt ${file} (${err.constructor.name})`);
  }
  const raw = store?.["gemini-cli-api-key"]?.["default-api-key"];
  if (!raw) return null;
  try {
    return JSON.parse(raw)?.token?.accessToken ?? null;
  } catch {
    return typeof raw === "string" ? raw : null;
  }
}

// Gemini API-key login: the sandbox runs gemini-api-key auth with GOOGLE_GEMINI_BASE_URL at the proxy.
export function geminiApiKeyCredentials(geminiDir) {
  const read = () => {
    const key = geminiStoredApiKey(geminiDir);
    if (!key) {
      const oauth = existsSync(join(geminiDir, "oauth_creds.json"));
      const hint = oauth ? "this home has a Google OAuth login, which the proxy does not serve yet; use --auth oauth (debug/legacy) or --auth api-key" : "save an API key with the gemini CLI or use --auth api-key";
      throw new Error(`gemini login: no saved API key in ${geminiDir}; ${hint}`);
    }
    return key;
  };
  return {
    route: "gemini: gemini-api-key auth, GOOGLE_GEMINI_BASE_URL -> generativelanguage.googleapis.com, key from the CLI's encrypted store",
    upstream: "https://generativelanguage.googleapis.com",
    allow: ["/v1beta/models", "/v1/models", "/v1alpha/models"],
    check() {
      read();
      return { expiresAt: null };
    },
    headers() {
      return { "x-goog-api-key": read() };
    },
  };
}

export function geminiVertexCredentials(adcPath, project, location) {
  if (!/^[\w-]+$/.test(project) || !/^[\w-]+$/.test(location)) throw new Error("invalid Vertex project/location");
  let token, refreshAt = 0;
  // Keep gcloud's own config/log/cache writes in the task workspace, never the operator config.
  const refresh = () => {
    if (Date.now() < refreshAt) return;
    const configDir = mkdtempSync(join(tmpdir(), "plugin-eval-gcloud-"));
    symlinkSync(adcPath, join(configDir, "application_default_credentials.json"));
    try {
      token = execFileSync("gcloud", ["auth", "application-default", "print-access-token"], {
        env: { ...process.env, CLOUDSDK_CONFIG: configDir, CLOUDSDK_CORE_DISABLE_FILE_LOGGING: "true", GOOGLE_APPLICATION_CREDENTIALS: adcPath }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 60000
      }).trim();
    } catch { throw new Error("Vertex ADC token acquisition failed (details suppressed)"); }
    finally { rmSync(configDir, { recursive: true, force: true }); }
    if (!token) throw new Error("Vertex ADC returned an empty token");
    refreshAt = Date.now() + 45 * 60000;
  };
  return {
    route: "vertex-ai + dummy GOOGLE_API_KEY + GOOGLE_VERTEX_BASE_URL; host ADC bearer injected outside bwrap",
    upstream: location === "global" ? "https://aiplatform.googleapis.com" : `https://${location}-aiplatform.googleapis.com`,
    allow: ["/v1beta1/publishers/google/models", "/v1/publishers/google/models", "/v1beta/publishers/google/models"],
    rewrite: (path) => path.replace(/^(\/v1(?:beta1|beta)?)(\/publishers\/google\/models)/, `$1/projects/${project}/locations/${location}$2`),
    check() { refresh(); return { expiresAt: null }; },
    headers() { refresh(); return { authorization: `Bearer ${token}` }; }
  };
}

export function apiKeyCredentials(upstream, key) {
  return { upstream, check: () => ({}), headers: () => ({ authorization: `Bearer ${key}` }) };
}

function presentedKey(h) {
  const auth = String(h.authorization ?? "");
  if (auth.startsWith("Bearer ")) return auth.slice(7);
  return String(h["x-goog-api-key"] ?? h["x-api-key"] ?? "");
}

function stripKeyParam(path) {
  const q = path.indexOf("?");
  if (q < 0) return path;
  const params = new URLSearchParams(path.slice(q + 1));
  params.delete("key");
  const rest = params.toString();
  return rest ? `${path.slice(0, q)}?${rest}` : path.slice(0, q);
}

// allow: path prefixes the sandbox may reach (default creds.allow); everything else is 403.
// stats.byPath counts "<METHOD> <path without query> <status>"; no header or body is recorded.
export async function startCredProxy({ creds, allow = creds.allow }) {
  const dummyKey = `eval-proxy-${randomBytes(24).toString("hex")}`;
  const want = Buffer.from(dummyKey);
  const stats = { requests: 0, refused: 0, upstreamStatus: {}, byPath: {} };
  const count = (method, path, status) => {
    const k = `${method} ${path.split("?")[0]} ${status}`;
    stats.byPath[k] = (stats.byPath[k] ?? 0) + 1;
  };
  const server = createServer(async (req, res) => {
    stats.requests += 1;
    const got = Buffer.from(presentedKey(req.headers));
    const path = stripKeyParam(req.url ?? "/");
    const bare = path.split("?")[0];
    const ok = got.length === want.length && timingSafeEqual(got, want) && allow.some((p) => bare === p || bare.startsWith(`${p}/`) || bare.startsWith(`${p}:`)) && (!creds.accept || creds.accept({ method: req.method, path, headers: req.headers }));
    if (!ok) {
      stats.refused += 1;
      count(req.method, path, 403);
      res.writeHead(403, { "content-type": "application/json" }).end('{"error":"eval proxy: refused"}');
      return;
    }
    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) if (!HOP.has(k) && !DROP_IN.has(k)) headers[k] = v;
    let injected;
    try {
      injected = creds.headers();
    } catch (err) {
      count(req.method, path, 502);
      res.writeHead(502, { "content-type": "application/json" }).end(JSON.stringify({ error: `eval proxy: ${err.message}` }));
      return;
    }
    Object.assign(headers, injected);
    const body = req.method === "GET" || req.method === "HEAD" ? undefined : Readable.toWeb(req);
    let up;
    try {
      up = await fetch(`${creds.upstream}${creds.rewrite ? creds.rewrite(path) : path}`, { method: req.method, headers, body, duplex: "half", redirect: "manual" });
    } catch (err) {
      count(req.method, path, 502);
      res.writeHead(502, { "content-type": "application/json" }).end(JSON.stringify({ error: `eval proxy: upstream ${err.cause?.code ?? "error"}` }));
      return;
    }
    stats.upstreamStatus[up.status] = (stats.upstreamStatus[up.status] ?? 0) + 1;
    count(req.method, path, up.status);
    const out = {};
    for (const [k, v] of up.headers) if (!HOP.has(k) && k !== "content-encoding" && k !== "set-cookie") out[k] = v;
    res.writeHead(up.status, out);
    if (!up.body) return res.end();
    Readable.fromWeb(up.body).on("error", () => res.destroy()).pipe(res);
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  server.unref();
  const url = `http://127.0.0.1:${server.address().port}`;
  return { url, dummyKey, stats, close: () => new Promise((ok) => server.close(ok)) };
}

const CREDS = {
  codex: (dir, minValidMs) => codexChatgptCredentials(join(dir, "auth.json"), { minValidMs }),
  grok: (dir, minValidMs) => grokSessionCredentials(join(dir, "auth.json"), { minValidMs }),
  gemini: (dir) => geminiApiKeyCredentials(dir),
};

// One proxy per suite, started and stopped by the harness. Throws (nothing started) when the login
// is missing or expires within minValidMs; the message tells the operator how to refresh it.
export async function startRuntimeProxy({ runtime, dir, minValidMs = DEFAULT_MIN_VALID_MS, vertex }) {
  const creds = vertex ? geminiVertexCredentials(vertex.adcPath, vertex.project, vertex.location) : CREDS[runtime](dir, minValidMs);
  const { expiresAt } = creds.check();
  const proxy = await startCredProxy({ creds });
  return { ...proxy, route: creds.route, expiresAt };
}

// One line for suite.notes: counts, paths and statuses only.
export function describeProxyStats(stats) {
  return `auth proxy: ${stats.requests} requests, ${stats.refused} refused, upstream ${JSON.stringify(stats.upstreamStatus)}, by path ${JSON.stringify(stats.byPath)}`;
}
