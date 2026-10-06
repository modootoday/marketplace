---
name: reorder-point-from-sales-sheet
description: Set reorder points and order quantities for a small shop from a pasted sales sheet with lead time, minimum order quantity (MOQ) and pack size, with every input's unit written down and converted, the safety-stock rule stated, order quantities rounded up to MOQ and pack, scenario rows for higher demand and longer lead time, and thin-history SKUs flagged. Use when a shop owner asks when and how much to reorder from weekly or daily sales. Not for forecast backtesting on longer history with stockouts, pricing, or supplier selection.
metadata:
  tier: open
  level: L2
  domain: commerce
  install: optional
  keywords: [reorder point, safety stock, lead time, MOQ, pack size, inventory, sales spreadsheet, small shop]
  verified-runtimes: [codex-cli]
---

# Reorder point from a sales sheet

The common error in AI-built reorder alerts is a unit mismatch: weekly sales multiplied by a lead
time written in days, or the reverse. A second one is an order quantity that ignores the supplier's
MOQ and pack size. This skill fixes the units first and does the arithmetic in code.

## Steps

1. Write down the unit of every input per SKU: sales per day or per week, lead time in days or
   weeks, on-hand stock, MOQ, pack size. Convert everything to days (or everything to weeks) and show
   the conversion, for example 3 weeks = 21 days.
2. Average demand per day over the history given. Say how many periods it covers and list any zero
   or outlier period; do not drop them silently.
3. Reorder point = average daily demand x lead time in days + safety stock. Name the safety-stock
   rule used (the owner's rule, for example one week of demand; if none is given, ask or state an
   assumption and mark it as one). Compute in code, for example with `node -e`, and show the figures.
   Use the lead time the owner says to use; if observed deliveries took longer than the quote, flag it
   and also show the reorder point at each observed lead time.
4. Order quantity: take the owner's target (for example cover N weeks of demand), then round up to
   the MOQ and to a multiple of the pack size. Show the rounded quantity and the surplus it creates
   over the target.
5. Run scenario rows: demand +20%, lead time +50%, and both together. Show the reorder point in each.
6. Flag SKUs whose history is short (under a season or a few periods), lumpy or has zero periods:
   give the figure but label it low confidence, say what extra history is needed, and for longer
   histories with stockouts hand off to a forecast backtest instead of extending this arithmetic.
7. If on-hand is given, say whether the SKU is already at or below its reorder point.
8. Say in the reply that these are arithmetic on the sales given, not a demand forecast. End with
   a list headed "Assumptions you must confirm" whose first two lines are always: the safety-stock
   rule used (name it, for example one week of average demand) and the lead time used per SKU (in
   days, and whether it is the quote or an observed value). Then add the others (lead time
   reliability, no promotions).

## Output

A table per SKU: units, average daily demand, lead time in days, safety stock and its rule, reorder
point, rounded order quantity, surplus, scenario reorder points, confidence flag. Then the
"Assumptions you must confirm" list, opening with the safety-stock rule and the lead time used. This is arithmetic on the data given, not a demand forecast.
