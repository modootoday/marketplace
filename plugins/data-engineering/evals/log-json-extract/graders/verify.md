---
type: llm
---

Context the reply answers: bench log lines (two with temperatures, one Fahrenheit, one "fault" line with none) and JSON order documents whose price is a string, a number, missing or an array must be extracted to typed columns, then temperature plotted over time. The reply cannot run code or see more than the samples.

PASS only if the reply does all of these:
1. Reports or specifies reconciliation of input rows against output rows plus rejected or quarantined rows, so the counts add up, and says it was not run if it was not.
2. Includes test inputs for the bad cases (missing, string, array price; the fault line; the Fahrenheit line) with the expected output for each.
3. Specifies a plot whose axis labels carry units (for example temperature in degrees Celsius, time with its time zone), plots only from the extracted table, and includes a cross-check of a few raw points against the plot or table.
