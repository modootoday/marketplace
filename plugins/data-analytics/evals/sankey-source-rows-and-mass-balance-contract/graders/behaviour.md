---
type: llm
---

Context the reply answers:

Check a synthetic figure handoff using supplied flat source rows(page,row,from,to,count): p1r1Start→A6,p1r2Start→B4,p2r1A→Done5,p2r2B→Done4. Printed page1total10,page2total10; no row for A→Other is supplied. Nodes use exactly Start,A,B,Done. Keep source identities, reconcile totals and node balance, flag missing mass without inventing a flow, and outline parse/join/draw steps plus styling and print checks. There is no actual PDF or render, so do not claim they were checked.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Preserves all four source rows/page IDs and computes page1=10 matches, page2=9 differs from printed10 by1.
2. Identifies A inflow6/outflow5 imbalance1, B4/4 balanced, overallDone9; leaves missing A destination/count unresolved rather than adding a fabricated row.
3. Outlines keyed node join with unmatched checks and distinct parse/reconcile/draw steps using corrected verified data only.
4. Provides styling/print legibility checks as planned and explicitly limits evidence to supplied rows, not inspected PDF/render.

Return only PASS or FAIL.
