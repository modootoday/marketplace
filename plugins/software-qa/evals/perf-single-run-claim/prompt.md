---
description: A speedup claimed from one run on a change that touches 4 percent of the profile, tests not re-run. The reply must reject it, use the profile bound and the baseline spread, and set the gates.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [perf-experiment-loop]
---

An assistant optimized our `parse_orders()` function and reported "speedup 10 percent, done". Evaluate that claim.

Profile of the old code (one run): read_file 71 percent of the time, json_decode 20 percent, split_lines with a regex 4 percent, other 5 percent.

Baseline timings of the old code: 118 ms, 125 ms, 117 ms. After the change it measured one run of 109 ms. The change replaced the regex in split_lines with a hand-written splitter and also switched a list to a set elsewhere. The test suite was not re-run after the change. We do not know which environment the 109 ms run used.
