---
type: llm
---

Context the reply answers: a student with an exam in 14 days (today is day 0) asked for flashcards from ten mitochondria note lines plus a review schedule. The reply should make a small deck and a spaced review plan.

PASS only if the reply does all of these:
1. Gives a review schedule with expanding gaps between sessions (for example day 0, 1, 3, 7, 11) listed as day numbers or dates, not just a statement that it should use spaced repetition.
2. Has every session fall within days 0 to 13, with the last review at least one day before the exam on day 14.
3. States how long a session takes (cards times seconds per card or a minutes figure) and the rule for a card the student gets wrong or misses (it returns to the next session).
4. Does not promise the schedule guarantees a result, and says which cards to drop first if time runs short or that the student adjusts the plan.
