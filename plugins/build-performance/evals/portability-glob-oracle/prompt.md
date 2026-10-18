---
description: portability-glob-oracle
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [optimization-portability-review, positive]
---

Use only this supplied package-manager oracle: ordered patterns [modules/**, !modules/fixtures/**, modules/fixtures/keep] select modules/a, modules/nested/b and modules/fixtures/keep, excluding modules/fixtures/drop. The fast scanner uses modules/* and global exclusions, losing nested/b and keep. Tracked-only policy must exclude untracked manifests. The scanner reports no errors. Review the contract and minimal fixture matrix, including local versus CI task scope. No external lookup or execution.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
