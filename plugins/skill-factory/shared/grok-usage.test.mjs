import assert from "node:assert/strict";
import test from "node:test";
import { normalizeGrokUsage } from "./grok-usage.mjs";
import { costOf } from "./pricing.mjs";

test("Grok 1.0.50 cached input contributes once to total input and cost", () => {
  const usage = normalizeGrokUsage({
    input_tokens: 15433,
    cache_read_input_tokens: 32768,
    cache_creation_input_tokens: 0,
    output_tokens: 1943,
    reasoning_tokens: 1169,
    total_tokens: 50144,
  });
  assert.equal(usage.input_tokens, 48201);
  assert.equal(usage.input_tokens + usage.output_tokens, 50144);
  assert.equal(usage.reasoning_output_tokens, 1169);
  assert.equal(
    costOf(
      "grok",
      usage,
      { priceIn: 3, priceCached: 0.75, priceOut: 15 },
      "fixture",
    ),
    (15433 * 3 + 32768 * 0.75 + 1943 * 15) / 1e6,
  );
});

test("cache creation is full price input and empty usage stays zero", () => {
  assert.deepEqual(normalizeGrokUsage(), {
    input_tokens: 0,
    cached_input_tokens: 0,
    output_tokens: 0,
    reasoning_output_tokens: 0,
  });
  assert.deepEqual(
    normalizeGrokUsage({
      input_tokens: 10,
      cache_read_input_tokens: 20,
      cache_creation_input_tokens: 30,
    }),
    {
      input_tokens: 60,
      cached_input_tokens: 20,
      output_tokens: 0,
      reasoning_output_tokens: 0,
    },
  );
});

test("stream usage sums match the native end aggregate", () => {
  const chunks = [
    {
      input_tokens: 13586,
      output_tokens: 130,
      cache_read_input_tokens: 1536,
      reasoning_tokens: 41,
    },
    {
      input_tokens: 1074,
      output_tokens: 106,
      cache_read_input_tokens: 15104,
      reasoning_tokens: 12,
    },
    {
      input_tokens: 773,
      output_tokens: 1707,
      cache_read_input_tokens: 16128,
      reasoning_tokens: 1116,
    },
  ];
  const total = normalizeGrokUsage();
  for (const chunk of chunks) {
    const usage = normalizeGrokUsage(chunk);
    for (const key of Object.keys(total)) total[key] += usage[key];
  }
  assert.deepEqual(
    total,
    normalizeGrokUsage({
      input_tokens: 15433,
      cache_read_input_tokens: 32768,
      output_tokens: 1943,
      reasoning_tokens: 1169,
    }),
  );
});
