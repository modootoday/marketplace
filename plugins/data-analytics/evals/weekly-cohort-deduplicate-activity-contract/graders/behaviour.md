---
type: llm
---

Context the reply answers:

Compute synthetic weekly retention as of endW2 UTC. Cohort=first signup week; active=at least one open event in that UTC week; signup itself is not an open. Users u1,u2 sign upW0,u3W1. Opens: u1W0 twice,u2W0 once,u1W1 twice,u3W1 once,u2W2 once. All three are eligible, no bots, all weeks throughW2 complete. Deduplicate user/week, give cohort sizes and activity counts/rates by relative week including zero cells, and define denominators/time convention. Do not infer a release effect.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Uses W0 cohort size2,W1 size1 and deduplicates repeated opens per user/week.
2. W0 cohort active relative weeks0/1/2 counts2/1/1 and retention100%/50%/50%; W1 cohort relative0/1 counts1/0 and100%/0%.
3. Keeps cohort signup membership fixed, active event definition explicit and cells beyond complete observation unavailable rather than inventing zeros.
4. States UTC/completeness and absence of causal release evidence; no duplicate-event numerator inflation.

Return only PASS or FAIL.
