---
description: benchmark-layer-matrix
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [build-benchmark-controls, positive]
---

For a pnpm packages/** workspace excluding packages/fixtures/**, write a compact benchmark matrix for keeping or replacing our runner. Dependencies are already installed. We need warm, local-cache-empty, runner-cache-bypassed with compiler state preserved, genuinely rebuild-from-source, and a root tooling dependency control. Do not delete shared caches or execute commands. Explain where install, runner graph preparation and build work belong, and what unmeasured filesystem cache means.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
