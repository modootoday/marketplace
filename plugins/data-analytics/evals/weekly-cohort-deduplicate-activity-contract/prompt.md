---
description: Additional positive cohort-retention coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cohort-retention, coverage-20261012]
---

Compute synthetic weekly retention as of endW2 UTC. Cohort=first signup week; active=at least one open event in that UTC week; signup itself is not an open. Users u1,u2 sign upW0,u3W1. Opens: u1W0 twice,u2W0 once,u1W1 twice,u3W1 once,u2W2 once. All three are eligible, no bots, all weeks throughW2 complete. Deduplicate user/week, give cohort sizes and activity counts/rates by relative week including zero cells, and define denominators/time convention. Do not infer a release effect.
