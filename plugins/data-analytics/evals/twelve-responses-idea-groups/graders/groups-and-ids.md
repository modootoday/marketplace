---
type: llm
---

Context the reply answers: 12 synthetic anonymized responses. R1 "slow shipping", R2 "shipping takes too long", R3 "app crashes on login", R4 "cannot log in app", R5 "support never replied", R6 "price too high", R7 "delivery late", R8 "login crash", R9 "no answer from support", R10 "cheaper please", R11 "love the design", R12 "ok". The user asks for idea groups with response ids and counts.

PASS only if the reply does all of these:

1. Gives idea groups that carry the response ids: shipping or delivery R1, R2, R7; login crash R3, R4, R8; support R5, R9; price R6, R10, each with its count.
2. Lists R11 and R12 as unclassified or as separate items with their ids, and does not drop them or force them into another group.
