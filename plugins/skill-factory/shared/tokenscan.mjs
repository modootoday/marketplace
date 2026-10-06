// Counts files under the given paths holding a real credential of one runtime (whole value or its
// middle 16 chars). Secrets are read in-process; only counts are printed, never values or parse text.
// Usage: tokenscan.mjs codex|grok|gemini <paths...>
import { createDecipheriv, scryptSync } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { homedir, hostname, userInfo } from "node:os";
import { join } from "node:path";
import { adcPath, vertexConfig } from './cloud-config.mjs';
import { geminiVertexCredentials } from "./cred-proxy.mjs";

const [runtime, ...roots] = process.argv.slice(2);

function quietJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.log(JSON.stringify({ error: `cannot parse ${path}`, class: err.constructor.name }));
    process.exit(2);
  }
}

function geminiPlain(file) {
  try {
    const [iv, tag, enc] = readFileSync(file, "utf8").split(":");
    const key = scryptSync("gemini-cli-oauth", `${hostname()}-${userInfo().username}-gemini-cli`, 32);
    const d = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"), { authTagLength: 16 });
    d.setAuthTag(Buffer.from(tag, "hex"));
    return d.update(enc, "hex", "utf8") + d.final("utf8");
  } catch (err) {
    console.log(JSON.stringify({ error: `cannot decrypt ${file}`, class: err.constructor.name }));
    process.exit(2);
  }
}

if (!["codex", "grok", "gemini", "vertex"].includes(runtime) || roots.length === 0) {
  console.error("usage: tokenscan.mjs codex|grok|gemini|vertex <paths...>");
  process.exit(64);
}
const secrets = [];
let source;
let sourceText;
if (runtime === "vertex") {
  source = adcPath();
  const adc = quietJson(source);
  let cloud;
  try { cloud = vertexConfig(); }
  catch (err) { console.log(JSON.stringify({ error: err.message })); process.exit(64); }
  let token;
  try { token = geminiVertexCredentials(source, cloud.project, cloud.location).headers().authorization.slice(7); }
  catch { console.log('{"error":"token acquisition failed"}'); process.exit(2); }
  secrets.push(["access_token", token], ["refresh_token", adc.refresh_token], ["client_secret", adc.client_secret]);
  sourceText = readFileSync(source, "utf8") + token;
}
if (runtime === "codex") {
  source = join(homedir(), ".codex", "auth.json");
  const t = quietJson(source).tokens ?? {};
  secrets.push(["access_token", t.access_token], ["refresh_token", t.refresh_token], ["id_token", t.id_token]);
}
if (runtime === "grok") {
  source = join(homedir(), ".grok", "auth.json");
  const e = Object.values(quietJson(source)).find((v) => v && typeof v.key === "string");
  secrets.push(["session_key", e?.key], ["refresh_token", e?.refresh_token]);
}
if (runtime === "gemini") {
  source = join(homedir(), ".gemini", "gemini-credentials.json");
  const raw = readFileSync(source, "utf8");
  const store = (() => {
    try {
      return JSON.parse(geminiPlain(source));
    } catch (err) {
      console.log(JSON.stringify({ error: "decrypted store is not JSON", class: err.constructor.name }));
      process.exit(2);
    }
  })();
  let apiKey;
  try {
    apiKey = JSON.parse(store["gemini-cli-api-key"]["default-api-key"]).token.accessToken;
  } catch {
    apiKey = undefined;
  }
  secrets.push(["api_key", apiKey], ["integrity_secret", store["gemini-cli-extension-integrity"]?.["secret-key"]], ["encrypted_file_body", raw.split(":")[2]]);
  sourceText = JSON.stringify(store) + raw;
}

const probes = secrets
  .filter(([, v]) => typeof v === "string" && v.length >= 20)
  .map(([name, v]) => ({ name, full: v, mid: v.slice(Math.floor(v.length / 2) - 8, Math.floor(v.length / 2) + 8) }));
const missing = secrets.filter(([, v]) => !(typeof v === "string" && v.length >= 20)).map(([n]) => n);
const counts = Object.fromEntries(probes.map((p) => [p.name, { full: 0, partial: 0 }]));
let scanned = 0;
let dummyKeyFiles = 0;
const scanText = (text, into) => {
  for (const p of probes) {
    if (text.includes(p.full)) into[p.name].full += 1;
    if (text.includes(p.mid)) into[p.name].partial += 1;
  }
};
const walk = (p) => {
  let st;
  try {
    st = lstatSync(p);
  } catch {
    return;
  }
  if (st.isSymbolicLink()) return;
  if (st.isDirectory()) {
    for (const n of readdirSync(p)) walk(join(p, n));
    return;
  }
  if (!st.isFile() || st.size > 50_000_000) return;
  scanned += 1;
  const text = readFileSync(p, "latin1");
  scanText(text, counts);
  if (text.includes("eval-proxy-")) dummyKeyFiles += 1;
};
for (const r of roots) walk(r);
const control = Object.fromEntries(probes.map((p) => [p.name, { full: 0, partial: 0 }]));
scanText(sourceText ?? readFileSync(source, "latin1"), control);
const hits = Object.values(counts).reduce((a, c) => a + c.full + c.partial, 0);
console.log(JSON.stringify({ runtime, scanned, tokenHits: hits, perSecret: counts, missingSecrets: missing, controlOnSource: control, filesWithDummyKey: dummyKeyFiles }));
