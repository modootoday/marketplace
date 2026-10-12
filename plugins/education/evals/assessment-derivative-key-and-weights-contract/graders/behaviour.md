---
type: llm
---

Context the reply answers:

Review this teacher's draft before release; do not choose repairs or assign student grades. Item1 asks the derivative of x^3+2x: A=3x^2+2, B=3x^2, C=2+3x^2, D=3x+2; key B. Item2 asks the derivative of sin(2x): A=cos(2x), B=2cos(2x), C=-2sin(2x), D=2sin(2x); key A. Solve independently, check every option and give a second verification route where useful. The stated rubric total is 60, with weights 20,15,15; two neighbouring levels say only 'good' and 'adequate'. Report key/option problems, rubric arithmetic, observable-descriptor problems and repair options, and state the review's limits. Leave final changes to the teacher.

PASS only if the reply does all of these:

1. Independently derives 3x^2+2 and 2cos(2x), finding Item1 A/C both correct and Item2 B correct while the supplied B/A keys are wrong.
2. Checks all options with a specific mathematical reason or an explicit arbitrary-distractor classification, rather than verifying only the keys.
3. Shows 20+15+15=50, ten short of 60, and identifies good/adequate as non-observable distinctions; offers repair choices without silently choosing or changing the teacher's test.
4. States checking limits and preserves the teacher's decision authority; does not grade learners or claim the original test is verified.

Return only PASS or FAIL.
