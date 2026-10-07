import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { help, parseArgs } from "./options.mjs";
import { assertRuntimeLock, runtimeLaunchFingerprint } from "./runtime-contract.mjs";
import { bwrapAvailable, cliBinds, cleanEnv, isolate } from "./isolate.mjs";
import { startCredProxy } from "./cred-proxy.mjs";
import { spawnOwned, terminateOwned } from "./owned-process.mjs";

const unsupported = ["--effort", "--judge-effort", "--judge-votes", "--price-in", "--price-out", "--price-cached", "--max-tokens", "--hooks", "--mcp", "--publish-report"];

export function validateClaudeOptions(argv, opts) {
  for (const flag of unsupported) {
    if (argv.includes(flag)) {
      throw new Error(`${flag} is unavailable in the native Claude evaluator`);
    }
  }
  if (opts.auth === "oauth" && opts.isolation !== "bwrap") {
    throw new Error("Claude OAuth file authentication requires --isolation bwrap");
  }
  if (opts.scaffold && argv.includes("--no-scaffold")) {
    throw new Error("--scaffold conflicts with --no-scaffold");
  }
}

export function claudeOAuthCredentials(file, minValidMs) {
  const read = () => {
    let oauth;
    try {
      oauth = JSON.parse(readFileSync(file, "utf8")).claudeAiOauth;
    } catch {
      throw new Error("Cannot read Claude saved OAuth credentials");
    }
    if (typeof oauth?.accessToken !== "string" || !oauth.accessToken || !Number.isFinite(oauth.expiresAt) || !oauth.scopes?.includes("user:inference")) {
      throw new Error("Claude saved inference OAuth credentials are missing");
    }
    if (oauth.expiresAt - Date.now() < minValidMs) {
      throw new Error("Claude OAuth expires inside the suite budget; renew outside the harness");
    }
    return oauth;
  };
  return {
    upstream: "https://api.anthropic.com",
    allow: ["/v1/messages"],
    check: () => ({ expiresAt: new Date(read().expiresAt).toISOString() }),
    headers: () => ({ authorization: `Bearer ${read().accessToken}` }),
    accept: ({ method, path, headers }) => method === "POST" && ["/v1/messages", "/v1/messages/count_tokens"].includes(path.split("?")[0]) && String(headers["anthropic-beta"] ?? "").split(",").some((value) => value.trim().startsWith("oauth-")),
  };
}

export function nativeClaudeArgs(opts, plugin, output) {
  const args = ["--setting-sources", "", "plugin", "eval", plugin, "--no-publish", "--trust-plugin", "--ablation", opts.ablation, "--concurrency", String(opts.concurrency), "--threshold", String(opts.threshold), "--output-dir", output];
  for (const [flag, value] of [["--eval-dir", opts.evalDir], ["--model", opts.model], ["--judge-model", opts.judgeModel], ["--runs", opts.runs], ["--max-cost-usd", opts.maxCostUsd], ["--report", opts.report]]) {
    if (value !== undefined) {
      args.push(flag, String(value));
    }
  }
  for (const name of opts.cases) {
    args.push("--case", name);
  }
  if (opts.tags.length) {
    args.push("--tag", ...opts.tags);
  }
  if (opts.allowTools.length) {
    args.push("--allow-tools", ...opts.allowTools);
  }
  if (opts.allowRealServers) {
    args.push("--mocks", "off", "--allow-real-servers");
  }
  if (opts.keep) {
    args.push("--keep-temp");
  }
  args.push(opts.scaffold ? "--scaffold" : "--no-scaffold");
  return args;
}

