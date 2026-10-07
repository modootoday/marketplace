import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { antigravityToolEvents } from "./antigravity-events.mjs";
import { runSpec, isolationScope } from "./isolate.mjs";
import { spawnOwned, terminateOwned } from "./owned-process.mjs";

const first = "00000000-0000-0000-0000-000000000001";
const second = "00000000-0000-0000-0000-000000000002";
const fixture = join(import.meta.dirname, "fixtures/process-tree.mjs");

test("filesystem isolation never claims a confined network or Docker control plane", () => {
  const wrapped = isolationScope("bwrap");
  assert.equal(wrapped.filesystem, "selected-mounts");
  assert.equal(wrapped.processNamespaces, true);
  assert.equal(wrapped.directEgressBlocked, false);
  assert.equal(wrapped.network, "host");
  assert.equal(wrapped.dockerControlPlane, false);
  assert.equal(isolationScope("none").filesystem, "host-readable");
  assert.throws(() => isolationScope("docker"), /Unknown/);
});
const step = {
  type: "PLANNER_RESPONSE",
  step_index: 4,
  tool_calls: [
    {
      name: "view_file",
      args: { AbsolutePath: JSON.stringify("/workspace/example.md") },
    },
  ],
};

function home(t) {
  const directory = mkdtempSync(join(tmpdir(), "plugin-eval-regression-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function transcript(
  directory,
  id = first,
  name = "00000001.jsonl",
  steps = [step],
) {
  const chunks = join(
    directory,
    ".gemini/antigravity-cli/brain",
    id,
    ".system_generated/logs/chunks/transcript",
  );
  mkdirSync(chunks, { recursive: true });
  const file = join(chunks, name);
  writeFileSync(file, steps.map((entry) => JSON.stringify(entry)).join("\n"));
  return file;
}

function running(pid) {
  try {
    return readFileSync(`/proc/${pid}/stat`, "utf8").split(") ")[1][0] !== "Z";
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

test("native tool events have stable identifiers and selected conversation scope", (t) => {
  const directory = home(t);
  transcript(directory);
  transcript(directory, first, "00000002.jsonl");
  transcript(directory, second);
  const events = antigravityToolEvents(directory);
  assert.equal(events.length, 2);
  assert.equal(events[0].tool_id, `${first}-4-0`);
  assert.equal(events[0].parameters.file_path, "/workspace/example.md");
  assert.equal(events[1].nativeConversationId, second);
  assert.deepEqual(
    antigravityToolEvents(directory, { conversationIds: [second] }),
    [events[1]],
  );
});

test("user journal content and malformed calls cannot become tool evidence", (t) => {
  const directory = home(t);
  transcript(directory, first, "00000001.jsonl", [
    null,
    "not a native step",
    { ...step, type: "USER_INPUT" },
    { ...step, tool_calls: [{ name: "invalid name", args: {} }] },
    { ...step, tool_calls: [{ name: "view_file", args: [] }] },
    { ...step, step_index: "4" },
  ]);
  assert.deepEqual(antigravityToolEvents(directory), []);
  assert.throws(
    () => antigravityToolEvents(directory, { conversationIds: ["../outside"] }),
    /selection/,
  );
});

test("transcript and conversation symlinks are refused", (t) => {
  const directory = home(t);
  const file = transcript(directory);
  const outside = join(directory, "outside.jsonl");
  writeFileSync(outside, JSON.stringify(step));
  rmSync(file);
  symlinkSync(outside, file);
  assert.throws(() => antigravityToolEvents(directory), /symbolic link/);
  rmSync(file);
  const brain = join(directory, ".gemini/antigravity-cli/brain");
  rmSync(join(brain, first), { recursive: true });
  symlinkSync(directory, join(brain, first));
  assert.throws(() => antigravityToolEvents(directory), /symbolic link/);
});

test("file, byte, event, and directory budgets fail instead of truncating evidence", (t) => {
  const directory = home(t);
  transcript(directory);
  transcript(directory, first, "00000002.jsonl", [{ ...step, step_index: 5 }]);
  assert.throws(
    () => antigravityToolEvents(directory, { maxFiles: 1 }),
    /budget/,
  );
  assert.throws(
    () => antigravityToolEvents(directory, { maxBytes: 10 }),
    /budget/,
  );
  assert.throws(
    () => antigravityToolEvents(directory, { maxEvents: 1 }),
    /budget/,
  );
  assert.throws(
    () => antigravityToolEvents(directory, { maxFiles: 0 }),
    /positive/,
  );
  const brain = join(directory, ".gemini/antigravity-cli/brain");
  for (let index = 0; index < 4096; index += 1) {
    writeFileSync(join(brain, `ignored-${index}`), "");
  }
  assert.throws(() => antigravityToolEvents(directory), /directory budget/);
});

test("missing history is empty and invalid history names are ignored", (t) => {
  const directory = home(t);
  assert.deepEqual(antigravityToolEvents(directory), []);
  transcript(directory, "not-a-native-conversation");
  assert.deepEqual(antigravityToolEvents(directory), []);
});

test("owned termination refuses a process it did not start", () => {
  assert.equal(terminateOwned({ pid: process.pid }), false);
});

for (const mode of ["parent", "exit-parent"]) {
  test(
    `timeout closes inherited pipes and terminates descendants after ${mode}`,
    { timeout: 5000 },
    async () => {
      const result = await runSpec(
        { command: process.execPath, args: [fixture, mode], env: process.env },
        { timeoutMs: 800 },
      );
      const descendant = JSON.parse(result.stdout.trim()).descendant;
      assert.equal(running(descendant), false);
      assert.equal(typeof result.stderr, "string");
    },
  );
}

test(
  "explicit owned termination closes the process group",
  { timeout: 5000 },
  async (t) => {
    const child = spawnOwned({
      command: process.execPath,
      args: [fixture],
      env: process.env,
    });
    t.after(() => terminateOwned(child));
    const closed = once(child, "close");
    const [output] = await once(child.stdout, "data");
    const descendant = JSON.parse(String(output).trim()).descendant;
    assert.equal(terminateOwned(child), true);
    await closed;
    assert.equal(running(descendant), false);
  },
);

test("missing executable reports failure without an unhandled error", async () => {
  const result = await runSpec(
    { command: "/plugin-eval-missing-executable", args: [], env: process.env },
    { timeoutMs: 100 },
  );
  assert.equal(result.code, -1);
  assert.match(result.stderr, /ENOENT/);
});

for (const runtime of ["codex", "grok", "gemini", "antigravity"]) {
  test(`${runtime} evaluator retains its CLI without provider inference`, () => {
    const file = resolve(
      import.meta.dirname,
      "../skills",
      `${runtime}-plugin-eval/scripts/${runtime}-plugin-eval.mjs`,
    );
    const result = spawnSync(process.execPath, [file, "--help"], {
      encoding: "utf8",
      timeout: 5000,
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Usage:/i);
  });
}
