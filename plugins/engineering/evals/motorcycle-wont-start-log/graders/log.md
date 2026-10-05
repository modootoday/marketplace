---
type: llm
---

Context the reply answers: the user's motorcycle cranks but will not start since rain yesterday; the spark looks weak when the plug is held to the engine; fuel is fresh (filled two days ago); the battery measured 12.4 V with a multimeter this morning; the user guesses the coil is dead and asks what to check next and how to track it.

PASS only if the reply does all of these:
1. Gives a log table with columns for the test or symptom, the reading with its unit (battery 12.4 V recorded with its unit), the result, the conclusion limited to what the result shows, and a rules-out column.
2. Keeps the user's "coil is dead" in a hypotheses list separate from the observed facts and does not declare the coil or any other part to be the cause; uses wording such as consistent with and lists alternatives still open.
3. Asks or lists 5 to 8 discriminating questions or checks in order of diagnostic value that fit a wet-weather no-start (for example kill switch and stand switch state, wet plug or plug cap, water in the plug well or wiring, whether the fault changes when dry).
