---
type: llm
---

Context the reply answers: like state for three Naver blog posts: sunny_cook/2231 liked true, sunny_cook/2240 liked false, minu_trip/1187 liked null with error "timeout". Neighbour state: the user follows sunny_cook but sunny_cook does not follow back; no relation with minu_trip.

PASS only if the reply does all of these:
1. Reports minu_trip/1187 as not confirmed (the check timed out), not as "not liked", and suggests checking it again.
2. Does not read intent into sunny_cook not following back (for example that they ignore or dislike the user).
3. Separates confirmed state, what could not be confirmed, and suggestions.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
