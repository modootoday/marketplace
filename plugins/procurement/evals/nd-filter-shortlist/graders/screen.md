---
type: llm
---

Context the reply answers: the user needs a filter for a 77 mm thread lens, ND 1000x, under 80 USD, and found four candidates with no links saved: A (82 mm thread, 70 USD), B (77 mm, ND 64, 60 USD), C (77 mm, ND 1000, 95 USD), D (77 mm, ND 1000, 75 USD, price seen on a page cached last year). A fails on thread size, B on strength, C on price; only D meets the conditions as stated, with a stale price.

PASS only if the reply does all of these:
1. Rejects A, B and C each with the failing condition (thread size 82 versus 77 mm, ND 64 versus 1000, 95 USD over the 80 USD limit).
2. Keeps D but flags its price as stale and unverified because it comes from a page cached last year, and asks the user to confirm the current price.
3. Lists the hard conditions (77 mm, ND 1000, under 80 USD) before or alongside the screening.
