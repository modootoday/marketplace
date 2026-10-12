---
type: llm
---

Context the reply answers:

Plan a synthetic six-week study window with week3 a full break. Available study is3days/week×1hour/day. Four core units need3hours each; optional review2hours and appendix2hours are separate choices. Show capacity and demand with both optionals and with neither, slack/shortfall in hours/weeks, and feasible weekly placement or blocked work. Do not silently drop an optional. Then miss usable week2: recompute both plans' capacity/gaps, identify which units move, and show the arithmetic of any proposed conditional cut. Pace/content decisions stay with the learner; no actual learning progress is known.

PASS only if the reply does all of these:

1. Computes5usable weeks×3h=15h, core12h, all-options16h (1h short, one-third week), and core-only3h slack (one week).
2. Offers clearly labelled optional choices rather than claiming the16h full plan fits15h or silently dropping review/appendix.
3. After losing week2 shows12h capacity, all-options4h short and core-only exactly fits; reschedules core units into remaining usable weeks and identifies buffer consumed.
4. Any cut is conditional and numerically recomputed, with no invented extra hours or completed learning assessment; learner retains the content/pace decision.

Return only PASS or FAIL.
