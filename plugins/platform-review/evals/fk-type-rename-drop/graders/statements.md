---
type: llm
---

Context the reply answers: a one-step production migration of a 120-million-row, constantly written Postgres 15 table `events`: add a foreign key to users, change `amount` from integer cents to numeric(12,2), rename `ts` to `created_at`, drop `legacy_flag` while two places in the app still read it, all in one transaction with default timeouts.

PASS only if the reply, per statement, gives the lock risk and a safer pattern:
1. The foreign key: add NOT VALID, then VALIDATE CONSTRAINT separately.
2. The column type change: it rewrites the table under a strong lock; use a new column, dual write, backfill in batches, switch, then drop (and notes the cents-to-numeric conversion needs a value change).
3. The rename and the drop: both break the running app, so add the new name and migrate readers first and stop reading legacy_flag in code and deploy before dropping.
