---
type: llm
---

Context the reply answers: the same one-step, single-transaction migration of the 120-million-row events table.

PASS only if the reply:
1. Says to set lock_timeout (a few seconds) and statement_timeout for the migration session so it fails fast instead of queuing every request behind a lock, and to retry later rather than raising the timeout.
2. Splits the work into expand, deploy code that works with both shapes, migrate data, contract, each step safe to roll back alone, and says it should not be one step tonight.
3. Describes backfills in batches by primary key range with a pause, outside the migration transaction, and idempotent; and says to run the migration statements outside one big wrapping transaction where required (for example the VALIDATE step).
