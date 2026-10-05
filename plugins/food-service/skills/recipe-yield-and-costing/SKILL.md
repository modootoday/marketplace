---
name: recipe-yield-and-costing
description: Scale a recipe from its base yield to a target number of portions and compute cost per portion, applying trim loss in the right direction, converting units explicitly and costing from the purchase unit price, with the chef or manager confirming loss rates and prices. Use when a kitchen or caterer needs a recipe for 50 or 120 portions, an ingredient purchase quantity, or a menu item cost. Not for copying or adapting a recipe (use recipe-source-fidelity-and-adaptation), menu planning, or nutrition values.
metadata:
  tier: open
  level: L2
  domain: food-service
  install: optional
  keywords: [recipe scaling, yield, trim loss, food cost, cost per portion, purchase quantity]
---

# Recipe yield and costing

Scaling is multiplication; the errors come from loss applied the wrong way, mixed units and
costing the cooked amount instead of what was bought. Show each step so the chef can check it.

## Steps

1. State the base yield, target portions and the scale factor (target / base). Say what each
   recipe quantity means: as purchased (AP) or edible portion after trimming (EP). If the
   recipe does not say, state the assumption and show how the answer changes under the other.
2. Scale each EP quantity by the factor. Then compute the purchase quantity with loss:
   `AP = EP / (1 - loss)`. A 12% loss on 15 kg EP needs 15 / 0.88 = 17.05 kg, not 15 x 1.12.
   Items with no loss have AP = EP.
3. Convert units explicitly in a column: g to kg, ml to l, and purchase packs (a 450 g block,
   a 10 kg bag). Write the conversion used for each item. Keep currency units as given.
4. Cost from the purchase unit price: cost = AP x price per purchase unit. Give the exact
   cost on usage and the cost if only whole packs can be bought (round the pack count up).
   Total, then cost per portion = total / target portions.
5. Table: item, EP, loss, AP, unit price, line cost. Under it the totals, the per-portion
   cost with its rounding, and every assumption.
6. Say the numbers are a calculation from the supplied figures: the chef or manager
   confirms loss rates, prices, pack sizes and whether cooking yield changes the portion
   size. Do not add ingredients, waste or margin the user did not give.

## Output

The scale factor, the table, the totals, the cost per portion (and per portion with whole
packs when different), the assumptions, and the confirmation line.
