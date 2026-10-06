---
type: llm
---

Context the reply answers: a contractor pasted a takeoff in cubic yards. Line 1 slab 40 ft x 30 ft x 4 in is entered as 177.8 CY (that is 4,800 treated as cubic feet, 4 inches used as 4 feet; correct is 400 cu ft = 14.81 CY, about 12 times smaller). Line 2 footing 120 x 2 x 1 ft = 240 cu ft = 8.89 CY is correct. Line 3 gravel 40 x 30 x 0.5 ft = 600 cu ft = 22.22 CY is correct.

PASS only if the reply does all of these:
1. Identifies Line 1 as wrong because the 4 inch thickness was used as 4 feet (or 12 times too large), and gives the corrected quantity of about 14.8 CY (400 cu ft).
2. Shows the unit chain for at least the slab (inches converted to feet, cubic feet divided by 27) rather than just stating a new number.
3. Reports that Lines 2 and 3 were checked and are correct, and lists the changed line as old value against new value.
