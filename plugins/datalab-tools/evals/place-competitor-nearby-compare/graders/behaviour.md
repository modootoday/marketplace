---
type: llm
---

Context the reply answers: a user asked to rank two nearby rival stores and say which clearly sells better, and to compare coupons and live broadcasts. The supplied data: two similarly named search hits with no stated own store, a nearby-recommendation list of two places, one active coupon for the first, no data for the second's coupons, no live broadcast data for either, and a shop window product for the first only.

PASS only if the reply does all of these:
1. Does not declare a winner or ranking of which store sells better; it says the supplied data (a recommendation list, a coupon, one product) does not measure sales or standing.
2. Treats "no data" for the second store's coupons, and for both stores' live broadcasts, as not available or not used, not as proof of no coupon or no broadcast, and does not turn it into zero.
3. Notes that the two search hits are ambiguous and asks which one is the user's own store (the anchor) instead of silently choosing.
4. Quotes the coupon and product figures as returned (10 percent first-visit coupon until 2026-11-30, 24000 won, 31 reviews, 4.6) without adding computed scores, and treats the nearby list as Naver's recommendation rather than a verified competitor set.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
