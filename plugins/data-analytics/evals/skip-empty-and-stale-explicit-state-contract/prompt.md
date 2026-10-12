---
description: Corrected positive macro-logic-recovery-refactor coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [macro-logic-recovery-refactor, coverage-20261012, corrected-fixture]
---

Analyze synthetic macros before proposing a refactor. M1 processes each row: if blank skip; else result=2*x and store it in that row; global count increments for every processed row. M2: if blank store0 in that row; else result=2*x; global count increments for all rows including blank. Inputs[3,blank,0], initialcount5; previous cells[99,88,77]. Reconstruct exact outputs/count for both, identify how skipped stale cells differ from explicit0 and validzero, and propose a shared pure routine plus policy-driven callers without erasing differences. No execution or destructive edits.
