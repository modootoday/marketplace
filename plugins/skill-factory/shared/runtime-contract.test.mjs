import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import {
  assertRuntimeLock,
  compareRuntimeLock,
  runtimeArtifacts,
  runtimeLaunchFingerprint,
} from "./runtime-contract.mjs";

test("runtime locks reject version, payload and Node drift", () => {
  const expected = {
    version: "test 1",
    artifacts: { cli: "a" },
    nodeSha256: "b",
  };
  compareRuntimeLock(expected, structuredClone(expected));
  for (const field of ["version", "artifacts", "nodeSha256"]) {
    assert.throws(
      () => compareRuntimeLock(expected, { ...expected, [field]: "changed" }),
      /Runtime lock mismatch/,
    );
    assert.throws(
      () => compareRuntimeLock({ ...expected, [field]: undefined }, expected),
      /Runtime lock mismatch/,
    );
  }
});

test("fingerprint inspection uses private HOME and scrubbed credentials and rejects changed artifacts", async () => {
  const directory = mkdtempSync(join(tmpdir(), "eval-contract-test-"));
  const binary = join(directory, "fake-grok");
  const path = join(directory, "lock.json");
  const source = [
    "#!/usr/bin/env node",
    "if (process.argv[2] !== '--version') process.exit(9);",
    "if (process.env.EVAL_CONTRACT_SECRET || process.env.XAI_API_KEY) process.exit(10);",
    "if (!process.env.HOME.includes('plugin-eval-contract-')) process.exit(11);",
    "console.log('grok fixture 1 [stable]');",
    "",
  ].join("\n");
  const original = process.env.EVAL_CONTRACT_SECRET;
  process.env.EVAL_CONTRACT_SECRET = "synthetic-canary";
  try {
    writeFileSync(binary, source, { mode: 0o700 });
    const fingerprint = await runtimeLaunchFingerprint("grok", binary);
    assert.equal(fingerprint.version, "grok fixture 1");
    writeFileSync(
      path,
      JSON.stringify({ schemaVersion: 1, runtime: "grok", fingerprint }),
    );
    await assertRuntimeLock({ runtime: "grok", binary, path });
    await assert.rejects(
      assertRuntimeLock({ runtime: "gemini", binary, path }),
      /runtime mismatch/,
    );
    writeFileSync(binary, source + "\n");
    await assert.rejects(
      assertRuntimeLock({ runtime: "grok", binary, path }),
      /mismatch: artifacts/,
    );
    const result = spawnSync(
      process.execPath,
      [
        join(import.meta.dirname, "runtime-contract.mjs"),
        "capture",
        "grok",
        path,
        binary,
      ],
      { encoding: "utf8", timeout: 10_000 },
    );
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /already exists/);
  } finally {
    if (original === undefined) {
      delete process.env.EVAL_CONTRACT_SECRET;
    } else {
      process.env.EVAL_CONTRACT_SECRET = original;
    }
    rmSync(directory, { recursive: true, force: true });
  }
});

test("Codex fingerprints include the native payload and reject a missing payload", () => {
  const directory = mkdtempSync(join(tmpdir(), "eval-native-contract-"));
  try {
    const binary = join(directory, "bin", "codex");
    assert.throws(() => runtimeArtifacts("codex", binary), /ENOENT/);
    mkdirSync(join(directory, "bin"));
    mkdirSync(join(directory, "vendor"));
    writeFileSync(binary, "synthetic launcher");
    const payload = join(directory, "vendor", "codex");
    writeFileSync(payload, "synthetic native payload");
    const before = runtimeArtifacts("codex", binary);
    assert.ok(before[payload]);
    writeFileSync(payload, "changed native payload");
    assert.notEqual(
      runtimeArtifacts("codex", binary)[payload],
      before[payload],
    );
    symlinkSync(binary, join(directory, "vendor", "unexpected-link"));
    assert.throws(() => runtimeArtifacts("codex", binary), /symbolic link/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("all evaluator entrypoints reject a mismatched lock before authentication", () => {
  const directory = mkdtempSync(join(tmpdir(), "eval-contract-entrypoint-"));
  const lock = join(directory, "lock.json");
  try {
    writeFileSync(
      lock,
      JSON.stringify({ schemaVersion: 99, runtime: "other" }),
    );
    for (const runtime of ["codex", "grok", "gemini", "antigravity"]) {
      const script = resolve(
        import.meta.dirname,
        "../skills",
        `${runtime}-plugin-eval/scripts/${runtime}-plugin-eval.mjs`,
      );
      const result = spawnSync(
        process.execPath,
        [
          script,
          directory,
          "--model",
          "synthetic-model",
          "--auth",
          "oauth",
          "--auth-from",
          join(directory, "missing-auth"),
          "--cli",
          process.execPath,
          "--runtime-lock",
          lock,
        ],
        { encoding: "utf8", timeout: 15_000 },
      );
      assert.equal(result.status, 64, `${runtime}: ${result.stderr}`);
      assert.match(result.stderr, /Runtime lock schema or runtime mismatch/);
      assert.doesNotMatch(result.stderr, /missing-auth is not a directory/);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
