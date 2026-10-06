---
name: spend-projection-and-pattern
description: Build year-to-date and full-year spend projections and supplier spend patterns from purchase-order or transaction lines by normalising supplier names and categories first and reporting every merge, naming the projection method, labelling actual versus projected, reconciling the total to the ledger or PO total, and showing top-supplier concentration and unusual months with the rows behind them. Use when a buyer or analyst needs YTD and forecast spend sheets or supplier spend patterns from transaction data. Not for budget approval, supplier performance scoring, or tax and accounting treatment.
metadata:
  tier: open
  level: L3
  domain: procurement
  install: optional
  keywords: [spend analysis, year to date, run rate, forecast, supplier concentration, ledger reconciliation]
  verified-runtimes: [claude-code]
---

# Spend projection and pattern

Spend sheets go wrong in the data, not the formula: the same supplier under three spellings, lines
that do not add to the ledger, and projections that look like actuals.

## Steps

1. Normalise before totalling. Group supplier names that differ only by case, punctuation or a
   legal suffix (Corp, Corporation, Inc), and normalise category labels the same way. Report each
   merge as "variants -> one name, lines, amount". Ask before merging names that could be
   different companies.
2. Check the period and the lines: months covered, duplicate lines, cancelled or credit lines, and
   currency. State what was excluded.
3. Reconcile first. Compare the line total to the ledger or PO total the user gave. If they
   differ, report both numbers, the absolute and percentage gap, and the likely places to look
   (unposted invoices, cancelled lines, timing, missing lines). Do not force the totals to match.
4. Compute year-to-date actual. Then project the rest of the year with a named method: run-rate
   (YTD divided by months elapsed, times 12), or seasonal if monthly history for a prior year
   exists. If only a half-year total is given, say run-rate is the only supportable method and
   that it assumes flat months.
5. Label every figure as actual or projected, in the table headers, not only in prose. Show the
   projection as a range when the method allows it (run-rate versus a stated alternative).
6. Show concentration: top supplier and top-N share of total, using the merged names. If the data
   lists only some suppliers, say the top-N beyond them cannot be computed.
7. Show unusual months or lines (a month far from the run-rate, a single large line) with the
   rows behind each. Without monthly data, say the month pattern cannot be tested.

## Output

Merge report, reconciliation line, YTD actual, projection with the method, concentration table, and
the unusual rows. End with what you could not verify. The numbers support a review; the analyst
owns the forecast.
