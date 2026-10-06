---
name: perf-experiment-loop
description: Run or judge a profile, change and benchmark loop - name the bottleneck from a profile with numbers, change one thing per experiment against a stored baseline in the same environment, require the tests to pass and several repeats, report variance and regressions elsewhere, and reject a gain that sits inside the noise. Use when someone claims a speedup from one run, asks to optimize slow code, or wants a benchmark result checked before it is accepted. Not for load testing a service, capacity planning or choosing a profiler product.
metadata:
  tier: open
  level: L2
  domain: software-qa
  install: optional
  keywords: [performance, benchmark, profiling, variance, baseline, regression, optimization]
  verified-runtimes: [claude-code]
---

# Performance experiment loop

A performance engineer reports automating the profile, plan, implement, benchmark cycle by hand. The failure to prevent is accepting a change on one fast run.

## Steps

1. Profile first. Name the bottleneck with its numbers (share of time, call count) before any change. No profile given: say so and ask for one; do not guess.
2. Fix the baseline: several runs of the unchanged code in the same environment (machine, data, flags, warm or cold state). Report the runs, their mean and their spread (min to max or standard deviation).
   Bound the gain: the share of the profile a change touches caps what it can save (code taking 4 percent of the time cannot give 10 percent). A claimed gain above that cap points to noise or another cause.
3. One change per experiment. If a patch changes two things, split it or say which gain belongs to which.
4. Measure the changed code with the same command and at least as many runs as the baseline. Compare the change with the spread: a difference smaller than the baseline spread is noise and is rejected as a gain, not rounded up to a percentage.
5. Correctness gate: the tests must run and pass on the changed code before any number is accepted. A speedup with tests not run is unverified.
6. Check other paths: name the code paths and inputs the change touches besides the hot one (small inputs, memory, other callers) and measure or list them for regression.
7. Verdict per experiment: accepted, rejected as noise, or not yet evidenced, with the missing step. Keep a short log of experiment, change, runs, mean, spread, tests, verdict.

## Output

The experiment log table, the verdict for each claim, and the exact next measurement to run. Do not state a percent speedup that the runs do not support.
