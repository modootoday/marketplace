---
description: What multi-file-lab-workbook-harmonization should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [multi-file-lab-workbook-harmonization]
---

Synthetic example. I have to merge plate-reader workbooks from two labs into one table (the real folder has about 150 files; below is what I inspected for four of them). I will run whatever you write, so give me the plan and the conversion code.

Lab A files (plate_A_01.xlsx, plate_A_02.xlsx): sheet "Plate" has the header in row 3: Sample ID | Conc (ng/uL) | A260 | Date | Notes. Dates look like 14/03/2026. Each has 24 data rows. Each also has a sheet "QC" with 4 rows.

Lab B files (plate_B_01.xlsx, plate_B_02.xlsx): sheet "Plate" has a title cell in A1 reading "Concentrations in mg/mL", the header in row 2: Sample | Conc | A260 | Date | Tech. Dates look like 03/14/2026. plate_B_01 has 46 sample rows, then 2 blank rows, then a row labelled "Mean". plate_B_02 has 20 sample rows.

Target: one table with columns sample_id, conc_ng_per_uL, a260, date (ISO), source_file.
