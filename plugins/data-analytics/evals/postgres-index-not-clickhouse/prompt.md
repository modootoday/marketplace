---
description: A PostgreSQL indexing question. The ClickHouse skill must not fire.
max_turns: 4
allowed_tools: [Read, Glob, Grep, Skill]
tags: [clickhouse-query-authoring, negative]
---

In PostgreSQL, what index should I create for `SELECT * FROM users WHERE lower(email) = $1`?
