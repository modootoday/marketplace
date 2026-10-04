import assert from "node:assert/strict";
import { test } from "node:test";

import { judge } from "./release-gate.mjs";

const run = (graders, error = null) => ({ error, graders: graders.map(([name, passed]) => ({ name, passed })) });

function suite(overrides = {}) {
  return {
    costUsd: 1,
    cases: [
      { name: "a", dir: "evals/a", aggregates: { delta: 1 }, arms: { with: [run([["skill-fired", true]]), run([["skill-fired", true]])] } },
      { name: "b", dir: "evals/b", aggregates: { delta: 0 }, arms: { with: [run([["skill-fired", true]])] } },
      { name: "n", dir: "evals/n", aggregates: { delta: 0 }, arms: { with: [run([["skill-not-fired", true]])] } },
      ...(overrides.extra ?? []),
    ],
  };
}

const TAGS = { "evals/a": ["alpha"], "evals/b": ["beta"], "evals/n": ["plugin", "negative"], "evals/c": ["beta"] };
const tagsOf = (dir) => TAGS[dir] ?? [];

test("passes a suite where every skill has a case, fires every time and helps on average", () => {
  const verdict = judge(suite(), ["alpha", "beta"], tagsOf);
  assert.equal(verdict.ok, true);
  assert.deepEqual(verdict.findings, []);
});

test("refuses fewer than three cases", () => {
  const verdict = judge({ cases: suite().cases.slice(0, 2) }, ["alpha", "beta"], tagsOf);
  assert.match(verdict.findings.join("\n"), /at least 3/u);
});

test("refuses a skill without a positive case", () => {
  const verdict = judge(suite(), ["alpha", "beta", "gamma"], tagsOf);
  assert.match(verdict.findings.join("\n"), /gamma: no positive eval case/u);
});

test("does not count a negative case as covering a skill", () => {
  const verdict = judge(suite(), ["alpha", "beta", "plugin"], tagsOf);
  assert.match(verdict.findings.join("\n"), /plugin: no positive eval case/u);
});

test("refuses when an invocation grader fails in any run", () => {
  const s = suite();
  s.cases[0].arms.with[1] = run([["skill-fired", false]]);
  assert.match(judge(s, ["alpha", "beta"], tagsOf).findings.join("\n"), /a: skill-fired failed in run 2/u);
});

test("refuses a skill that fires on the negative case", () => {
  const s = suite();
  s.cases[2].arms.with[0] = run([["skill-not-fired", false]]);
  assert.equal(judge(s, ["alpha", "beta"], tagsOf).ok, false);
});

test("refuses a mean delta of zero or below", () => {
  const s = suite();
  s.cases[0].aggregates.delta = 0;
  assert.match(judge(s, ["alpha", "beta"], tagsOf).findings.join("\n"), /mean delta/u);
});

test("warns but does not refuse a single case that scored lower", () => {
  const extra = [{ name: "c", dir: "evals/c", aggregates: { delta: -0.5 }, arms: { with: [run([["skill-fired", true]])] } }];
  const s = suite({ extra });
  s.cases[0].aggregates.delta = 1;
  const verdict = judge(s, ["alpha", "beta"], tagsOf);
  assert.equal(verdict.ok, true);
  assert.match(verdict.warnings.join("\n"), /c: scored lower/u);
});

test("refuses an errored run", () => {
  const s = suite();
  s.cases[1].arms.with[0] = run([["skill-fired", true]], "timeout");
  assert.match(judge(s, ["alpha", "beta"], tagsOf).findings.join("\n"), /errored: timeout/u);
});
