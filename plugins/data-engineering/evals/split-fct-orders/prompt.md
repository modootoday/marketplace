---
description: A 400-line dbt model is split into layers and its schema.yml is updated. The reply must preserve lineage, document real columns and prove equivalence.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [dbt-model-refactor-and-docs]
---

Please split models/marts/fct_orders.sql into staging and intermediate models and update the descriptions in schema.yml.

The model is about 400 lines and joins 6 CTEs: orders_raw (from source orders), customers (from source customers), items_agg (sum of line amounts per order), refunds_agg (refund amount per order), shipping (from source shipments) and final. In the orders_raw CTE the column amt is renamed to gross_amount. The final select returns these columns: order_id, customer_id, order_date, gross_amount, refund_amount, net_amount, ship_days, region, is_first_order.

The current schema.yml documents: order_id, customer_id, order_date, amt, net_amount, ship_days, region, channel. You cannot run dbt or reach the warehouse from here, and the files are not in the sandbox: work from the description above and give the proposed split and the proposed schema.yml entries as your answer.
