---
description: benchmark-root-control
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [build-benchmark-controls, positive]
---

Bun monorepo with modules/a and modules/b: a imports root-only compiler adapter r; b does not. We benchmark a runner change. Editing root package.json r from 1 to 2 produced no misses because the lockfile still resolves 1. Source edit in a rebuilds a only. Cold means local runner cache empty but remote reads enabled; dist remains. Can we claim correct root-dependency invalidation and a cold speedup? Specify controls and reporting, using only these facts.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
