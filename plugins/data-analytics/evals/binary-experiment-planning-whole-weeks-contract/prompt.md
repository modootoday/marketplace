---
description: Additional positive experiment-design-readout coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [experiment-design-readout, coverage-20261012]
---

Plan a synthetic randomized binary conversion experiment. Baseline p=.10, absolute MDE=.02, supplied planning formula nPerArm=2*(1.96+.84)^2*p*(1-p)/MDE^2, significance5% two-sided,power80%. Eligible traffic total600users/day, split50/50, no repeat enrollment. Round n up, then duration up to whole weeks, and show total exposure and assumptions. Owner requires guardrails for refund rate and latency, no early efficacy stopping or daily winner decisions. Specify fixed horizon, randomization unit, exclusions, stopping for safety and readout with intervals. This is planning, not a launched test.
