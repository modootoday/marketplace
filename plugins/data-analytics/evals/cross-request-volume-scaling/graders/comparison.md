---
type: llm
---

Context the reply answers: a Naver Data Lab question in Korean. Request A (all users) has groups 텀블러 (Nov 70, Dec 100) and 머그컵 (Nov 30, Dec 40). Request B (women in their 20s only, a separate request) has groups 텀블러 (Nov 62, Dec 100) and 보냉병 (Nov 48, Dec 88). The keyword tool gives only 텀블러's November volume (52,000). The user asks (1) roughly how many monthly searches 머그컵 had in November and (2) whether 보냉병 or 머그컵 had more searches in December.

PASS only if the reply, for question 2:
1. Says that 보냉병 and 머그컵 appear in two different requests with different filters (request B is 20s women only), so their ratios cannot be compared directly, and that a new single request with both groups and the same filters is needed.
2. Says the ratio is a relative index inside its own request and not a search count.
3. Does not conclude which of the two is larger from the numbers 88 and 40.
FAIL if it ranks 보냉병 above 머그컵 (or the reverse) from the ratios across A and B.
