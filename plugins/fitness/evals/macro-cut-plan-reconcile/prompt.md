---
description: A 32-year-old's stated inputs, a 500 kcal deficit and a two-day meal plan from another chat. The reply must compute the target from a named formula, rebuild calories from macros and flag the day that is far off target.
max_turns: 8
allowed_tools: [Read, Glob, Grep, Bash, Skill]
tags: [macro-target-arithmetic-check]
---

Man, 32, 178 cm, 80 kg, activity multiplier 1.55. I want a 500 kcal daily deficit and my own protein rule is 2 g per kg. Another chat wrote me this plan; check the numbers against my target.

Day 1 (P protein g, C carbs g, F fat g):
- Breakfast 40P 60C 15F, "535 kcal"
- Lunch 50P 80C 20F, "700 kcal"
- Dinner 45P 70C 25F, "640 kcal"
- Snack 25P 40C 10F, "350 kcal"
- Stated day total: 2,225 kcal

Day 2: stated total 2,300 kcal, with 150P 330C 85F.

Is the plan on target? Fix whatever is off.
