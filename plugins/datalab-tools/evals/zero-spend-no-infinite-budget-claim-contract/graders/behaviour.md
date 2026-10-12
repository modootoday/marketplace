---
type: llm
---

Context the reply answers:

Analyze a synthetic ad balance 500 over seven supplied days with actual PC spend 0,mobile spend 0,no clicks; estimate mobile bid 100 suggests 50 clicks/cost 150. No keyword demand/competition supplied. Report device facts, whether days-left division is defined, distinguish estimate, and give a bounded next-check plan without inventing demand or changing bids. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Shows zero actual daily spend and leaves finite days-left unknown/undefined, not a guaranteed infinite run way.
2. Preserves both device 0 actuals and marks mobile scenario estimated with no derived PC scenario.
3. Does not invent demand, conversion data or keyword verdicts; proposes missing connection/activity checks.
4. Explicit read-only/action limits and supplied-period provenance.

Return only PASS or FAIL.
