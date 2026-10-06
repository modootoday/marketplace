---
name: cashflow-variance-bridge
description: Explain a month-over-month cash flow movement or a spiking expense category with a bridge that sums - start value to end value by driver, any residual named as unexplained, the spike drilled by vendor and transaction into one-off, timing and price or volume, the filter shown so numbers can be re-run, and each cause marked evidenced or hypothesis. Use when asked why operating cash fell or why one expense category jumped between two months. Not for forecasting, investment or accounting conclusions, or a ledger rollforward.
metadata:
  tier: open
  level: L3
  domain: finance-ops
  install: optional
  keywords: [cash flow, variance, bridge, expense spike, duplicate invoice, driver analysis]
---

# Cash flow variance bridge

A monthly cash flow explanation that does not add up to the change is a story, not a
bridge. Build the arithmetic first, then explain only what the figures support. This skill
works on the supplied figures; it makes no forecast and gives no accounting or investment
advice.

## Steps

1. Write the change: end minus start, with sign. Then list each driver as its cash effect
   with its sign (a rise in receivables lowers cash; say which sign convention the input
   uses and convert if needed).
2. Sum the drivers and compare with the change. A gap is a named residual line ("not
   supplied or unexplained: X"), never spread across drivers. If one driver was left
   unknown in the input, solve for it as the implied value and label it implied, not
   reported.
3. Spike drill: for the category that jumped, split the movement by vendor and by
   transaction. Separate one-off items, timing (an invoice moved between months), price
   versus volume, and a possible duplicate (same vendor, amount, date or number). State
   the recurring base and what remains after removing each candidate.
4. Mark every cause evidenced (a document or row shows it) or hypothesis (consistent with
   the figures, not shown), and say which record would confirm each hypothesis.
5. Show the re-runnable breakdown: the filter or query by category, vendor and period, and
   the totals it should return, so someone can rebuild the numbers.
6. List what was not checked. Do not recommend a treatment; the owner of the books decides
   corrections and whether a duplicate is real.

## Output

The bridge table (start, each driver, residual, end, check sum), the spike breakdown, the
evidenced versus hypothesis list, the re-run filter, and the not-checked list.
