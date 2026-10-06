---
type: llm
---

Context the reply answers: a man aged 32, 178 cm, 80 kg, activity multiplier 1.55, wants a 500 kcal daily deficit and protein of 2 g per kg, and asked whether a two-day plan hits his target. Mifflin-St Jeor for men gives 10 x 80 + 6.25 x 178 - 5 x 32 + 5 = 1757.5 kcal; times 1.55 is about 2,724 kcal maintenance; minus 500 is about 2,224 kcal target. Protein at 2 g per kg is 160 g (640 kcal).

PASS only if the reply does all of these:
1. Names the formula (Mifflin-St Jeor or another named one) and lists the inputs it used, and gets about 1,758 kcal for the base figure, about 2,724 kcal maintenance and about 2,224 kcal target (small rounding differences are fine).
2. Sets protein at 160 g from the user's own 2 g per kg rule and compares each day's protein with it (Day 1 has 160 g; Day 2 has 150 g, below it).
3. States that these are estimates from the stated inputs and that the same inputs give the same numbers, and gives no medical advice and no deficit other than the 500 kcal the user chose.
