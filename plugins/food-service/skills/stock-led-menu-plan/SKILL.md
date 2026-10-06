---
name: stock-led-menu-plan
description: Plan a multi-day menu starting from the stock on hand and its use-by dates, compute what must still be bought as quantities (needed minus on hand), and check storage and feasibility, with the cook confirming dates, amounts and fit. Use when someone gives a stock list, a number of days and eaters and wants a menu that uses what they have and a minimal shopping list. Not for recipe adaptation, costing a recipe, nutrition planning, or judging whether old food is safe to eat.
metadata:
  tier: open
  level: L2
  domain: food-service
  install: optional
  keywords: [menu plan, stock, use-by date, shopping list, galley, meal plan]
---

# Stock-led menu plan

Plan from what is already in the kitchen. The order of the days follows the dates on the
stock, not the other way round, and the shopping list is a calculation, not a guess.

## Steps

Read `references/plan-checks.md` first for the date handling and the tables the answer must
contain.

1. Restate the inputs: days, eaters, meals per day, constraints. Copy the stock list as
   given with quantity and use-by date. Do not add stock the user did not list; pantry
   staples count only if listed. Sort by date, soonest first, and mark items that are
   already close or past.
2. Assign the soonest-dated items to the earliest days; frozen and shelf-stable items go
   late. A dish for each meal states the stock items and amounts it uses.
3. Keep a running balance table with one row per stocked item and one column per day,
   each cell showing what is left after that day's use (start column = on hand). No item
   goes below zero without the shortfall being recorded as a gap. A weekly total alone is
   not a balance.
4. Gaps: a table with one row for every stocked item the menu uses and every extra item
   it needs, with columns needed, on hand, shortfall (0 when stock covers it) in the buying
   unit, and the day first needed. A shortfall of 0 is a valid answer; buy nothing for items
   that stock covers, and list any optional extra separately as optional, with its amount.
   The menu itself uses only listed stock plus salt and oil when the user said those are all
   they have; an extra such as garlic or herbs appears only in the optional list.
5. Check storage (fridge space, freezer, cooling) and feasibility (cooking time, equipment,
   constraints such as diet or no pork), and list what you assumed (portion size per
   person, for example).
6. Do not rule on safety. For an item at or past its date, say the cook decides from the
   label and their own checks; plan it first or flag it, never write that it is fine.
7. Say that the cook or chef confirms use-by dates, amounts, storage and cooking fit.

## Output

The stock sorted by date, the day-by-day menu with amounts, the balance table, the gap
list, the storage and feasibility notes, the assumptions and the confirmation line.
