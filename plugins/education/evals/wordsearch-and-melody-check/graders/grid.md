---
type: llm
---

Context the reply answers: a teacher asked for a 10x10 word search containing CAT, DOG, FISH, BIRD and FROG running in at least four different directions, with an answer key. The reply's grid and key can be checked by reading the letters. A word search is only valid if every word actually appears in the grid at the listed position.

PASS only if the reply does all of these:
1. Delivers a 10 by 10 grid (ten rows of ten letters) and lists all five words with start coordinates and a direction (or end coordinates) in an answer key.
2. Every listed word, read from the grid along its stated coordinates and direction, spells the word exactly. The judge checks at least three of the five words letter by letter and none of the checked ones is wrong.
3. Uses at least four different directions across the words (for example across, down, diagonal, backward), as asked.
4. Shows evidence of verification: the output of a checker or script run, or a letter-by-letter read-back of each word from the grid, rather than only asserting the grid is correct.
