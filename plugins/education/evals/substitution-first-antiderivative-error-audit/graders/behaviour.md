---
type: llm
---

Context the reply answers:

Check this supplied attempt at integral 2x*exp(x^2)dx. L1: u=x^2, du=2x dx. L2: rewrite as integral exp(u)du. L3: 'The antiderivative is u*exp(u)+C.' L4: substitute to get x^2*exp(x^2)+C. Identify the first incorrect step with its rule/condition, correct only the dependent remainder and differentiate the corrected final expression back to the original integrand, showing the chain factor. Explain whether L4 is an independent new error or an inherited one. This is feedback on a pasted attempt, not an answer to an unattempted exam or a final grade.

PASS only if the reply does all of these:

1. Recognises L1/L2 as valid substitution and identifies/quotes L3 as the first incorrect antiderivative rather than blaming the substitution or only the final line.
2. Corrects L3 to exp(u)+C and L4 to exp(x^2)+C, redoing the dependent remainder with the integration constant.
3. Differentiates the corrected expression to2x*exp(x^2), explicitly showing the chain factor as an independent check.
4. Calls L4 inherited fromL3 rather than a separate independent error and keeps the response as attempt feedback without student judgement/final grading.

Return only PASS or FAIL.
