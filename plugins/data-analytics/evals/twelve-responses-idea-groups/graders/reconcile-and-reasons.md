---
type: llm
---

Context the reply answers: 12 synthetic anonymized responses. R1 "slow shipping", R2 "shipping takes too long", R3 "app crashes on login", R4 "cannot log in app", R5 "support never replied", R6 "price too high", R7 "delivery late", R8 "login crash", R9 "no answer from support", R10 "cheaper please", R11 "love the design", R12 "ok". The user asks for idea groups with response ids and counts.

PASS only if the reply does all of these:

3. Gives counts that reconcile to 12 responses (for example 3 + 3 + 2 + 2 + 2 = 12) and states the reconciliation explicitly.
4. States a short merge reason for each merged group and invents no idea that is absent from the responses.
