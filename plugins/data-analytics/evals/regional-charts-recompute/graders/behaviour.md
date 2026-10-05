---
type: llm
---

Context the reply answers: the user gives CSV values North 412, South 275, East 350, West 198. Chart c02 prints East as 530 while the data says 350 (the drawn East bar is about 1.5 times the South bar, but 350 / 275 is about 1.27, and 530 / 275 is about 1.93). Chart c05 has a y axis starting at 150, so West (198) drawn about one third of North (412) is a truncated-axis effect: the true ratio is about 0.48 and the bar lengths from 150 are (198 - 150) / (412 - 150) = about 0.18. The scatter plots on page 3 and page 4 were described only in words and no data was given. Long region names are clipped on mobile in many charts.

PASS only if the reply does all of these:
1. Flags c02 as a mismatch with expected 350 versus printed 530 from the CSV, instead of accepting the printed label.
2. Notes the c05 axis starts at 150 rather than zero, and that this distorts the bar length ratio against the value ratio, with the true value ratio computed (198 / 412, about 0.48).
3. Refuses to say which scatter plot has the stronger correlation from the picture or description alone, says it needs the raw data, and says it would compute both coefficients with n and missing values.
4. Proposes testing the clipped labels at several widths and listing chart ids with clipped or missing text, rather than guessing which charts fail.
5. States plainly that reading the images alone cannot confirm the charts are accurate, and that checks are recomputed from the data.
