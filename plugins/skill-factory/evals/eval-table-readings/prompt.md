---
description: A result table with a not-fired case and a baseline-passing case. The reading must be description first and regression check.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [eval-iteration]
---

Here is the eval result for our `meeting-minutes` skill, two runs per arm:

| case | without | with | fired |
| --- | --- | --- | --- |
| action-items | 0.00 | 0.00 | 0/2 |
| decision-log | 1.00 | 1.00 | 2/2 |

What should I change next, and is the skill proving useful?
