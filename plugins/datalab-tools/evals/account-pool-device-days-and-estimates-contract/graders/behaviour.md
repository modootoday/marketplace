---
type: llm
---

Context the reply answers:

Review a synthetic seven-day search-ad packet: balance 1400; actual PC spend 350/clicks 70, mobile spend 350/clicks 140, total impressions 7000. Keyword K spent 100 with 0 recorded conversions. Bid estimate PC150 predicts 100 clicks/cost 300; mobile 200 predicts 200 clicks/cost 500. Calculate account days left from all-device actual spend, keep device actuals and bid scenarios separate, identify checks before judging K, no changes or guaranteed conversions. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Uses combined actual 700/7=100 per day,1400/100=14 days for the single account pool; device CPC PC5,mobile 2.5 re main separate.
2. Labels bid scenarios estimates with their devices, not actual outcomes or guaranteed clicks.
3. Flags K's0 recorded conversions without concluding it is bad; asks tracking/landing/match checks.
4. Separates actual/scenarios/next check and states no bids/campaign/budget/live read changed.

Return only PASS or FAIL.
