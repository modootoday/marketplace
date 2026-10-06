---
description: A user on LibreOffice Calc 7.3 with a semicolon locale wants a sum of highlighted amounts and the latest nonblank date. The reply must rebuild from the rule, use the right separators and avoid missing functions.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [spreadsheet-formula-environment-check]
---

I use LibreOffice Calc 7.3 with a Korean locale, where the argument separator is a semicolon. Column B has amounts, some cells blank. Rows with B above 1000000 are highlighted red by a conditional formatting rule. Column C has dates, some blank.

Give me a formula that sums the highlighted amounts, and a formula for the latest date in column C that skips blanks. It must work in Calc 7.3 without functions that version lacks.
