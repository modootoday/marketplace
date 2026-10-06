---
name: clickhouse-query-authoring
description: Write or review ClickHouse SQL that reads the primary key, states its timezone, deduplicates correctly and takes values as typed parameters - and check the plan before calling it fast. Use when the user writes, debugs or reviews a ClickHouse query, a materialised view or a table's ORDER BY and partition key. Not for PostgreSQL or MySQL tuning.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [ClickHouse, SQL, query performance, MergeTree, timezone, parameterized query]
  verified-runtimes: [codex-cli]
---

# ClickHouse queries that stay correct and cheap

ClickHouse forgives slow queries for a long time and wrong ones forever. Most
production problems trace to four things: a filter that misses the primary key,
a timezone nobody stated, duplicates counted twice, and values pasted into SQL.

A project can keep its own facts (database name, client wrapper, table list) in
an overlay the agent reads alongside this skill; when one exists, it wins over
the defaults here.

## Read the key, not the table

- Find the table's `ORDER BY` (the primary key) and `PARTITION BY` first:
  `SHOW CREATE TABLE`. Filters on the leading key columns and on the partition
  column are what let ClickHouse skip data.
- Filter on the column as stored. Wrapping a key column in a function
  (`toDate(ts) = ...`) can stop index use; compare `ts` against a range
  instead.
- Select the columns you need. Columnar storage makes `SELECT *` read every
  column of every matching row.
- Before claiming a query is efficient, run `EXPLAIN indexes = 1` and report how
  many parts and granules it selects out of the total.

## State the timezone

Every date boundary names its timezone explicitly: `toStartOfDay(ts, 'UTC')`,
`toDateTime('2026-10-04 00:00:00', 'UTC')`. Without it the server or session
default decides, and a dashboard and a batch job disagree by a day. Convert to
a local zone only for display, at the edge.

## Count what you mean

- `ReplacingMergeTree` and `CollapsingMergeTree` deduplicate during background
  merges, so unmerged duplicates are visible. Use `FINAL` (and accept its cost)
  or aggregate with `argMax(value, version)` per key when correctness matters.
- `uniq` is approximate; use `uniqExact` when the number is reported as exact.
- A `JOIN` builds the right side in memory: put the smaller set on the right, or
  use `IN` with a subquery, or a dictionary for lookups.

## Never paste values into SQL

Use query parameters (`{user_id:UInt64}` with the value sent separately) or the
client library's binding. String concatenation is an injection hole and also
defeats type checking.

## Writes

Avoid `ALTER TABLE ... UPDATE/DELETE` for routine work: mutations rewrite whole
parts asynchronously. Model changes as new rows (versioned replacing tables) or
use lightweight deletes where the version supports them, and say which.

## Review output

For each issue: the line, what goes wrong (wrong number, wrong day, full scan,
injection), the corrected SQL, and the `EXPLAIN` evidence when performance is
the claim.

- The corrected SQL names columns: never carry `SELECT *` (or `t.*`) into it; use
  the columns the report needs, or placeholders and ask which ones.
- When you cannot run the query, do not call it fast or fixed. Say the
  efficiency is unproven, give the exact `EXPLAIN indexes = 1` statement, and
  tell the user to read the selected parts and granules against the totals.
