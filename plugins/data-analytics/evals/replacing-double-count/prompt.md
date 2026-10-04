---
description: Totals from a ReplacingMergeTree that double-count unmerged versions. The answer must explain merge-time dedup and give a correct query.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [clickhouse-query-authoring]
---

Our `orders` table is `ReplacingMergeTree(updated_at) ORDER BY order_id`. When an order's amount is
corrected we insert a new row with the same order_id and a later updated_at. Sometimes
`SELECT sum(amount) FROM orders` is higher than the real total, then later it is right again.
Why, and what query should the finance report use?
