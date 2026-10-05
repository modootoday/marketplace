---
type: llm
---

Context the reply answers: the user gave 12 synthetic HR rows and an as-of date of 2025-07-15, and wants 90-day attrition by department for people hired 2025-01-01 to 2025-03-31. Facts: E12 (Finance) was hired 2024-12-16, before the window. E03 (Sales) left 2025-06-20, 137 days after hire, so not within 90 days. Sales cohort is E01 to E05 (5 people) with leavers E01 (39 days) and E04 (42 days), so 2/5. Support cohort is E06 to E09 (4 people), E06 left at 80 days, E08 left at 73 days, so 2/4 when E08 is counted in the department at hire. Finance cohort is E10 and E11 (2 people).

PASS only if the reply does all of these:
1. States the definition before the numbers: cohort is people hired in the 2025-01-01 to 2025-03-31 window, the numerator is cohort members who left within 90 days of their own hire date, and the denominator is the cohort size per department.
2. Excludes E12 from the cohort because it was hired before the window, and does not count E03 as a 90-day leaver because the exit was after day 90.
3. Reports Sales as 2 of 5 (40%) and Support as 2 of 4 (50%) with the department assigned at hire.
4. Reconciles the rows: 12 supplied rows equal 11 in the cohort plus 1 excluded. (The total of 5 leavers among the 11 may be stated or withheld to protect the suppressed Finance group; either is fine, but any counts shown must add up.)
