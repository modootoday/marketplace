---
description: Additional positive list-normalize-and-diff coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [list-normalize-and-diff, coverage-20261012]
---

Normalize two synthetic key lists with these authorized rules only: trim edge spaces and map fullwidth ASCII digits to ASCII, preserving leading zeros/case/internal separators. Old rows: ' 001 ','002','002','０03'. New rows:'001','003','3','004'. Keep original and normalized columns, show duplicates and unique counts, list old-only and new-only values in both directions, and reconcile counts. Do not turn003 into3 or merge identifiers by numeric conversion.
