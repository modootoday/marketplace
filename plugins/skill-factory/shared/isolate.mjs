// Shared bubblewrap launcher for the plugin-eval harnesses (codex, grok, gemini).
// The subject agent sees only what is bound here; the rest of the server, including the real
// home directory and every other plugin's skills, does not exist inside the sandbox.
import { spawnSync } from "node:child_process";
import { spawnOwned, terminateOwned } from "./owned-process.mjs";
import { existsSync, readFileSync, readlinkSync, realpathSync, statSync } from "node:fs";
import { delimiter, dirname, join, resolve, sep } from "node:path";

export const BWRAP = spawnSync("sh", ["-c", "command -v bwrap"], { encoding: "utf8" }).stdout?.trim() || "bwrap";

const SYSTEM_RO = ["/usr", "/bin", "/sbin", "/lib", "/lib32", "/lib64", "/libx32"];

// Only the /etc entries a CLI needs to load libraries, resolve names and verify TLS.
const ETC_RO = [
  "ld.so.cache",
  "ld.so.conf",
  "ld.so.conf.d",
  "alternatives",
  "ssl",
  "ca-certificates",
  "ca-certificates.conf",
  "resolv.conf",
  "hosts",
  "host.conf",
  "nsswitch.conf",
  "gai.conf",
  "passwd",
  "group",
  "localtime",
  "timezone",
  "os-release",
  "protocols",
  "services",
];

export const ISOLATION_MODES = ["bwrap", "none"];

export function parseIsolation(value) {
  if (!ISOLATION_MODES.includes(value)) throw new Error(`--isolation must be one of ${ISOLATION_MODES.join(", ")}`);
  return value;
}

export function bwrapAvailable() {
  return existsSync(BWRAP);
}

const real = (p) => {
  try {
    return realpathSync(p);
  } catch {
    return null;
  }
};

const isDir = (p) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
};

// The environment a sandboxed CLI gets: nothing from the operator's shell, so no tokens or keys.
export function cleanEnv(extra = {}, nodeBinDirs = []) {
  const path = [...nodeBinDirs, "/usr/local/bin", "/usr/bin", "/bin"].join(":");
  return { PATH: path, LANG: process.env.LANG || "C.UTF-8", TERM: "dumb", NO_COLOR: "1", ...extra };
}

// Directory that holds the node binary the harness itself runs under; the CLI's `env node` shebang needs it.
export function nodeInstall() {
  const bin = real(process.execPath);
  if (!bin) return null;
  return { binDir: dirname(bin), root: dirname(dirname(bin)) };
}

// Read-only paths a CLI binary needs: itself, and for a node script the node install it lives in.
export function cliBinds(binPath) {
  if (!binPath.includes(sep)) {
    binPath = (process.env.PATH ?? '').split(delimiter).map((dir) => join(dir, binPath)).find(existsSync) ?? binPath;
  }
  const target = real(binPath);
  if (!target) throw new Error(`cannot resolve ${binPath}`);
  const ro = new Set([target]);
  const node = nodeInstall();
  const head = readFileSync(target, { encoding: "latin1" }).slice(0, 80);
  if (/^#!.*\bnode\b/.test(head) && node) {
    ro.add(node.root);
    const marker = `${sep}node_modules${sep}`;
    const at = target.indexOf(marker);
    if (at > 0 && !target.startsWith(`${node.root}${sep}`)) {
      const rest = target.slice(at + marker.length).split(sep);
      const pkg = rest[0].startsWith("@") ? rest.slice(0, 2) : rest.slice(0, 1);
      ro.add(join(target.slice(0, at), "node_modules", ...pkg));
    }
  }
  return { command: target, ro: [...ro], nodeBinDirs: node && /node/.test(head) ? [node.binDir] : [] };
}

// An MCP server launched by the CLI runs in the same sandbox: bind its command, the target of
// that command's symlink, and its package tree read-only. Its env stays the copied config's.
export function mcpBinds(mcpConfigText) {
  const ro = new Set();
  const paths = [];
  for (const m of mcpConfigText.matchAll(/^\s*command\s*=\s*"([^"]+)"/gm)) paths.push(m[1]);
  for (const m of mcpConfigText.matchAll(/^\s*args\s*=\s*\[([^\]]*)\]/gm)) {
    for (const s of m[1].matchAll(/"([^"]+)"/g)) paths.push(s[1]);
  }
  for (const p of paths) {
    if (!p.startsWith("/") || !existsSync(p)) continue;
    const target = real(p);
    ro.add(isDir(p) ? p : dirname(p));
    if (!target) continue;
    const marker = `${sep}node_modules${sep}`;
    const at = target.indexOf(marker);
    if (at > 0) {
      const rest = target.slice(at + marker.length).split(sep);
      const pkg = rest[0].startsWith("@") ? rest.slice(0, 2) : rest.slice(0, 1);
      ro.add(join(target.slice(0, at), "node_modules", ...pkg));
      ro.add(join(target.slice(0, at), "node_modules"));
    } else {
      ro.add(isDir(target) ? target : dirname(target));
    }
  }
  return [...ro];
}

