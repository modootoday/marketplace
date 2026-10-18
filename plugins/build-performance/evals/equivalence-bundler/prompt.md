---
description: equivalence-bundler
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [toolchain-equivalence-pilot, positive]
---

Review a TypeScript bundler pilot in three packages. Twelve runtime checks pass and declaration files are byte-identical. Raw JavaScript shrinks 5%, but total gzip grows 19%; the existing delivery budget forbids any gzip growth. Exports require ESM, CJS and types; only ESM import was tested. SSR consumer smoke and published tarball contents are untested. Build medians on this host fall from 1.1s to 0.9s. Decide and name the smallest relevant next checks, without implementing a migration.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
