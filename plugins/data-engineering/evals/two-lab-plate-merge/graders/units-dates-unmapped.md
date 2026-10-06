---
type: llm
---

Context the reply answers: a user merges plate-reader workbooks from two labs into one table with columns sample_id, conc_ng_per_uL, a260, date (ISO), source_file. Lab A sheet "Plate": header in row 3 (Sample ID, Conc (ng/uL), A260, Date, Notes), dates like 14/03/2026, 24 data rows in each of two files, plus a "QC" sheet of 4 rows. Lab B sheet "Plate": cell A1 says "Concentrations in mg/mL", header in row 2 (Sample, Conc, A260, Date, Tech), dates like 03/14/2026, one file with 46 sample rows then 2 blank rows then a "Mean" row, another with 20 sample rows. The target has no Notes or Tech column.

PASS only if the reply does all of these:
1. Flags that the Lab B "Conc" column is in mg/mL (stated only in the title cell) while Lab A is in ng/uL, converts Lab B with the correct factor (mg/mL equals 1,000,000 ng/mL = 1000 ng/uL, so multiply by 1000), and does not merge the two Conc columns as if they were the same unit.
2. Uses a different date parser per lab (Lab A day first, Lab B month first, which the sample 03/14/2026 confirms) and outputs ISO dates, instead of one parser for all files.
3. Lists the Notes (Lab A) and Tech (Lab B) columns as unmapped with a decision or a question, and does not drop them silently; also handles the different header rows (row 3 for Lab A, row 2 for Lab B).
