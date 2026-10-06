---
type: llm
---

Context the reply answers: a dbt model models/marts/fct_orders.sql of about 400 lines joins 6 CTEs (orders_raw from source orders, customers from source customers, items_agg, refunds_agg, shipping, final). In orders_raw the column amt is renamed gross_amount. The final select returns: order_id, customer_id, order_date, gross_amount, refund_amount, net_amount, ship_days, region, is_first_order. schema.yml documents: order_id, customer_id, order_date, amt, net_amount, ship_days, region, channel. The user asks to split the model into staging and intermediate models and update descriptions. dbt and the warehouse cannot be reached.

PASS only if the reply does all of these:
1. Proposes new models by layer (staging models for the sources, intermediate models for the aggregates or joins, a final fct_orders) and shows the lineage so every CTE input and output has a home and the final output keeps all nine columns.
2. Keeps the rename of amt to gross_amount where it was (staging or the same step), and does not drop or silently rename any final column.
3. States a result-equivalence check between the original and the split model run on the same data: row counts and sums of the numeric columns, with a key anti-join or equivalent.
