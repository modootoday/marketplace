---
description: benchmark-output-preserved
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [build-benchmark-controls, positive]
---

Review this build benchmark for adoption. Both runners use the same checkout and task graph. Baseline forced execution takes 89,91 seconds; candidate forced execution 70,71. Both retain dist and compiler incremental state but disable runner cache reads. Fresh checkout plus dependency installation is not measured. Warm baseline 7,8; candidate 4,5. A root dependency edit changes a version already resolved transitively; both runners report all cache hits. Candidate ran second every time while the host became idle. One candidate forced run failed at 12 seconds and was discarded. Tests and artifact comparison are not yet run. Give a decision and the smallest next experiment; do not run anything.
