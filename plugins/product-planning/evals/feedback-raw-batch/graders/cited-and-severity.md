---
type: llm
---

PASS only if all three hold:
1. Every theme lists the feedback ids it is built from (for example F1, F4, F7, F10), and the
   counts it reports agree with the ids listed.
2. The data-loss report F9 is called out on its own as the most severe item (or as needing
   immediate action) even though only one user reported it. Also listing F9 inside a sync theme is
   fine as long as it is called out on its own as well.
3. The reply does not claim numbers the input cannot support (for example a percentage of all
   users, or a trend over weeks).

FAIL if any theme has no ids, if F9 is merged into the sync-duplicates theme without being flagged
as more severe, or if the reply invents numbers beyond these twelve items.
