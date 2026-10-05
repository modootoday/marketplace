---
type: llm
---

Context the reply answers: a teacher pasted three multiple-choice calculus items with a key and a rubric. Q1 d/dx of x^2 e^x, options A 2x e^x, B x^2 e^x, C e^x (x^2 + 2x), D 2x e^x + 2, key B (the correct answer is C, so the key is wrong). Q2 integral of 3x^2 from 0 to 2, options A 4, B 8, C 12, D 6, key B (correct, value 8). Q3 d/dx of ln(x^2) for x > 0, options A 2/x, B 2x / x^2, C 1/x, D 2x, key A (A and B are both correct, since 2x/x^2 simplifies to 2/x). The rubric weights are Setup 30, Calculation 30, Justification 25, Presentation 10 for a stated 100 points (they sum to 95).

PASS only if the reply does all of these:
1. Solves each of the three items with shown working and reaches its own answers (Q1 C via the product rule, Q2 8, Q3 2/x) before or separately from stating whether the key matches.
2. Reports that the Q1 key (B) is wrong and the correct option is C, naming the key says B and the independent solution says C.
3. Flags that Q3 has two correct options (A 2/x and B 2x/x^2 are equal for x > 0) and identifies both options by letter.
4. Gives a specific reason each distractor is wrong or how it arises (for example Q1 A drops the x^2 e^x term, B drops the 2x e^x term, D adds a stray constant; Q2 C 12 is 3x^2 evaluated at 2 without integrating, Q2 A 4 or D 6 from a named slip) for at least the items it verifies, rather than only giving the keyed option.
5. Adds the rubric weights and states the sum is 95, not 100, with the shortfall of 5 points.