export function normalizeClaudeResult(data, { version, opts, timedOut = false, interrupted = false }) {
  if (data?.schemaVersion !== 1 || !Array.isArray(data.cases) || !data.aggregates || data.claudeVersion !== version.replace(/ \(Claude Code\)$/, "")) {
    throw new Error("Native Claude result schema or runtime version mismatch");
  }
  let partialReason = data.partialReason ?? null;
  if (data.partial && !partialReason) {
    partialReason = "max-cost-usd";
  }
  if (timedOut) {
    partialReason = "timeout";
  }
  if (interrupted) {
    partialReason = "interrupted";
  }
  return {
    schemaVersion: 1,
    runtime: "claude",
    runtimeVersion: version,
    startedAt: data.startedAt,
    durationSeconds: data.durationSeconds,
    costUsd: data.costUsd ?? null,
    partial: Boolean(data.partial || timedOut || interrupted),
    partialReason,
    tokens: data.tokens ?? null,
    suite: { ...data.suite, root: opts.pluginDir, isolation: opts.isolation, auth: { mode: opts.auth }, evaluationEngine: "native", notes: ["Native Claude evaluator; unreported token totals remain null", "Report publication disabled", "Network access is available in evaluator bubblewrap isolation"] },
    cases: data.cases,
    aggregates: data.aggregates,
  };
}

function copyEvaluationPlugin(source, target, opts) {
  let entries = 0;
  let bytes = 0;
  cpSync(source, target, {
    recursive: true,
    filter(path) {
      const stat = lstatSync(path);
      entries += 1;
      bytes += stat.size;
      if (stat.isSymbolicLink() || entries > 10000 || bytes > 67_108_864) {
        throw new Error("Eval plugin must contain regular entries within the copy budget");
      }
      const name = path.slice(source.length).split("/");
      if (name.some((part) => [".git", "node_modules", "results", "hooks"].includes(part))) {
        return false;
      }
      return opts.allowRealServers || !name.includes(".mcp.json");
    },
  });
  const manifest = join(target, ".claude-plugin/plugin.json");
  const data = JSON.parse(readFileSync(manifest, "utf8"));
  delete data.hooks;
  if (!opts.allowRealServers) {
    delete data.mcpServers;
  }
  writeFileSync(manifest, JSON.stringify(data, null, 2));
}

