---
description: equivalence-formatter
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [toolchain-equivalence-pilot, positive]
---

Should we replace the formatter in root hooks? The candidate processes 410 files but uniquely ignores 90 other selected files. Mean time: old 8s, candidate 0.4s. Processed TypeScript normalized ASTs match, but two files lose license/pragma comments, package.json keys reorder and nested width overrides are ignored. Check-only exit behavior and repeated formatting idempotence are untested. Give a small validation plan; do not edit files.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
