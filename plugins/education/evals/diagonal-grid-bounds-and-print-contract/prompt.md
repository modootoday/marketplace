---
description: Additional positive rule-checked-puzzle-and-score-generation coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [rule-checked-puzzle-and-score-generation, coverage-20261012]
---

Verify and repair a4x4 word-search handoff as text/data. Grid rows are MOON,XSXX,XXUX,XXXN. Allowed directions E and SE. Targets MOON and SUN. Draft0-based keys: MOON(row0,col0,N), SUN(row1,col1,SE). Show traversal and bounds, correct any invalid key, provide the same-grid JSON/answer key and printable plain text. Do not run a checker or claim a rendered PDF; execution is unavailable, so report manual checks. Preserve the target words and allowed directions rather than silently adding new words or using image generation.
