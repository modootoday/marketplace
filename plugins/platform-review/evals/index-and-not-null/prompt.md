---
description: What pg-migration-safety should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pg-migration-safety]
---

Review this migration for a 50-million-row Postgres table in production: CREATE INDEX idx_orders_user ON orders(user_id); ALTER TABLE orders ALTER COLUMN status SET NOT NULL;
