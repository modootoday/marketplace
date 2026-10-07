import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import {
  closeSync,
  existsSync,
  fstatSync,
  lstatSync,
  mkdtempSync,
  openSync,
  readFileSync,
  readSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { cliBinds, cleanEnv, runSpec } from "./isolate.mjs";

const runtimes = ["codex", "grok", "gemini", "antigravity", "claude"];

export function artifactSha256(file) {
  const descriptor = openSync(file, "r");
  try {
    const stat = fstatSync(descriptor);
    if (!stat.isFile() || stat.size > 536_870_912) {
      throw new Error("Runtime artifact must be a regular file within 512 MiB");
    }
    const value = createHash("sha256");
    const buffer = Buffer.alloc(65_536);
    for (
      let count = readSync(descriptor, buffer);
      count;
      count = readSync(descriptor, buffer)
    ) {
      value.update(buffer.subarray(0, count));
    }
    return value.digest("hex");
  } finally {
    closeSync(descriptor);
  }
}

function treeFiles(directory) {
  const files = [];
  let entries = 0;
  const visit = (path, depth) => {
    if (depth > 32) {
      throw new Error("Runtime artifact depth exceeds 32");
    }
    const children = readdirSync(path, { withFileTypes: true });
    entries += children.length;
    if (entries > 8192) {
      throw new Error("Runtime artifact tree exceeds 8192 entries");
    }
    for (const entry of children.sort((a, b) => a.name.localeCompare(b.name))) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) {
        visit(file, depth + 1);
        continue;
      }
      if (entry.isSymbolicLink()) {
        throw new Error("Runtime artifact tree contains a symbolic link");
      }
      if (entry.isFile()) {
        files.push(file);
      }
    }
  };
  visit(directory, 0);
  return files;
}

export function runtimeArtifacts(runtime, command) {
  if (!runtimes.includes(runtime)) {
    throw new Error("Unknown runtime contract");
  }
  const files = [command];
  const packageRoot = resolve(dirname(command), "..");
  const packageFile = join(packageRoot, "package.json");
  if (existsSync(packageFile)) {
    files.push(packageFile);
  }
  if (runtime === "codex") {
    let vendor = join(packageRoot, "vendor");
    try {
      const nativePackage = createRequire(command).resolve(
        `@openai/codex-${process.platform}-${process.arch}/package.json`,
      );
      vendor = join(dirname(nativePackage), "vendor");
      files.push(nativePackage);
    } catch (error) {
      if (error.code !== "MODULE_NOT_FOUND") {
        throw error;
      }
    }
    const nativeFiles = treeFiles(vendor).filter(
      (file) => file.endsWith("/codex") || file.endsWith("/rg"),
    );
    if (!nativeFiles.some((file) => file.endsWith("/codex"))) {
      throw new Error(
        "Codex native payload is missing from the runtime contract",
      );
    }
    files.push(...nativeFiles);
  }
  if (runtime === "gemini") {
    files.push(
      ...treeFiles(dirname(command)).filter((file) =>
        /\.(?:mjs|cjs|js|json)$/.test(file),
      ),
    );
  }
  return Object.fromEntries(
    [...new Set(files.map((file) => realpathSync(file)))]
      .sort()
      .map((file) => [file, artifactSha256(file)]),
  );
}

export async function runtimeLaunchFingerprint(runtime, binary) {
  const cli = cliBinds(binary ?? (runtime === "antigravity" ? "agy" : runtime));
  const artifacts = runtimeArtifacts(runtime, cli.command);
  const directory = mkdtempSync(join(tmpdir(), "plugin-eval-contract-"));
  try {
    const result = await runSpec(
      {
        command: cli.command,
        args: ["--version"],
        env: cleanEnv({ HOME: directory, CODEX_HOME: directory }, [
          dirname(process.execPath),
        ]),
      },
      { cwd: directory, timeoutMs: 15_000 },
    );
    const version = result.stdout.trim().replace(/\s+\[[a-z]+\]$/, "");
    if (
      result.code !== 0 ||
      !version ||
      version.length > 256 ||
      /[\r\n]/.test(version)
    ) {
      throw new Error("Runtime contract version inspection failed");
    }
    return {
      version,
      artifacts,
      nodeSha256: artifactSha256(process.execPath),
    };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

export function compareRuntimeLock(expected, observed) {
  for (const field of ["version", "artifacts", "nodeSha256"]) {
    if (
      !expected?.[field] ||
      JSON.stringify(expected[field]) !== JSON.stringify(observed[field])
    ) {
      throw new Error(
        `Runtime lock mismatch: ${field}; requalify before replacing the lock`,
      );
    }
  }
}

export async function assertRuntimeLock({ runtime, binary, path }) {
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.size > 1_048_576) {
    throw new Error("Runtime lock must be a regular file within 1 MiB");
  }
  const lock = JSON.parse(readFileSync(path, "utf8"));
  if (lock.schemaVersion !== 1 || lock.runtime !== runtime) {
    throw new Error("Runtime lock schema or runtime mismatch");
  }
  compareRuntimeLock(
    lock.fingerprint,
    await runtimeLaunchFingerprint(runtime, binary),
  );
  return async () => {
    compareRuntimeLock(
      lock.fingerprint,
      await runtimeLaunchFingerprint(runtime, binary),
    );
  };
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  const [mode, runtime, path, binary] = process.argv.slice(2);
  if (
    !runtimes.includes(runtime) ||
    !path ||
    !["capture", "check"].includes(mode)
  ) {
    throw new Error(
      "Usage: runtime-contract.mjs capture|check codex|grok|gemini|antigravity|claude <lock.json> [binary]",
    );
  }
  if (mode === "capture") {
    if (existsSync(path)) {
      throw new Error(
        "Runtime lock already exists; automatic replacement is prohibited",
      );
    }
    const fingerprint = await runtimeLaunchFingerprint(runtime, binary);
    writeFileSync(
      path,
      JSON.stringify({ schemaVersion: 1, runtime, fingerprint }, null, 2),
      { mode: 0o600, flag: "wx" },
    );
    console.log(`${runtime}: runtime lock captured; no provider inference`);
  } else {
    await assertRuntimeLock({ runtime, binary, path });
    console.log(`${runtime}: runtime lock verified; no provider inference`);
  }
}