// Builds the bwrap invocation. rw: writable run paths; ro: login files and read-only extras.
export function isolate({ command, args = [], env, cwd, rw = [], ro = [], network = true, aliases = [] }) {
  const argv = [
    "--die-with-parent",
    "--new-session",
    "--unshare-pid",
    "--unshare-ipc",
    "--unshare-uts",
    "--unshare-cgroup-try",
  ];
  if (!network) argv.push("--unshare-net");
  for (const p of SYSTEM_RO) {
    if (!existsSync(p)) continue;
    if (real(p) !== p) argv.push("--symlink", readlinkSync(p), p);
    else argv.push("--ro-bind", p, p);
  }
  argv.push("--dir", "/etc");
  for (const name of ETC_RO) {
    const p = join("/etc", name);
    if (!existsSync(p)) continue;
    const target = real(p);
    if (target !== p && !target.startsWith("/etc/")) argv.push("--ro-bind", target, target);
    argv.push("--ro-bind", p, p);
  }
  if (existsSync("/run/systemd/resolve")) argv.push("--ro-bind", "/run/systemd/resolve", "/run/systemd/resolve");
  argv.push("--dev", "/dev", "--proc", "/proc", "--tmpfs", "/tmp", "--tmpfs", "/home");
  const seen = new Set();
  for (const p of ro) {
    const abs = resolve(p);
    if (seen.has(abs) || !existsSync(abs)) continue;
    seen.add(abs);
    argv.push("--ro-bind", abs, abs);
  }
  for (const p of rw) {
    const abs = resolve(p);
    if (seen.has(abs) || !existsSync(abs)) continue;
    seen.add(abs);
    argv.push("--bind", abs, abs);
  }
  for (const [source, target] of aliases) argv.push("--bind", source, target);
  if (cwd) argv.push("--chdir", cwd);
  return { command: BWRAP, args: [...argv, "--", command, ...args], env };
}

// proxy is the harness default: the login stays outside the sandbox behind a loopback proxy.
export const AUTH_MODES = ["proxy", "oauth", "api-key"];

export const DEFAULT_AUTH_MODE = "proxy";

// The variable each CLI reads for API-key auth; the key is injected into the sandbox under this name.
export const API_KEY_VARS = { codex: "CODEX_API_KEY", grok: "XAI_API_KEY", gemini: "GEMINI_API_KEY" };

export function parseAuthMode(value) {
  if (!AUTH_MODES.includes(value)) {
    throw new Error(`--auth must be one of proxy (default, login kept outside the sandbox), oauth (debug/legacy, token visible in the sandbox), api-key (one key variable in the sandbox); got ${value}`);
  }
  return value;
}

// Resolves --auth, --auth-from and --api-key-env into one record; the key stays in memory, never in suite.auth.
export function resolveAuth({ runtime, mode = "oauth", authFrom, apiKeyEnv, operatorDir }) {
  const cliVar = API_KEY_VARS[runtime];
  if (mode === "api-key") {
    if (authFrom) throw new Error("--auth-from applies to --auth proxy or oauth only");
    const name = apiKeyEnv ?? cliVar;
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error("--api-key-env must be an environment variable name");
    const key = process.env[name];
    if (!key) throw new Error(`--auth api-key: environment variable ${name} is not set or is empty`);
    return { mode, source: `env:${name}`, key, cliVar, dir: null, record: { mode, source: `env:${name}` } };
  }
  if (apiKeyEnv) throw new Error("--api-key-env applies to --auth api-key only");
  if (authFrom) {
    const dir = resolve(authFrom);
    if (!isDir(dir)) throw new Error(`--auth-from ${dir} is not a directory`);
    return { mode, source: "auth-from", key: null, cliVar, dir, record: { mode, source: "auth-from" } };
  }
  return { mode, source: "operator", key: null, cliVar, dir: operatorDir, record: { mode, source: "operator" } };
}

// Removes the key and the masked echo some APIs return from any text that may reach results or logs.
export function redactSecrets(text, auth) {
  let out = String(text ?? "");
  if (auth?.key) out = out.replaceAll(auth.key, "[redacted]");
  return out.replace(/(API key provided:?\s*)[^\s,.]+/gi, "$1[redacted]");
}

// Runs a launch spec (from isolate() or a plain command) to completion; setup steps use it.
export function runSpec(spec, { cwd, timeoutMs = 300_000 } = {}) {
  return new Promise((done) => {
    const child = spawnOwned(spec, { cwd });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => {
      stdout = (stdout + d).slice(-4000);
    });
    child.stderr.on("data", (d) => {
      stderr = (stderr + d).slice(-4000);
    });
    const timer = setTimeout(() => terminateOwned(child), timeoutMs);
    child.on("error", (err) => {
      clearTimeout(timer);
      done({ code: -1, stdout, stderr: String(err) });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      done({ code, stdout, stderr });
    });
  });
}

// One line for suite.notes and stderr.
export function describeIsolation(mode) {
  if (mode === "none") return "isolation none: the agent can read any file the operator can (debugging only)";
  return "isolation bwrap: only system dirs, the CLI install, the run dir (and, under --auth oauth only, the login files) are visible; /home is empty, /tmp is private, env is scrubbed";
}
