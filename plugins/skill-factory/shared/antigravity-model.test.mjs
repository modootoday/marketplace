import assert from "node:assert/strict";
import test from "node:test";
import { antigravityModel } from "./antigravity-model.mjs";

test("the installed named Gemini preset omits an unsupported effort flag and records actual effort", () => {
  assert.deepEqual(antigravityModel("Gemini 3.8 Flash (High)", "low"), {
    effort: "high",
    args: [],
    fixedPreset: true,
  });
  assert.deepEqual(antigravityModel("Gemini 3.8 Flash (Low)", "high"), {
    effort: "low",
    args: [],
    fixedPreset: true,
  });
});

test("a conflicting explicitly requested effort is refused before inference", () => {
  assert.throws(
    () =>
      antigravityModel("Gemini 3.8 Flash (High)", "low", {
        explicitEffort: true,
      }),
    /fixes effort/,
  );
  assert.deepEqual(
    antigravityModel("Gemini 3.8 Flash (High)", "high", {
      explicitEffort: true,
    }).args,
    [],
  );
});

test("models without a verified named Gemini preset retain native effort arguments", () => {
  for (const model of [
    "gemini-3.8-flash",
    "Other (High)",
    "Gemini Unknown (Thinking)",
  ]) {
    assert.deepEqual(antigravityModel(model, "low"), {
      effort: "low",
      args: ["--effort", "low"],
      fixedPreset: false,
    });
  }
});
