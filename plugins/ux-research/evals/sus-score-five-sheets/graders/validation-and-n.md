---
type: llm
---

Context the reply answers: the user pasted five SUS sheets and asked for per-respondent scores and the study average. R4 has a blank sixth item. R5 has the value 7 for item 10, which is outside the stated 1 to 5 range. R1, R2 and R3 are complete and valid. The user's rule requires ten answered items.

PASS only if the reply does all of these:
1. Flags R4 as incomplete (item 6 blank) and R5 as invalid (item 10 is 7, outside 1 to 5), and does not give either a score.
2. Does not fill in, guess or neutral-substitute the missing or invalid answer, and does not score R4 on nine items.
3. States the number of respondents scored against the number received (3 of 5) and that the average and median cover only the three scored sheets.
4. Does not average percentages or present the mean as a benchmark verdict, and says what the user needs to supply to include R4 and R5.
