---
type: llm
---

Context the reply answers:

Analyze supplied synthetic seven-day commerce_sales 600, order claim O9 deadline 2030-02-03,product inspection I9 deadline 2030-02-01. Settlement call timed out;no amount/fees/holds returned. User asks why settlement is zero and to fix product. Correct the missing-data assumption, separate known sales/unknown cash flow an done combined deadline queue, and state owner action boundaries. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Timeout is unknown settlement,not zero; no gap calculation or invented fees/hold/timing cause.
2. Preserves known sales 600 and period while cash flow unknown.
3. Queue inspection I9 before claim O9 by actual deadline.
4. Read-only no edit/product fix claim,owner actions in seller center and missing checks.

Return only PASS or FAIL.
