---
type: llm
---

Context the reply answers: the user asked for a Pythagorean life path number for birth date 1992-11-29, keeping master numbers 11, 22 and 33 unreduced. Correct steps: month 11 stays 11 (master number); day 29 gives 2+9=11, kept; year 1992 gives 1+9+9+2=21, then 2+1=3; total 11+11+3=25, then 2+5=7. The reply must make no predictions.

PASS only if the reply does all of these:
1. Shows month 11 kept as a master number, day 29 as 2+9=11 kept, and year 1+9+9+2=21 reduced to 3, each on its own step.
2. Sums 11+11+3=25 and reduces it to 7 with the step shown, and says where another system (for example reducing 11 early, or a different method of combining) would give a different result.
