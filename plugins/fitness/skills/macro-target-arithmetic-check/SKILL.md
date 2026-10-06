---
name: macro-target-arithmetic-check
description: Check calorie and macro targets and meal plans by arithmetic - state the named formula (for example Mifflin-St Jeor) with every input and the activity multiplier, compute the energy target in code, set protein from the user's own rule, rebuild each meal's and each day's calories from grams at 4, 4 and 9 kcal per gram, compare with the label or claimed figure and with the target, and flag any day more than 5 percent off. Use when someone asks for calorie or macro targets, or pastes a meal plan or food log with totals to be checked. Not for medical diets, eating disorders, pregnancy, children or clinical nutrition, which are referred to a clinician or dietitian.
metadata:
  tier: open
  level: L2
  domain: fitness
  install: optional
  keywords: [macros, calories, Mifflin-St Jeor, meal plan check, protein target, energy balance]
  verified-runtimes: [codex-cli]
---

# Macro target arithmetic check

Chat-written meal plans miss their own target and carry totals that the macros do not add up
to. Same inputs should give the same numbers, so every input is stated and every sum is shown.

## Steps

1. **Screen first.** If the request involves a medical diet, an eating disorder, pregnancy,
   a child, or a clinical condition, do not set targets; say this needs a clinician or
   registered dietitian, and check only the arithmetic the user already has.
2. **Name the formula and the inputs.** For example Mifflin-St Jeor: men `10 x kg + 6.25 x cm
   - 5 x age + 5`, women `... - 161`. Write sex, age, height, weight and the activity
   multiplier the user gave or that you assumed (say it is an assumption). The result is an
   estimate, not a measurement.
3. **Compute in code.** When a shell is available, compute with a short `node -e` expression;
   otherwise show each multiplication. Give the maintenance estimate, then the target after
   the user's stated deficit or surplus. Do not choose a deficit the user did not state.
4. **Protein and the rest.** Set protein only from the user's own rule (for example grams per
   kg); show the grams and the calories it takes. Do not invent a fat or carbohydrate rule.
5. **Rebuild calories from macros.** For every meal and every day: `4 x protein g + 4 x carbs
   g + 9 x fat g`. Compare with the calories the plan or label states and report each gap in
   kcal. A stated figure that differs from its own macros is an error in the plan, not a
   rounding choice.
6. **Reconcile with the target.** For each day give rebuilt kcal, target kcal, difference and
   percent difference. Call a plan's gap "over target" or "under target" and use the word
   deficit only for the one the user chose. Flag every day more than 5 percent off, and say which direction. Say in words
   "within 5 percent" for each day that passes, mark it not flagged, and propose no change to it.
7. **Report in a table** and offer to adjust meals, changing grams and re-summing instead of
   rounding. End by restating the inputs and saying in words that the same inputs give the
   same numbers every time, and that every figure is an estimate.

## Output

The formula and inputs, the target computation, the protein line, a table of meals and days
(stated kcal, rebuilt kcal, gap, versus target, percent), the flagged days, and the referral
line when step 1 applied. No medical advice.
