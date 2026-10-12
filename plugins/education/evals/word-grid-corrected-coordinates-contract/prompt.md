---
description: Additional positive rule-checked-puzzle-and-score-generation coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [rule-checked-puzzle-and-score-generation, coverage-20261012]
---

Produce a print-ready word-search data handoff from this draft, not an image. Keep a5x5 uppercase grid: CATXX,DOGXX,BEEXX,XXXXX,XXXXX. Targets CAT,DOG,BEE may use E or S only. Draft0-based keys are CAT(row0,col0,E), DOG(row1,col0,S), BEE(row2,col1,E). Check each by traversing letters, identify wrong keys, correct them without changing the grid, give JSON grid/words and start/direction/end answer keys, then a plain-text print grid derived from those same data. No checker/file-write/render permission exists here: show hand checks and say the bundled checker and PDF rendering were not run.
