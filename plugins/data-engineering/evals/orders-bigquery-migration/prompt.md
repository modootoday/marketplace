---
description: A Postgres script converted to BigQuery lost statements and swapped a table. The reply must find the gaps and specify the equivalence checks.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [sql-migration-equivalence-check]
---

We migrated our orders reporting from Postgres to BigQuery with an AI conversion. Please confirm the migration is equivalent.

The source Postgres script has 11 statements, in this order: (1) CREATE TEMP TABLE raw_orders, (2) CREATE TEMP TABLE valid_orders, (3) CREATE TEMP TABLE order_items_agg, (4) CREATE TEMP TABLE refunds_agg, (5) CREATE TEMP TABLE orders_enriched, (6) UPDATE orders_enriched to set net_amount, (7) DELETE from orders_enriched where status = 'test', (8) CREATE INDEX on orders_enriched(order_id), (9) INSERT INTO analytics.orders from orders_enriched, (10) UPDATE analytics.orders set region from the customers table, (11) ANALYZE analytics.orders.

The converted BigQuery script has 9 statements: (1) CREATE TEMP TABLE raw_orders, (2) CREATE TEMP TABLE valid_orders, (3) CREATE TEMP TABLE order_items_agg, (4) CREATE TEMP TABLE refunds_agg, (5) CREATE TEMP TABLE orders_enriched, (6) UPDATE orders_enriched to set net_amount, (7) CREATE OR REPLACE TABLE analytics.orders_v2 AS SELECT from orders_enriched, (8) UPDATE analytics.orders_v2 set region from customers, (9) a comment line "-- remaining logic unchanged".

The new table analytics.orders_v2 replaces analytics.orders. The key is order_id on both. You cannot connect to either database from here.
