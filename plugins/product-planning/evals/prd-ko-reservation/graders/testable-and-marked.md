---
type: llm
---

PASS only if all four hold:
1. The PRD is written in Korean and has non-goals (at least two things it will not do).
2. "빠르고 쉽게" does not survive as a requirement as written: it is turned into a number or an
   observable behaviour, or moved to open questions.
3. At least one edge case has a written outcome (for example the new slot is already taken, a
   change too close to the appointment, or the shop's cancellation policy).
4. Facts the user did not give (deadlines for changes, limits, metric baselines) are marked as
   assumptions, and no current metric value is invented.

FAIL if any of the four is missing.
