---
name: experiment-design-readout
description: Design an A/B test before it starts and read it honestly after - one primary metric, the minimum effect worth detecting, the sample size and duration that follow, a stopping rule fixed in advance, guardrail metrics, and a readout that reports the interval and refuses to call a winner from peeking or from a sub-group found afterwards. Use when planning an experiment, deciding how long a test must run, or interpreting test results. Not for tests that cannot be randomised.
metadata:
  tier: open
  level: L3
  domain: data-analysis
  install: optional
  keywords: [A/B test, experiment design, sample size, statistical significance, test readout]
  verified-runtimes: [claude-code]
---

# Experiment design and readout

Most wrong test conclusions are decided before the data arrives: a metric chosen
after looking, a test stopped when it first looked good, a segment that won by
chance.

## Before launch (write it down)

1. **Hypothesis**: the change, the user behaviour it should move, and why.
2. **Primary metric**: one, with its definition (see metric-definition). Up to
   three guardrails that must not get worse (revenue, errors, unsubscribes).
3. **Unit of randomisation**: user, account or session; the metric must be
   measured on the same unit or the variance is wrong.
4. **Minimum detectable effect**: the smallest change worth shipping. Compute the
   sample size from the baseline rate, that effect, 5% significance and 80%
   power, and show the arithmetic.
5. **Duration**: sample size divided by eligible traffic, rounded up to whole
   weeks so weekday patterns are balanced.
6. **Stopping rule**: run to the planned size; no early stop on significance
   unless a sequential method was chosen in advance.

## During

Check only health: assignment split near 50/50 (a sample ratio mismatch means the
test is broken, not that a variant won), logging works, guardrails are not
collapsing.

## Readout

- Effect with its confidence interval, not only a p-value; say whether the
  interval excludes zero and whether it includes effects too small to matter.
- Guardrails with their intervals.
- Segments only if they were planned; anything else is labelled exploratory.
- A decision: ship, do not ship, or rerun with a stated change, and why.
