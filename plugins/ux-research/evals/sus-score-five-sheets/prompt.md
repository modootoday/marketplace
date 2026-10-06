---
description: A researcher pastes the scoring rule and five SUS answer sheets, one with a missing item and one with an out-of-range value. The reply must exclude the two bad sheets, show per-respondent arithmetic for the other three and report mean, median and n.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [interview-sus-score]
---

Score these System Usability Scale sheets for me. Scoring rule from our methods doc: every item is answered 1 to 5. For odd items (1, 3, 5, 7, 9) the contribution is the response minus 1. For even items (2, 4, 6, 8, 10) the contribution is 5 minus the response. Add the ten contributions and multiply by 2.5 to get a score from 0 to 100.

Answers by item 1 to 10:
R1: 4, 2, 5, 1, 4, 2, 5, 1, 4, 2
R2: 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
R3: 5, 1, 4, 2, 5, 2, 4, 2, 5, 1
R4: 2, 4, 2, 4, 3, (blank), 2, 4, 2, 4
R5: 4, 2, 4, 2, 4, 2, 4, 2, 4, 7

Give me per-respondent scores and the average for the study.
