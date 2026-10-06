---
name: macro-logic-recovery-refactor
description: Recover the business logic of old spreadsheet macros or layered code and refactor shared parts without changing behavior - tabulate conditions, inputs, outputs and side effects per routine, keep every difference between near-duplicates as a parameter, treat shared state as an input, and compare outputs before and after on sample rows. Use when a user has old macros or layered code and needs the logic documented, a shared function extracted, or the layer a change must touch found. Not for rewriting in another language, performance tuning or new features.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [macro, VBA, refactor, business logic, shared function, behavior preservation, spreadsheet]
  verified-runtimes: [claude-code]
---

# Macro logic recovery and behavior-preserving refactor

Two routines that look alike usually differ in one place that matters: a rounding mode, a
skip rule, a global they read. Merging them by eye changes results nobody checks.

## Steps

1. Before editing, build a table per routine: inputs (ranges, parameters, globals), conditions
   (skip, filter, branch), the calculation, outputs (cells, files), and side effects (writes to
   other sheets, changes to shared variables, order dependence).
2. Put the tables side by side and list every difference, even small ones: rounding mode,
   comparison operator, start row, text case, which constants or globals are read.
3. Extract a shared function only for what is identical. Each difference becomes a parameter
   or stays outside the function. A global that is read or changed becomes an explicit
   argument or return value; say so, and flag any routine that mutates it differently.
4. Keep skip, cancel and error rules in every caller. Do not move one into the shared function
   unless both callers have it.
5. State the behavior-preservation check before the refactor: sample input rows (include a
   skipped row, a boundary rounding value and an empty cell), the expected output of the
   original by hand, and the comparison to run on the original and the refactored code
   (cell values and any written files).
6. List callers and layers: which routines, buttons or modules call what you change, and which
   layer a fix belongs to when the cause is far from the symptom.
7. Run nothing you cannot run. Say what was derived by reading and what must be executed
   in the user's workbook.

## Output

The per-routine tables, the difference list, the shared function with parameters, what is
preserved, the check plan with sample rows and expected values, and the callers touched.
