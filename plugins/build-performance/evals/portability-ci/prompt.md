---
description: portability-ci
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [optimization-portability-review, positive]
---

Review an optimization before copying it to another JavaScript monorepo. Old presets run build and test in CI. New global defaults set runInCI:false; local runs pass. Pool sizing reads 24 GiB free on the host, while the process cgroup has 3 GiB available. Several concurrent parent jobs can each invoke this helper and start a separate pool within that shared budget. CPU quota observations were not supplied. Discovery hardcodes apps/* and ignores exclusions; the target declares modules/** then !modules/fixtures/**. Unsupported selector syntax returns an empty success. Give findings, minimal repairs and independent validation. Do not execute anything.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
