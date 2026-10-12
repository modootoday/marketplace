---
description: Additional positive spreadsheet-formula-environment-check coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [spreadsheet-formula-environment-check, coverage-20261012]
---

Design an unexecuted spreadsheet check. Engine/version/locale/function support are all unknown. User wants to count manually green cells and classify dates in columnB. Supplied rows: r1manually green,date text'01/02/2030';r2no fill,actual serial/dateD2;r3manually green,blank. No date-interpretation locale or colour-reading API is supplied. Explain why ordinary formulas should use explicit helper labels for manual fill, propose original-preserving helper columns and tests, and leave ambiguous text dates unresolved rather than guessing Jan2/Feb1. Ask for environment facts before an executable formula.
