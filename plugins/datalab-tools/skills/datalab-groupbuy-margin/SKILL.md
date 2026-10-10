---
name: datalab-groupbuy-margin
description: Reconcile creator group-buy contribution and settlement from supplied commission or resale terms. Use when checking a campaign's margin, refund exposure or net payout. Not for store-wide health, assumed tax, sales forecasts or executing orders and payments.
metadata:
  tier: open
  level: L4
  domain: commerce
  install: optional
  keywords: [group buy, creator commission, resale, contribution, settlement, datalab]
  verified-runtimes: [codex-cli]
---

# Group-buy margin

Resolve whether the creator earns a commission or buys and resells inventory before subtracting costs. Supplier sales and creator revenue are different quantities.

## Workflow

1. Extract the campaign, period, currency, seller and creator role, commission or purchase terms, refund rules, cost ownership and settlement status. Supplier fulfillment alone does not settle the creator's responsibilities. Use [references/contribution-and-settlement.md](references/contribution-and-settlement.md) for calculations.
2. Build the contract-defined revenue base from the supplied records: ordered, paid, fulfilled or refund-adjusted sales, including shipping or discounts only as agreed. Store-wide aggregates cannot establish one campaign's result without a supported allocation.
3. Commission-only: earned commission minus documented creator-borne costs. Do not subtract the supplier's inventory cost unless the creator actually bears it. Resale: retained sales receipts minus costs of units sold, other creator-borne variable costs and documented unrecoverable refund or inventory losses. Keep recoverable stock separate as inventory/cash exposure; unknown recovery value is not a default loss or zero.
4. Reconcile each fee once. If the reported payout already deducts a processor fee, use the net payout or reconstruct gross and subtract that fee once, not both. Show receivables, holds and settlement timing separately from operating contribution; unreceived money is not automatically a loss.
5. Name the denominator for each ratio: contribution divided by commission revenue, or contribution divided by retained resale sales. Keep payout and margin distinct. Add labor opportunity cost only as a separate scenario using a supplied rate. Unknown refunds, expenses or taxes remain unresolved, not zero or an assumed rate.
6. Return the source-labelled revenue/cost calculation, settlement bridge, supplied refund or volume scenarios and unresolved contract questions. Say what cannot yet be calculated. No orders, refunds, transfers, supplier contact or tax filing are performed.

## Optional data tools

MCP is optional; use supplied contracts and records when sufficient without mandatory discovery. Supporting store data may be read through visible tools with their actual schemas, or discovered with datalab_find_tools and called using only returned names and schemas through datalab_call. Do not invent tool names or arguments. If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status. If optional evidence remains unavailable, retain the gap and continue from supplied records. Preserve returned windows and aggregate scope: a store settlement total does not become campaign commission income. No tool connection authorizes financial actions or fills missing contractual inputs.
