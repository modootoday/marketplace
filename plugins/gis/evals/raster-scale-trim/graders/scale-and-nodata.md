---
type: llm
---

Context the reply answers: a user has a Float64 temperature GeoTIFF in degrees C, values -30 to 45, tolerance 0.05 C, NoData -9999. A border is filled with 0 and 0 is also a valid temperature. The user plans to cut every cell equal to 0 and store int16 with scale 0.1, and asks how to shrink and trim safely. A scale of 0.1 gives a rounding error of exactly 0.05 (scale divided by 2), which is the tolerance with no margin; 0.01 gives 0.005 and the range -3000 to 4500 fits int16.

PASS only if the reply does all of these:
1. Recommends a scale of 0.01 or finer into int16 (for example 0.01 with range -3000 to 4500 stored), and notes that the user's 0.1 sits exactly on the tolerance with no margin (rounding error is scale divided by 2).
2. States the round-trip error under the tolerance with the number (for example 0.005 or less against 0.05) and tells the user to decode and compare with the original on valid cells.
3. Warns that trimming every cell equal to 0 would delete valid zeros, and says to trim on the NoData mask only (or recode the border to NoData only if the user confirms it is fill).
