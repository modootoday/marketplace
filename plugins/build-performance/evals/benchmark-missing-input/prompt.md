---
description: benchmark-missing-input
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [build-benchmark-controls, boundary]
---

We want to compare two build runners but have no timings, logs, task graph or definition of cold. Please give only the minimum information needed to design a fair build benchmark. Do not run commands or choose a winner.

Reading installed skill instructions is permitted; do not execute project builds/tests or change files.
