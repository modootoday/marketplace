---
description: Corrected positive cohort-retention coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cohort-retention, coverage-20261012, corrected-fixture]
---

Prepare retention from synthetic weekly aggregates at midW3 UTC. First-signup cohortW0 size10 has complete relative-week0/1/2 counts8/5/4; cohortW2 size4 has complete relative-week0 count3 and a partial relative-week1 observed count1. Active means distinct users with a completed session, excluding known bots already removed. Compare equivalent completed offsets, report rates/counts and mark partial/unobserved cells. A release beganW2; can the newer cohort's observed1/4 be compared with older completed week1=5/10 to prove deterioration? Do not fabricate final counts.
