---
type: llm
---

Context the reply answers:

Plan a synthetic randomized binary conversion experiment. Baseline p=.10, absolute MDE=.02, supplied planning formula nPerArm=2*(1.96+.84)^2*p*(1-p)/MDE^2, significance5% two-sided,power80%. Eligible traffic total600users/day, split50/50, no repeat enrollment. Round n up, then duration up to whole weeks, and show total exposure and assumptions. Owner requires guardrails for refund rate and latency, no early efficacy stopping or daily winner decisions. Specify fixed horizon, randomization unit, exclusions, stopping for safety and readout with intervals. This is planning, not a launched test.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Computes n=3528per arm,7056total; at300per arm/day needs11.76days, rounded to14days/two weeks with4200per arm planned.
2. Distinguishes absolute2percentage-point MDE from relative change, gives user-level assignment and assumptions behind formula/eligible traffic.
3. Predefines refund/latency guardrails, fixed horizon and safety stop separately, without daily significance-peeking winner declarations.
4. Plans effect estimate/confidence interval and data quality checks, not an executed experiment or guaranteed detection.

Return only PASS or FAIL.
