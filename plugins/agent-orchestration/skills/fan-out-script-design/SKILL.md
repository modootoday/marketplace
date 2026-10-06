---
name: fan-out-script-design
description: Design a script that drives dozens or more agents - phases of discover, per-item pipeline, independent verification and one reduce step, barriers only where a stage needs every result, a deterministic script with no clock or randomness and per-item prompts independent of siblings so a resume reruns only what changed, schema hand-backs with explicit handling of failed agents, caps on heavy local tools and agents, a pilot slice and loop stop rules. Use when asked to outline or write a workflow script, batch job or pipeline over many files or items with agents. Not for a few turn-by-turn helpers.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [workflow script, pipeline, parallel, resume, schema, concurrency, map reduce, pilot, fan out]
---

# Fan-out script design

A script holds the plan, so it can run hundreds of agents, resume after a failure and repeat. It also
repeats mistakes at scale. Write it as phases with caps, and say what a failure reruns. The agent(),
pipeline() and parallel() names below are Claude Code's workflow primitives; map them to your
runtime's equivalents.

## 1. Phases

1. **Discover**: one agent returns the item list through a schema (id, path, size). Do not let the
   script guess the list.
2. **Map**: a per-item pipeline (stage A then B then C for each item) rather than waiting for all items
   between stages.
3. **Verify**: independent refuters in fresh context for findings or risky changes.
4. **Reduce**: one agent deduplicates, ranks and merges.

Put a barrier (wait for all) only where the next stage needs every result: dedupe, ranking, a global
budget check.

## 2. Determinism and resume

- No clock, no randomness and no outside state inside the script; pass them as arguments. A relaunch
  must produce the same agent calls.
- Per-item prompts must not depend on sibling outputs, or one change reruns everything.
- On resume the first agent whose prompt differs or that failed reruns, and so does every agent started
  after it. So put expensive, stable stages first and edit late stages. Say this in the design.

## 3. Hand-backs and failures

Use a schema at every merge point. A failed or stopped agent can come back empty: filter it out
explicitly and list the items that failed in the final result, never drop them silently. Validation
retries are finite; plan for the item that never validates.

## 4. Caps

- Agent concurrency below your runtime's limit (check the documented numbers; Claude Code documents
  defaults for concurrent agents, items per call and agents per run).
- Heavy local tools are a separate limit: compilers, type checkers and test runners multiply memory per
  agent and the agent cap does not see it. Serialize them through a lock or a queue, or run them once at
  the end of a chunk.
- A per-agent turn or spend cap and a run-level agent cap; warn before a run projected to be large.
  Write these into the outline as named settings with values (for example max turns per agent, a
  total agent budget), not as a remark; an outline without them is incomplete.

## 5. Pilot and loops

Run the script on 2 or 3 items first, read the outputs, fix the prompts, then run the full set. A loop
needs a round cap or a stop after N rounds with nothing new. Sign-off between stages means separate
runs, because a run takes no input midway.

Read `references/script-outline-example.md` for an annotated outline.

## 6. Every answer states these

Whatever form the outline takes, the explanation must say each of the following in its own line:

1. The pilot: the slice size (as an argument) and that its outputs are read before the full run.
2. The concurrency limit on the heavy tool and its arithmetic (limit times memory per run against the host).
3. Where there is a barrier and why every other stage is a per-item pipeline.
4. What resume reruns: the first changed or failed agent and every agent started after it, and so the
   script is deterministic, per-item prompts depend only on the item, and stable expensive stages come
   first. A status ledger written by finished items is an extra layer, not a replacement for this rule.
5. One reduce agent at the end that groups results by cause and ranks them, even when counts are tallied in code; how null or failed agents are filtered and listed, and the schemas on hand-backs.
6. The per-agent and run-level caps as named settings.
