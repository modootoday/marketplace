---
name: semi-structured-field-extraction
description: Turn log lines, bench or test data and JSON documents into typed columns and a plot-ready table - inspect real samples and list every field, unit and type variation, map each source field to a column with an explicit cast and a policy for missing, string, array and wrong-type values, verify row counts, units and a hand-checked sample, and plot only from the extracted table with units on the axes. Use when someone asks to parse logs or JSON into columns, write extraction SQL or a parser, or chart measurements from raw text. Not for proving two SQL queries are equivalent (use sql-migration-equivalence-check).
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [log parsing, json extraction, type casting, unit normalization, test data, plotting]
---

# Semi-structured field extraction

Three first-person reports describe repeated one-off scripts for bench data, thermal test
plots and JSON extraction with casts. The usual failures are a mixed unit read as one, a
cast that errors or silently nulls, and a plot nobody checked against the raw points.

## Steps

1. Inspect real samples first. List every field, its observed forms, its unit and its type
   variants (for example `T=21.4C` and `T=70.5F`; a `price` that is `"12.50"`, `12.5`,
   absent or an array). If only two samples were given, say the list may be incomplete and
   ask for more lines.
2. Write the mapping table: source field, target column, target type and unit, cast
   expression, and the policy for each bad case. Choose one policy per case and state it:
   missing becomes NULL (or a flagged default), string numbers are cast, arrays are
   rejected to a quarantine table or exploded to rows (say which), wrong type goes to the
   quarantine with the raw value kept. Prefer the safe cast (`TRY_CAST`, `SAFE_CAST`,
   `try_` functions) and say why.
3. Normalize units to one stated unit before anything else, with the formula (F to C is
   `(F - 32) * 5 / 9`), and keep the original value and unit in raw columns.
4. Write the extraction (SQL or script) and test inputs for each bad case with the expected
   output row for each.
5. Verify and report: input rows versus output rows plus quarantined rows (they must add
   up), min and max per unit-normalized column, and a hand check of three source lines
   against their output rows. If the code cannot be run here, give the checks and say the
   result is unverified.
6. Plot only from the extracted table. Axis labels carry units, the time axis states its
   time zone or "as logged", and a few raw points are cross-checked against the plotted
   values. Do not plot mixed units on one axis.

## Output

The sample inventory, the mapping table with policies, the extraction code, bad-case test
inputs, the row-count reconciliation, and the plot specification with labelled axes.
