---
type: llm
---

Context the reply answers: a caterer wants a chef-approval purchasing worksheet for 72 portions from a card serving 6, with carrots 1.2 kg and butter 120 g. The card does not label whether carrot weight is before or after trimming. Carrot trim loss is 10% of purchased weight and price is 2100 KRW/kg; butter is bought in whole 250 g blocks at 3000 KRW each. The user explicitly requests checkable butter grams/kilograms/blocks conversions, separate usage/purchase costs, and missing preparation-weight labels identified before approval.

Correct independent butter calculation: scale 12, butter 1440 g = 1.44 kg = 5.76 blocks, buy 6 blocks = 1500 g for 18000 KRW, usage cost 17280 KRW. If the carrot card quantity is edible weight, scaled EP is 14.4 kg and AP is 16 kg, costing 33600 KRW; total whole-pack purchase 51600, 716.67 KRW/portion, usage 50880, 706.67/portion. If it is purchased weight, AP is 14.4 kg and EP is 12.96 kg, carrot cost 30240; total purchase 48240, 670/portion, usage 47520, 660/portion. Water, cooking shrinkage, other ingredients and margins were not supplied.

Portion-yield review in criterion 4 includes asking whether cooking changes the intended portion size or yield. Do not require the already supplied base and target counts to be repeated in an approval checkbox.

PASS only if the reply does all of these:

1. Identifies the missing before/after-trimming label for carrots and treats the carrot purchase amount and final total as conditional until confirmed. Asking for clarification is acceptable; an explicitly labelled provisional comparison is also acceptable. Silently choosing one interpretation or calling a conditional amount approved is not.
2. Computes the independent butter worksheet correctly, including scale 12, 1440 g = 1.44 kg, 5.76 blocks rounded to 6, and distinguishes 17280 KRW usage from 18000 KRW purchase cost.
3. Any carrot scenarios or final per-portion figures it supplies match the stated interpretation and the arithmetic in the context. It does not apply the 10% loss as multiplying edible weight by 1.10 or add unsupplied waste, ingredients or margin. Leaving carrot totals pending clarification is acceptable.
4. Gives an auditable table or working steps, states assumptions, and identifies the carrot weight label plus loss rate, prices, pack size and portion yield as chef confirmation items before approval. It does not claim that the chef approved the plan or that cooking yield was tested.
