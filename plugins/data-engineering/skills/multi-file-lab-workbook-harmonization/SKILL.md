---
name: multi-file-lab-workbook-harmonization
description: Merge many lab or instrument workbooks of similar but not identical layout into one table - inventory every file and sheet (header row, columns, units, date format), group files by layout variant, write a target schema with a per-variant column mapping, convert units and dates by explicit rules, reconcile rows in against rows out per file with a stated reason for each excluded row, and spot-check cells against the source. Use when dozens or hundreds of spreadsheets from one lab need one combined table. Not for statistics and not for parsing logs or JSON (use semi-structured-field-extraction).
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [Excel workbooks, lab data, schema mapping, unit conversion, reconciliation, spreadsheet merge]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Multi-file lab workbook harmonization

Researchers merging about 150 workbooks with several sheets each report that layouts look alike
but differ. The failures are silent: the same header with different units, dates read in the
wrong order, summary rows counted as samples, and a file that drops rows without a trace.

## Steps

1. Inventory every file and sheet as a table: file, sheet, header row, columns, units (look in
   title cells and notes, not only in headers), date format, row counts above and below the
   header, blank rows, summary rows. Group files into layout variants. If only a sample was
   given, list the files not seen and make no claim about them.
2. Write the target schema: column name, type, unit, allowed blanks. Add provenance columns
   (source file, sheet, source row).
3. Write the mapping per variant: source column to target column, with the conversion. Columns
   with the same name but a different unit or meaning are mapped separately and flagged. Source
   columns with no target are listed as unmapped, never dropped silently.
4. Fix rules before converting: unit factors with the arithmetic shown, one date parser per
   variant (confirm it with a date whose day exceeds 12), what a blank means, how summary and
   QC rows are handled.
5. Reconcile per file in a table with the columns file, sheet, rows in (every row below the
   header, blanks and summary rows included), rows out, rows excluded with the reason. A total
   that matches overall while a file differs is a failure. State the expected output total.
   Put the check in the code: a dictionary of expected rows per inspected file taken from the
   inventory, compared with the rows produced per file, raising an error on any difference. A
   check that only adds up the code's own counters proves nothing.
6. Spot-check three cells per variant against the source cell and report the variants no one
   has checked. Provide the script or formulas as untested unless it was run.

## Output

Inventory and variant table, schema, mapping table, rules, reconciliation table, spot-check
list, open questions for the lab. Close with three statements:

- each unmapped column with a question to the user: keep it as an extra column or drop it;
- "Only N of M files were inspected; the other M-N files and any further layout variants are
  unverified" with the real numbers;
- "The code was not run" unless it was.

Statistics on the merged table are out of scope.
