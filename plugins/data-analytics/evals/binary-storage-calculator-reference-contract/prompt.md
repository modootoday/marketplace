---
description: Additional positive calculator-reference-case-verification coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [calculator-reference-case-verification, coverage-20261012]
---

Verify a supplied synthetic storage calculator specification, not a deployed app. MiB=bytes/1048576; domain is nonnegative integer bytes; output displays three decimals with ordinary nearest rounding. Faulty candidate divides by1000000. Build at least five independent reference cases including0,1048576,2097152,1, negative, fractional and duplicate inputs. Show exact/reference displayed outputs, valid/invalid distinction, a round-trip check on unrounded values, rounding precision limitations and defects. No tool execution occurred.
