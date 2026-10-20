---
type: llm
---

Context the reply answers: a user asked whether the post open in the writing window can reach top search placement and asked for a better title. The supplied scorecard shows three flags (title lacks the keyword, first paragraph lacks the keyword, body short). The title tool returned only a prompt (system and user text) to run, not titles.

PASS only if the reply does all of these:
1. Does not say or imply the post will or will not rank; it states that the tools give counts and flags and that no tool predicts placement.
2. Runs the returned title prompt itself and gives five title candidates with a reason each, instead of showing the prompt or saying the tool "returned instructions".
3. Quotes the scorecard values as supplied (for example the 31-character title, 1240 body characters, the three flags) without inventing a target density or a "good" threshold of its own.
4. Does not apply a title; it asks the user to pick one first and notes that setting the title is a separate step that changes the post and needs confirmation.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
