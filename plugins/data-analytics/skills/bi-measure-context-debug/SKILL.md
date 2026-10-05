---
name: bi-measure-context-debug
description: Debug a BI measure, calculated column or conditional-format rule that returns wrong totals - name the model relationships and filter context first, reproduce the wrong value for one filter state and compute the expected value by hand, simplify only while subtotal, grand total and filtered results stay equal, derive per-group scales from the model, and treat a live master file as having no past state. Use when a Power BI, DAX or similar measure gives rows that do not add to the total, is over-nested, needs a per-group color scale, or a past-period filter on a changing master file breaks counts. Not for building a new dashboard layout or for SQL tuning.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [DAX, Power BI, filter context, measure, subtotal, conditional formatting, snapshot]
---

# BI measure context debugging

A measure is evaluated once per cell, in the filter context of that cell. Wrong totals are
usually a context question, not an arithmetic one.

## Steps

1. State the product and version the syntax targets (for example Power BI DAX). Syntax for another
   tool is a translation and is marked untested.
2. Name the model before the formula: tables, relationship columns and direction, which
   columns each slicer, row and column field filters, and which filters the formula clears
   or keeps (ALL, ALLEXCEPT, REMOVEFILTERS, KEEPFILTERS or the tool's equivalent).
3. Reproduce the wrong value for one concrete filter state with small invented numbers if real
   ones are missing. Compute by hand what each cell in the matrix evaluates to: row, subtotal
   and grand total are separate evaluations. Show where the numerator and denominator
   contexts diverge, for example a denominator that clears one table's filters but keeps the
   slicer's.
4. Give the fix with its expected value in that same filter state, and say what to test in the
   tool: row, subtotal, grand total, with and without the slicer. If the measure may be
   correct for one reading of the request, say so. When two readings exist (for example a
   share within the slicer selection versus a share of everything), give the formula and the
   full hand-computed values for each: every row and the grand total. Close with a plain line
   naming the tool and syntax ("DAX for Power BI") and the cells to test.
5. Simplify variables and nesting only after the check set exists, and only keep a change that
   gives the same result at row, subtotal, grand total and in every filtered case you listed.
6. For per-group conditional formatting, compute each group's min and max from the model as
   measures evaluated per group over the shared axis (for example months), not a single global
   min and max. Say where the scale would change when a slicer moves.
7. When a past-period filter breaks on a live master file, say that a file holding only the
   current status cannot reproduce past states. Ask for a change history or dated
   snapshots; do not invent past values. Build the per-date table from events or snapshots and
   reconcile counts by period.

## Output

Context diagnosis, the corrected measure for the named tool, the hand-computed expected
values for each checked state, the simplification equality checks, and what remains untested.
