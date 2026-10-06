---
type: llm
---

Context the reply answers: a slow ClickHouse query on `events` (3 billion rows, ORDER BY (tenant_id, event_date, user_id), PARTITION BY toYYYYMM(event_date), event_date is a Date) joined to a 400-row `plans` table, filtering with formatDateTime(event_date, '%Y-%m') = '2026-09' and tenant_id = 42, selecting every column. The user cannot run anything now.

PASS only if the reply:
1. Replaces the function-wrapped date filter with a plain range on the stored column (event_date >= '2026-09-01' AND event_date < '2026-10-01' or equivalent) and explains it is what lets the key and partition prune.
2. Puts the small table (plans) on the right side of the join, or uses IN or a dictionary lookup instead.
3. Does not keep SELECT * (or t.*) in the rewritten query: it lists the needed columns, or placeholder column names, or asks which columns to select.
FAIL if the rewritten query still wraps event_date in a function in the WHERE clause.
