---
type: llm
---

Context the reply answers:

Reconcile a synthetic region figure. Readable source rows: p1r1Alpha visits12, p1r2Beta visits7; p2rowX count unreadable. A separate paragraph mentions Alpha twice and Beta once, not visits. Map boundaries have keys A1,B1,C1 and names Alpha,Beta,Gamma. Supplied aliases Alpha→A1,Beta→B1; no mapping for rowX. Printed total25. Join by explicit keys, preserve raw labels/pages, compute known subtotal and unresolved balance, separate mentions from visits, report unmatched and no-data regions, and outline parse/join/draw plus style/print checks. No source image or file execution.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Joins Alpha12→A1 and Beta7→B1 from supplied aliases, preserving raw/page provenance and reports C1 no source data rather than0.
2. Computes known subtotal19 vs printed25, unresolved difference6 but does not assert unreadable rowX=6 or guess its region.
3. Keeps paragraph mentions2/1 separate from visit counts12/7 and lists unreadable/unmatched source evidence.
4. Provides planned parse/join/draw and styling/print validation without claiming source-image inspection or successful execution.

Return only PASS or FAIL.
