---
type: llm
---

Context the reply answers: a Postgres script of 11 statements was converted to a BigQuery script of 9. Source statements 1 to 6 map to converted 1 to 6. Source 7 (DELETE test-status rows from orders_enriched) and source 8 (CREATE INDEX) have no BigQuery counterpart as code; converted statement 9 is only the comment "-- remaining logic unchanged". Source 9 and 10 (insert into analytics.orders, set region from customers) correspond to converted 7 and 8, which write analytics.orders_v2 instead. Source 11 (ANALYZE) has no counterpart. The new table analytics.orders_v2 replaces analytics.orders, the key is order_id, and the user cannot connect to either database from the reply's environment. The user asks to confirm the migration is equivalent.

PASS only if the reply does all of these:
1. Numbers the statements of both scripts and finds the missing source statements by number, including the dropped DELETE of status 'test' rows, and treats the comment line as a placeholder rather than as converted logic.
2. Writes queries that compare analytics.orders and analytics.orders_v2: row counts plus an anti-join on order_id in both directions.
3. Compares the non-key columns on matching order_id values with a null-safe comparison such as IS DISTINCT FROM.
4. Describes a seeded-difference test (for example a removed key, a changed value or a duplicated row) to show the checker fails when it should.
5. Does not declare the migration equivalent; it says equivalence is unproven until the queries are run, or that the missing DELETE already makes a difference likely.
