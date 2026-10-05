---
description: Two VBA macros differ in rounding and one reads a global rate. The reply must tabulate both, keep the differences, and plan a before/after comparison.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [macro-logic-recovery-refactor]
---

I inherited two Excel VBA macros and want one shared function. Nothing can be run here, so work from the description.

Macro A: reads Sheet1!B2:B50 (amounts) and column C (status). It skips any row where C = "cancel". For the other rows it writes tax = B * 0.1 rounded down (always down to the whole unit) into column D of Sheet1.

Macro B: reads the same range and also skips rows where C = "cancel". It writes tax = B * Rate, where Rate is a global variable (Public Rate As Double) set by another macro, rounded half up (2.5 becomes 3), into column E of Sheet2. It also sets Rate = 0 at the end so the next run needs it set again.

Extract a shared function and tell me what must be preserved, and how I check nothing changed.
