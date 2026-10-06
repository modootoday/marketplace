---
description: What pg-migration-safety should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pg-migration-safety]
---

We deploy tonight in one step. Review this migration for our production Postgres 15, table `events` (about 120 million rows, constant writes):

```sql
ALTER TABLE events ADD CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE events ALTER COLUMN amount TYPE numeric(12,2);   -- currently integer cents
ALTER TABLE events RENAME COLUMN ts TO created_at;
ALTER TABLE events DROP COLUMN legacy_flag;                  -- the app still reads legacy_flag in two places
```

Our migration runner wraps the file in one transaction with default timeouts.
