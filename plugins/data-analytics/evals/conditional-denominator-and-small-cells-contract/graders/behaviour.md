---
type: llm
---

Context the reply answers:

Recount a synthetic anonymous survey extract. Six row IDs; treatmentA: R1Yes,R2No,R3Yes; treatmentB:R4Yes,R5blank,R6'Maybe'. Published report saysA3/3Yes,B1/3Yes,total4/6Yes. Define Yes/No/missing/ambiguous buckets, recompute eligible versus all-row denominators separately and reconcile counts; identify report errors. B's eligible small cell must not be presented as a population certainty. Use aggregate output and numeric row IDs only, no invented individuals or action. No source file search was executed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. RecountsA2Yes/1No, B1Yes/1missing/1ambiguous, total3Yes/1No/1missing/1ambiguous=6.
2. ReportsA2/3Yes,B1/1eligible or1/3all-row clearly distinguished,total3/4eligible or3/6all-row; does not use undefined denominator interchangeably.
3. Flags originalA3/3 andtotal4/6aswrong and B1/3asall-rowonly, preservingMaybeambiguous rather than silentlyNo.
4. Keeps aggregation/numeric IDs, cautions small-cell inference and makes no claim of file-search/anonymization execution.

Return only PASS or FAIL.
