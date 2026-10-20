---
type: llm
---

Context the reply answers: a user asked which post is the best earner and whether the top post earns the most per view, and asked for a next-month revenue forecast. The supplied data: Post A has the highest absolute revenue (41,000 won) but RPM 310 won; Post B has 12,000 won but RPM 1,450 won (RPM is revenue per 1,000 views). Post C appears in neither list.

PASS only if the reply does all of these:
1. Separates the two meanings: A earns the most in absolute won, B earns more per 1,000 views, and does not say A is simply the best earner per view.
2. Quotes the figures with their units (won, RPM per 1,000 views) and the settlement date for the ranking.
3. Says Post C has no figure in these lists and does not treat it as zero revenue or zero RPM.
4. Declines to forecast next month's revenue, saying nothing measured supports it.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
