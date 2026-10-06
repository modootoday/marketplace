---
name: datalab-commerce-health
description: Check a Naver Smart Store in one pass - settlement, sales, order changes and product inspection issues - keeping each figure in its own aggregate. Use when the user asks how the store is doing today, why settlement differs from sales, or which store operations issues were missed. Not for processing, cancelling or shipping orders or editing products.
metadata:
  tier: open
  level: L3
  domain: commerce
  install: optional
  keywords: [naver smart store, smartstore, settlement, sales, orders, claims, product inspection, ecommerce, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Store health check

Combine deadline-bearing order claims and product inspection corrections into one operations queue, earliest deadline first, before undated cancellation or address-change requests. Recent-first tool ordering is not the response priority. State that this check only reads data and the user must perform changes in the seller center.

See the money flow and the operations problems to handle now on one page, as separate aggregates.

## Procedure

1. Without a user period: settlement and sales over the last 30 days, order changes over the last 24 hours. Say so.
2. `commerce_settlement`: next settlement date, settlement amount, fees, payment holds.
3. `commerce_sales`: sales for the same period. Never assume sales should equal settlement.
4. `commerce_orders` and `commerce_product_issues`: claims, address changes, inspection correction requests.
5. Write three sections: **Cash flow** (settlement), **Sales**, **Operations issues to check now**, and propose an order
   of response (for example claims with deadlines first).
   If the user asked to approve or change an order, include a capability statement in the final reply: this check
   only reads data, no order action was performed, and the owner acts in the seller center. Missing connection tools
   are a separate execution limitation; do not imply that connecting them would make this check process orders.

## Rules

- No commerce API credentials: describe the setup needed; invent no amounts.
- The sales to settlement gap: show the arithmetic, subtract only the components the tools reported (fees, holds), and
  leave the remainder unexplained. Timing (orders not yet confirmed or settled) is a possible reason to check, not a
  conclusion; without timing data do not pin the gap on one cause.
- Do not guess order numbers or buyer details.
- Never process, ship, cancel or edit. When asked, say this check is read-only and the user acts in the seller
  center; list what they would need to act on.

## Tools

- `commerce_settlement`: upcoming settlement date, amount, fees, holds.
- `commerce_sales`: sales amount for the period.
- `commerce_orders`: order changes such as claims and address changes, recent first.
- `commerce_product_issues`: inspection correction requests and product problems.

When these tools are not available, use only the output the user pasted and do not invent the rest.
