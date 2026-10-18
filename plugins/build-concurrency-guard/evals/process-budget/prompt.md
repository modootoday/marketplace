---
description: Process memory and parent fan-out constrain otherwise capped builds.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [concurrency-policy]
---

Three agents each start one build with task concurrency 1. Host free memory is
24 GiB, but their shared process/container budget has 5 GiB available. Each build
peaks near 3 GiB and also has an internal graph worker pool. Another machine has
no trustworthy process-limit observation. What policy should the parent use,
and what should we measure? Do not rewrite commands. Reading installed skill
instructions is permitted.
