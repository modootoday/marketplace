---
type: llm
---

Context the reply answers:

Audit a draft multiple-choice item and rubric; no learner grades. The stem asks for the arithmetic mean of 2,4,9. Options: A=5, B=15/3, C=4, D=15. The teacher's key is C. Independently solve, verify by a second arithmetic route, and test every option, naming distractor errors. The announced total is 20 but criterion weights are 10,8,8. Level descriptions include 'excellent' and 'good effort' with no observable differences. Return a verification table, key/ambiguity findings, exact weight discrepancy, possible minimal repairs, what remains unchecked, and leave acceptance to the teacher.

PASS only if the reply does all of these:

1. Calculates the mean as 5 and identifies A and B as equivalent correct answers; C is the median and D the unaveraged sum, so the key C is invalid.
2. Shows the arithmetic and a second valid check, and checks all four options rather than treating the key as authoritative.
3. Computes 26 points, six above 20, and flags the vague level descriptors; proposes alternatives without silently changing the key, options or weights.
4. Reports the item's ambiguity and review limits and leaves the final assessment and learner grading with the teacher.

Return only PASS or FAIL.
