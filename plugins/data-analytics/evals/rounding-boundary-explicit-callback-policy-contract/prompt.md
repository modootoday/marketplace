---
description: Corrected positive macro-logic-recovery-refactor coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [macro-logic-recovery-refactor, coverage-20261012, corrected-fixture]
---

Recover and refactor these synthetic spreadsheet routines as pseudocode; no workbook execution. R1 loops inputs in order, skips blank or x<10, computes y=floor(x/10+0.5), writes y and adds y to global total. R2 skips blank or x<=10, computes y=floor(x/10), writes y and replaces global last with y. Initial total0,lastnone. Inputs blank,9,10,15,20. Give a routine/input/global/side-effect ledger, hand-check outputs/states, factor shared logic with explicit threshold/rounding/state policy parameters, and show caller differences that preserve behaviour. Do not silently standardize thresholds or rounding.