export async function main(argv = process.argv.slice(2)) {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(help("claude"));
    console.log(`Native Claude restrictions: ${unsupported.join(", ")} are refused. --timeout bounds the entire suite. Native judge defaults apply. Reports are always local. Bundled MCP requires --allow-real-servers. Plugin hooks are removed.`);
    return;
  }
  const opts = parseArgs(argv, "claude");
  let proxy;
  let directory;
  let child;
  let timer;
  let interrupted = false;
  let timedOut = false;
  const interrupt = () => {
    interrupted = true;
    if (child) {
      terminateOwned(child);
    }
  };
  try {
    try {
      validateClaudeOptions(argv, opts);
      if (opts.isolation === "bwrap" && !bwrapAvailable()) {
        throw new Error("bubblewrap is required for default isolation");
      }
      if (opts.runtimeLock) {
        await assertRuntimeLock({ runtime: "claude", binary: opts.claude, path: opts.runtimeLock });
      }
    } catch (error) {
      console.error(`claude-plugin-eval: ${error.message}`);
      process.exitCode = 64;
      return;
    }
    const cli = cliBinds(opts.claude ?? "claude");
    const fingerprint = await runtimeLaunchFingerprint("claude", cli.command);
    const version = fingerprint.version;
    const parts = /^(\d+)\.(\d+)\.(\d+)/.exec(version);
    if (!parts || Number(parts[1]) < 2 || (Number(parts[1]) === 2 && (Number(parts[2]) < 1 || (Number(parts[2]) === 1 && Number(parts[3]) < 269)))) {
      throw new Error("Claude native plugin eval requires version 2.1.269 or later");
    }
    if (opts.work) {
      mkdirSync(opts.work, { recursive: true, mode: 0o700 });
    }
    directory = mkdtempSync(join(opts.work ?? tmpdir(), "claude-plugin-eval-"));
    const home = join(directory, "home");
    const config = join(home, ".claude");
    const plugin = join(directory, "plugin");
    const output = opts.outputDir ?? join(opts.pluginDir, opts.evalDir ?? "evals", "results", new Date().toISOString().replaceAll(":", "-"));
    mkdirSync(config, { recursive: true, mode: 0o700 });
    mkdirSync(output, { recursive: true });
    if (existsSync(join(output, "aggregate-result.json"))) {
      throw new Error("Output already contains aggregate-result.json; select a fresh output directory");
    }
    if (opts.report) {
      mkdirSync(dirname(opts.report), { recursive: true });
    }
    for (const file of [join(home, ".claude.json"), join(config, ".claude.json")]) {
      writeFileSync(file, JSON.stringify({ hasCompletedOnboarding: true }), { mode: 0o600 });
    }
    copyEvaluationPlugin(opts.pluginDir, plugin, opts);
    const env = cleanEnv({ HOME: home, CLAUDE_CONFIG_DIR: config, DISABLE_AUTOUPDATER: "1", CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1", CLAUDE_CODE_MAX_RETRIES: "0" }, cli.nodeBinDirs);
    const ro = [...cli.ro];
    const aliases = [];
    try {
      const credential = join(resolve(opts.authFrom ?? process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude")), ".credentials.json");
      if (opts.auth === "api-key") {
        const key = process.env[opts.apiKeyEnv ?? "ANTHROPIC_API_KEY"];
        if (!key) {
          throw new Error("Claude API key source is empty");
        }
        const creds = { upstream: "https://api.anthropic.com", allow: ["/v1/messages"], headers: () => ({ "x-api-key": key }), accept: ({ method, path }) => method === "POST" && ["/v1/messages", "/v1/messages/count_tokens"].includes(path.split("?")[0]) };
        proxy = await startCredProxy({ creds });
        env.ANTHROPIC_API_KEY = proxy.dummyKey;
        env.ANTHROPIC_BASE_URL = proxy.url;
      } else {
        const creds = claudeOAuthCredentials(credential, opts.suiteMinutes * 60_000);
        creds.check();
        if (opts.auth === "proxy") {
          proxy = await startCredProxy({ creds });
          env.CLAUDE_CODE_OAUTH_TOKEN = proxy.dummyKey;
          env.ANTHROPIC_BASE_URL = proxy.url;
        } else {
          aliases.push([credential, join(config, ".credentials.json")]);
        }
      }
    } catch (error) {
      console.error(`claude-plugin-eval: ${error.message}`);
      process.exitCode = 64;
      return;
    }
    const args = nativeClaudeArgs(opts, plugin, output);
    const rw = [directory, output];
    if (opts.report) {
      rw.push(dirname(opts.report));
    }
    let spec = { command: cli.command, args, env };
    if (opts.isolation === "bwrap") {
      spec = isolate({ ...spec, cwd: directory, rw, ro, aliases });
    }
    child = spawnOwned(spec, { cwd: directory });
    process.on("SIGINT", interrupt);
    process.on("SIGTERM", interrupt);
    child.stdout.resume();
    child.stderr.resume();
    timer = setTimeout(() => {
      timedOut = true;
      terminateOwned(child);
    }, (opts.timeout ?? 600) * 1000);
    const code = await new Promise((done, reject) => {
      child.once("error", reject);
      child.once("close", done);
    });
    const aggregate = join(output, "aggregate-result.json");
    if (!existsSync(aggregate)) {
      throw new Error("Native evaluator produced no aggregate result; inspect the private run directory with --keep-temp");
    }
    const data = JSON.parse(readFileSync(aggregate, "utf8"));
    const result = normalizeClaudeResult(data, { version, opts, timedOut, interrupted });
    const out = JSON.stringify(result, null, 2);
    writeFileSync(aggregate, out);
    if (typeof opts.json === "string") {
      mkdirSync(dirname(opts.json), { recursive: true });
      writeFileSync(opts.json, out);
    } else if (opts.json) {
      console.log(out);
    }
    console.error(`claude-plugin-eval: results ${aggregate}`);
    process.exitCode = code ?? 70;
    if (timedOut) {
      process.exitCode = 2;
    }
    if (interrupted) {
      process.exitCode = 130;
    }
  } catch (error) {
    console.error(`claude-plugin-eval: ${error.message}`);
    process.exitCode = 70;
    if (timedOut) {
      process.exitCode = 2;
    }
    if (interrupted) {
      process.exitCode = 130;
    }
  } finally {
    clearTimeout(timer);
    process.off("SIGINT", interrupt);
    process.off("SIGTERM", interrupt);
    if (child) {
      terminateOwned(child);
    }
    if (proxy) {
      await proxy.close();
    }
    if (directory && !opts.keep) {
      rmSync(directory, { recursive: true, force: true });
    }
  }
}
