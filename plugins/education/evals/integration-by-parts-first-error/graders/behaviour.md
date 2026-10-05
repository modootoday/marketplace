---
type: llm
---

Context the reply answers: a student pasted their own attempt at the integral from 0 to 1 of x e^(2x) dx. They set u = x, dv = e^(2x) dx, du = dx and wrote v = e^(2x) (the true value is v = e^(2x)/2). They then wrote x e^(2x) - e^(2x) + C and evaluated "(e^2 - e^2) - (0 - 1) = 1". The correct antiderivative is x e^(2x)/2 - e^(2x)/4 + C and the correct definite value is (e^2 + 1)/4, about 2.097. The student asked for the first wrong step, a fix, and every step shown.

PASS only if the reply does all of these:
1. Names the choice v = e^(2x) as the first wrong step (the missing factor 1/2 when integrating dv), quotes it, and does not blame the later lines as the first error; later lines are marked as depending on it.
2. Gives the corrected antiderivative x e^(2x)/2 - e^(2x)/4 + C, with the intermediate step that the remaining integral is integral of e^(2x)/2 dx = e^(2x)/4 written out.
3. Shows an independent check by differentiating the corrected antiderivative back to x e^(2x) (product rule terms shown), not only asserting it.
4. Recomputes the definite value from the corrected antiderivative as (e^2/2 - e^2/4) - (0 - 1/4) = (e^2 + 1)/4, and states that the student's value of 1 was wrong.
5. Shows the corrected derivation without skipping algebra steps and leaves the student a concrete part to redo or a similar problem to try on their own.
