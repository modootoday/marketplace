---
description: A ClickHouse query with a function-wrapped key, no timezone, approximate count reported as exact and a concatenated value. The review must catch them.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [clickhouse-query-authoring]
---

Review this query before it goes into our billing report. The table is
`events ENGINE = MergeTree ORDER BY (tenant_id, ts) PARTITION BY toYYYYMM(ts)`, and `ts` is a
DateTime.

```js
const sql = `
  SELECT toDate(ts) AS day, uniq(user_id) AS active_users
  FROM events
  WHERE tenant_id = '${tenantId}' AND toDate(ts) >= '2026-09-01'
  GROUP BY day ORDER BY day`;
```

The report says "exact daily active users per calendar day, Korea time".
