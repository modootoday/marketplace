---
type: llm
---

Context the reply answers:

Normalize two synthetic key lists with these authorized rules only: trim edge spaces and map fullwidth ASCII digits to ASCII, preserving leading zeros/case/internal separators. Old rows: ' 001 ','002','002','０03'. New rows:'001','003','3','004'. Keep original and normalized columns, show duplicates and unique counts, list old-only and new-only values in both directions, and reconcile counts. Do not turn003 into3 or merge identifiers by numeric conversion.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Normalizes old to001,002,002,003 and new to001,003,3,004 with original values preserved; leading zeros remain.
2. Reports old4rows/3unique with002duplicated, new4rows/4unique, common001/003.
3. Lists old-only002, new-only3/004 and reconciles unique3=2+1 and4=2+2.
4. Uses only approved trim/fullwidth rules, no numeric identifier merge or silent original overwrite.

Return only PASS or FAIL.
