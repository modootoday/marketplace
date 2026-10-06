---
type: llm
---

Context the reply answers: the user's target is about 2,224 kcal a day (4 kcal per gram of protein and carbohydrate, 9 per gram of fat). Day 1 meals: breakfast 40P 60C 15F stated 535 (correct 535); lunch 50P 80C 20F stated 700 (correct 700); dinner 45P 70C 25F stated 640 (correct 685, so the stated figure is 45 kcal low); snack 25P 40C 10F stated 350 (correct 350). Day 1 totals 160P 250C 70F, which rebuilds to 2,270 kcal against the stated 2,225, and is +46 kcal or about +2.1 percent against the target. Day 2 is 150P 330C 85F, which rebuilds to 600 + 1,320 + 765 = 2,685 kcal against the stated 2,300 (385 kcal off) and is +461 kcal or about +20.7 percent over the target.

PASS only if the reply does all of these:
1. Rebuilds calories from grams for each meal and day and finds that the dinner label (640) is wrong and should be 685, and that Day 1 rebuilds to 2,270 rather than the stated 2,225.
2. Rebuilds Day 2 to about 2,685 kcal, says the stated 2,300 is wrong by about 385 kcal, and flags Day 2 as about 20 percent over the 2,224 target.
3. Says Day 1 is within 5 percent of the target (about +2 percent) and does not flag it as off, and shows the flag threshold it used (5 percent).
4. Offers a corrected Day 2 or says which grams to change, by re-summing the macros instead of rounding the total.
