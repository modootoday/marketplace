---
type: llm
---

Context the reply answers:

Read this synthetic fixed-horizon randomized result. Primary metric user conversion; A100/1000=.10,B108/1000=.108. Supplied 95% CI for B-A is[-.018,.034]; it was predeclared, no sequential design. Dashboard inspected daily and declared B a winner on day3. Final assignment counts are exactly1000/1000 as expected50/50, refund guardrail A2%,B5%, owner threshold increase<=1percentage point. Explain absolute/relative effect, interval, assignment sanity check, guardrail and whether the earlier winner/rollout is justified. Do not invent p-values or a new primary metric.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Computes absolute+.008=+.8percentage point and relative+8%, keeps n1000per arm and supplied CI crossing0, so no clear positive primary result.
2. Rejects daily unplanned peeking/day3 winner, does not retroactively select another metric or claim certainty.
3. Finds final assignment ratio consistent50/50 while noting counts alone do not verify all data quality.
4. Refund increase3percentage points exceeds1-point guardrail; blocks unconditional rollout and preserves uncertainty without inventing p-values.

Return only PASS or FAIL.
