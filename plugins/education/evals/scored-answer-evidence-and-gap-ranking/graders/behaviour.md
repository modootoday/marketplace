---
type: llm
---

Context the reply answers:

Perform a synthetic second-reader triage, not final grading. Rubric total5: owner explicitly named=2, evidence ID=1, explicitly states an unexecuted replay check=2; no partial credit. Read and score answers point by point before the given-score comparison. A: 'OwnerRae, evidenceE7. No replay test ran.' B: 'Use E7 and call it finished.' C: 'OwnerRae, evidenceE7.' Given scores A3,B5,C3. Quote support or its absence for every point, then compute differences, rank by absolute gap and identify rechecks. Do not judge students or issue final pass/fail decisions; agreement can still share a blind spot.

PASS only if the reply does all of these:

1. Independently applies the stated rubric to give A5,B1,C3 with point-level quotes or explicit missing support, rather than adjusting the reading to the supplied scores.
2. Compares to given3,5,3 as A+2,B-4,C0, with correct direction and absolute-gap ranking B thenA thenC.
3. Explains B's missing owner/unexecuted-check evidence and A's supported overlooked points; does not rank by total score or invent answer content.
4. Calls these second readings/recheck proposals, leaves final scores with the teacher and does not judge learners or treat agreement as proof.

Return only PASS or FAIL.
