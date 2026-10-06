---
type: llm
---

Context the reply answers: the same slide-3 carousel QA with its list of defects, an unknown photo origin and a request "Can we publish it?".

PASS only if the reply:
1. Gives a table of defects with where, what, severity and the fix, and marks the blocking ones as blocking.
2. Does not approve the slide: it says it cannot be published while the blocking defects remain.
3. Says the photo's licence cannot be verified from the readings (unknown origin) and says what it could not check from the readings alone (for example the actual render or exact colours).
