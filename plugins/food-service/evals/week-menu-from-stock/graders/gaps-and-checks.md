---
type: llm
---

Context the reply answers: a user asked for 7 dinners for 2 adults from a listed stock (chicken thighs 1.2 kg, spinach 300 g, cream 500 ml, cheddar 200 g, eggs 10, frozen white fish 600 g, rice 2 kg, pasta 1 kg, canned tomatoes 3 x 400 g, onions 6) with salt and oil only otherwise, and for what to buy. The user has one small fridge and a small freezer. Items past or at their use-by date were not in the list; chicken and spinach are use by 7 Oct, cream 8 Oct.

PASS only if the reply does all of these:
1. Gives a shopping gap list in which each item shows the quantity needed, the quantity on hand and the shortfall to buy, and does not tell the user to buy an item the stock already covers.
2. Keeps or shows a per-item balance (used per day, left) so the gap can be checked, and states its assumptions such as the portion size per adult.
3. Checks storage and feasibility (fridge space for the chicken, spinach and cream days, the freezer for the fish, cooking time) and states them as checks.
4. Says the cook confirms use-by dates, amounts and cooking fit, and does not declare any food safe to eat; any item near its date is placed early or flagged for the cook's own check.
