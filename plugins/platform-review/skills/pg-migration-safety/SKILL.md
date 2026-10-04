---
name: pg-migration-safety
description: Review a PostgreSQL schema migration for production safety - which statements take locks that block reads or writes, how long they hold them, CONCURRENTLY and NOT VALID patterns, backfills in batches, lock and statement timeouts, and the deploy order between code and schema. Use before running a migration on a live Postgres database, or when a migration caused downtime. Not for ClickHouse or query tuning.
metadata:
  tier: open
  level: L3
  domain: data-migration
  install: optional
  keywords: [Postgres migration, zero downtime, locks, create index concurrently, backfill, schema change]
---

# Safe Postgres migrations

The risk in a migration is rarely the change itself; it is the lock it takes
and every query queued behind that lock while it waits.

## Statement by statement

| Change | Risk | Safer pattern |
| --- | --- | --- |
| `CREATE INDEX` | blocks writes for the build | `CREATE INDEX CONCURRENTLY` (outside a transaction) |
| Add column with a volatile default | rewrites the table on older versions | add without default, backfill, then set default |
| Add `NOT NULL` | full scan under a strong lock | add a `CHECK (col IS NOT NULL) NOT VALID`, `VALIDATE` it, then set not null |
| Add foreign key | scans both tables under lock | add `NOT VALID`, then `VALIDATE CONSTRAINT` |
| Change column type | usually rewrites the table | new column, dual write, backfill, switch, drop |
| Drop column or table | code still reading it fails | stop reading in code first, deploy, then drop |
| Rename | breaks running code | add new, migrate readers, remove old |

## Locks and timeouts

Set `lock_timeout` (a few seconds) and `statement_timeout` for the migration
session, so a migration that cannot get its lock fails fast instead of queuing
every request behind it. Retry later rather than raising the timeout.

## Backfills

In batches by primary key range with a pause between, outside the schema
migration's transaction, and idempotent so it can be resumed.

## Deploy order

Expand (additive schema), deploy code that works with both shapes, migrate data,
contract (remove the old shape). Each step must be safe to roll back alone.

## Output

Per statement: lock level, expected duration on this table's size, the safer
rewrite, and the deploy step it belongs to.
