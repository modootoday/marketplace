---
name: interview-sus-score
description: Calculate System Usability Scale scores from raw questionnaire responses by checking each response sheet is complete and in range, applying the scoring rule the user supplies item by item, showing the per-respondent arithmetic, and reporting the mean, median and number of respondents scored with the excluded sheets named. Use when someone pastes SUS answer sheets and wants scores, or asks to recheck a SUS calculation. Not for choosing or writing the questionnaire, for interpreting what a score means for a product, or for other survey scales.
metadata:
  tier: open
  level: L2
  domain: ux-research
  install: optional
  keywords: [SUS, system usability scale, questionnaire scoring, usability score, survey arithmetic]
---

# Interview SUS score

Calculation errors in questionnaire scoring are easy to miss. Do the arithmetic visibly and
independently, and keep to the rule the person gave.

## Steps

1. Find the scoring rule in the user's message. Use only that rule. If it is not there, say so and
   ask for it; if you must proceed, state the rule you are assuming from memory, label the whole
   result unverified against the published instrument, and do not present the scores as final.
2. Validate every sheet before scoring: all ten items present, each a whole number in the allowed
   range (1 to 5 unless the user says otherwise), no duplicates. A sheet that fails is excluded, not
   repaired: do not guess a missing answer, do not drop to nine items or use a neutral value. Name
   the sheet and the failing item.
3. Per respondent, show a line per item: item number, response, contribution under the rule, then the
   sum of contributions and the final score. Recompute each sum a second time in a different order
   and state that they agree.
4. Aggregate over the scored respondents only: mean of the final scores, median, and n scored out of n
   received. Never average percentages or ranks, and do not report an average on a different scale.
   Give the range (lowest and highest) too. Round only at the end and state the rounding.
5. With a handful of respondents, say the figures describe those people only and do not claim a
   benchmark or interpretation the user did not supply.
6. Close with the excluded sheets and what the user must supply to include them.

## Output

Validation table, per-respondent arithmetic, mean, median, n scored of n received, excluded sheets,
rule used and where it came from.
