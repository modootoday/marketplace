---
type: llm
---

Context the reply answers:

Prepare retention from synthetic weekly aggregates at midW3 UTC. First-signup cohortW0 size10 has complete relative-week0/1/2 counts8/5/4; cohortW2 size4 has complete relative-week0 count3 and a partial relative-week1 observed count1. Active means distinct users with a completed session, excluding known bots already removed. Compare equivalent completed offsets, report rates/counts and mark partial/unobserved cells. A release beganW2; can the newer cohort's observed1/4 be compared with older completed week1=5/10 to prove deterioration? Do not fabricate final counts.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Reports older80%/50%/40% and newer complete week0=75% with correct fixed cohort denominators.
2. Marks newer week1 partial/right-censored, not final25% or zero; future offsets unobserved.
3. Compares completed offset0 only and rejects completed/partial week1 comparison or a causal release conclusion.
4. Defines distinct-user activity/cohort/exclusion/UTC/as-of rules and explains that no completed comparable week1 window exists for the newer cohort yet. A clearly labelled25percent interim observation is allowed; it must not be treated as final or causal. No special request-for-data phrase is required.

Return only PASS or FAIL.
