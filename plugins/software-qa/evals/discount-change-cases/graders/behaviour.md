---
type: llm
---

Context the reply answers: story R-12 gives a 10% discount for orders over 50,000 KRW. The diff changes the condition to at least 50,000 and lets one coupon stack after the discount. The design mock-up says the discount line is red under the subtotal. Existing cases: TC-1 (49,999, no discount), TC-2 and TC-3 (both 60,000 with discount 54,000, so duplicates), TC-4 (60,000 with a 5,000 coupon, author unsure of the expected total; with the coupon applied after the discount the total would be 49,000).

PASS only if the reply does all of these:
1. Adds a boundary case at exactly 50,000 KRW expecting the discount (the changed behavior), and notes TC-1 at 49,999 still holds.
2. Adds or fixes coupon stacking cases, including that the coupon applies after the discount, and resolves or flags the unsure expected value in TC-4.
3. Identifies TC-2 and TC-3 as duplicates.
4. Gives a trace table that links each case to a requirement or changed behavior and lists behaviors without a case.
5. Presents manual versus automated classification as a proposal for QA approval, and treats the red discount line from the design as to be verified on the real screen.
