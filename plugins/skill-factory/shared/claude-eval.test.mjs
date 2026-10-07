import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { claudeOAuthCredentials, nativeClaudeArgs, normalizeClaudeResult, validateClaudeOptions } from "./claude-eval.mjs";
import { startCredProxy } from "./cred-proxy.mjs";

test("Claude entrypoint rejects artifact drift before accessing a missing login", () => {
  const dir = mkdtempSync(join(tmpdir(), "claude-lock-test-"));
  const lock = join(dir, "lock.json");
  try {
    writeFileSync(lock, JSON.stringify({ schemaVersion: 1, runtime: "claude", fingerprint: { version: "unexpected", artifacts: {}, nodeSha256: "unexpected" } }));
    const entry = new URL("../skills/claude-plugin-eval/scripts/claude-plugin-eval.mjs", import.meta.url);
    const result = spawnSync(process.execPath, [entry.pathname, dir, "--cli", process.execPath, "--runtime-lock", lock, "--auth-from", join(dir, "missing")], { encoding: "utf8", timeout: 20000 });
    assert.equal(result.status, 64);
    assert.match(result.stderr, /Runtime lock mismatch/);
    assert.doesNotMatch(result.stderr, /Cannot read Claude saved OAuth/);
    const help = spawnSync(process.execPath, [entry.pathname, "--help"], { encoding: "utf8", timeout: 10000 });
    assert.equal(help.status, 0);
    assert.match(help.stdout, /Native Claude restrictions/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

const options = { pluginDir: "/plugin", cases: [], tags: [], allowTools: [], ablation: "with-without", concurrency: 1, threshold: 1, isolation: "bwrap", auth: "proxy" };

test("Claude adapter keeps native report publication disabled and forwards paired filters", () => {
  const args = nativeClaudeArgs({ ...options, cases: ["positive-*", "negative-*"], tags: ["activation"], maxCostUsd: 0, runs: 1 }, "/copy", "/output");
  assert.ok(args.includes("--no-publish"));
  assert.ok(args.includes("--no-scaffold"));
  assert.equal(args.filter((value) => value === "--case").length, 2);
  assert.equal(args[args.indexOf("--max-cost-usd") + 1], "0");
  assert.ok(!args.includes("--mocks"));
});

test("real plugin servers require an explicit operator grant", () => {
  const args = nativeClaudeArgs({ ...options, allowRealServers: true }, "/copy", "/output");
  assert.equal(args[args.indexOf("--mocks") + 1], "off");
  assert.ok(args.includes("--allow-real-servers"));
});

for (const flag of ["--effort", "--judge-effort", "--judge-votes", "--price-in", "--max-tokens", "--hooks", "--mcp", "--publish-report"]) {
  test(`Claude refuses ${flag} before credential loading`, () => {
    assert.throws(() => validateClaudeOptions([flag], options), /unavailable/);
  });
}

test("OAuth file mounts require bubblewrap and conflicting scaffold options are refused", () => {
  assert.throws(() => validateClaudeOptions([], { ...options, auth: "oauth", isolation: "none" }), /bubblewrap|bwrap/);
  assert.throws(() => validateClaudeOptions(["--no-scaffold"], { ...options, scaffold: true }), /conflicts/);
});

test("native result normalization preserves graders without inventing token or activation evidence", () => {
  const run = { score: 1, passed: true, error: null, graders: [{ explanation: "matched ^marker$" }] };
  const native = { schemaVersion: 1, claudeVersion: "2.1.291", startedAt: "2026-10-07T00:00:00Z", durationSeconds: 1, suite: {}, cases: [{ arms: { with: [run] } }], aggregates: { overallScore: 1 } };
  const result = normalizeClaudeResult(native, { version: "2.1.291 (Claude Code)", opts: options });
  assert.equal(result.runtime, "claude");
  assert.equal(result.tokens, null);
  assert.equal(result.cases[0].arms.with[0], run);
  assert.equal(result.partialReason, null);
  assert.throws(() => normalizeClaudeResult(native, { version: "2.1.292", opts: options }), /mismatch/);
  assert.equal(normalizeClaudeResult({ ...native, partial: true }, { version: "2.1.291", opts: options }).partialReason, "max-cost-usd");
  assert.equal(normalizeClaudeResult(native, { version: "2.1.291", opts: options, interrupted: true }).partialReason, "interrupted");
});

test("saved Claude OAuth is read only, expiring tokens and malformed secret JSON are rejected safely", () => {
  const dir = mkdtempSync(join(tmpdir(), "claude-credential-test-"));
  const file = join(dir, ".credentials.json");
  try {
    writeFileSync(file, JSON.stringify({ claudeAiOauth: { accessToken: "synthetic-oauth", expiresAt: Date.now() + 120000, scopes: ["user:inference"] } }));
    const creds = claudeOAuthCredentials(file, 60000);
    assert.equal(creds.headers().authorization, "Bearer synthetic-oauth");
    assert.throws(() => claudeOAuthCredentials(file, 180000).check(), /expires/);
    assert.equal(creds.accept({ method: "POST", path: "/v1/messages", headers: { "anthropic-beta": "oauth-2025-04-20" } }), true);
    assert.equal(creds.accept({ method: "GET", path: "/v1/messages", headers: { "anthropic-beta": "oauth-2025-04-20" } }), false);
    assert.equal(creds.accept({ method: "POST", path: "/v1/messages/foreign", headers: { "anthropic-beta": "oauth-2025-04-20" } }), false);
    writeFileSync(file, "{synthetic-secret");
    assert.throws(() => creds.headers(), (error) => !error.message.includes("synthetic-secret"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("credential proxy rejects adapter-disallowed methods and subpaths without sending upstream requests", async () => {
  let injections = 0;
  const creds = { upstream: "http://127.0.0.1:1", allow: ["/v1/messages"], headers: () => { injections += 1; return {}; }, accept: ({ method, path }) => method === "POST" && path === "/v1/messages" };
  const proxy = await startCredProxy({ creds });
  try {
    const response = await fetch(`${proxy.url}/v1/messages/foreign`, { method: "POST", headers: { authorization: `Bearer ${proxy.dummyKey}` } });
    assert.equal(response.status, 403);
    const get = await fetch(`${proxy.url}/v1/messages`, { headers: { authorization: `Bearer ${proxy.dummyKey}` } });
    assert.equal(get.status, 403);
    assert.equal(injections, 0);
    assert.equal(proxy.stats.refused, 2);
  } finally {
    await proxy.close();
  }
});
