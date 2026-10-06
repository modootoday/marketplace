---
type: llm
---

Context the reply answers: a user merges plate-reader workbooks into one table. Inspected files: plate_A_01 and plate_A_02 (24 data rows each on sheet "Plate", plus a 4-row "QC" sheet in each), plate_B_01 (46 sample rows, then 2 blank rows, then a "Mean" row) and plate_B_02 (20 sample rows). The real folder holds about 150 files; only these four were inspected. The user will run whatever is written.

PASS only if the reply does all of these:
1. Gives a per-file reconciliation of rows in versus rows out with the expected counts (24, 24, 46, 20, so 114 rows from the four files' Plate sheets) and a stated reason for each excluded row (the 2 blank rows and the "Mean" row in plate_B_01, and the QC sheets if they are left out), rather than only an overall total.
2. Makes the conversion code check that per-file count and fail or report when it differs, and excludes the "Mean" and blank rows by an explicit rule rather than by luck.
3. Says that only four of the roughly 150 files were seen, lists the other files or variants as unverified, proposes a spot-check of a few cells per layout variant against the source, and states the code was not run.
