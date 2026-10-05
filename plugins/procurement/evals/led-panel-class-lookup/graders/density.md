---
type: llm
---

Context the reply answers: the user ships 4 pallets of LED lighting panels, each 48 x 40 x 60 inches and 380 lb, and pasted a carrier density guide (4 to under 5 lb/cu ft is class 200, 5 to under 6 is class 175, 6 to under 7 is class 150) from an unknown edition. One pallet is 48 x 40 x 60 / 1,728 = 66.7 cubic feet, so density is 380 / 66.7 = about 5.7 lb per cubic foot, which falls in the 5 to 6 band (class 175 in the pasted guide).

PASS only if the reply does all of these:
1. Computes density as about 5.7 lb per cubic foot, showing the volume (about 66.7 cu ft per pallet) arithmetic.
2. Applies the pasted guide to give class 175 as the density-based candidate and gives the reasoning, not a bare number.
3. Asks which classification edition the guide and the carrier use, and says the result can differ by edition.
