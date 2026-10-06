---
type: llm
---

Context the reply answers: a shop owner gave SKU A weekly sales 42, 38, 45, 40, 44, 39, 41, 43 (average 41.5 per week, about 5.93 per day), lead time 3 weeks (21 days), MOQ 100, pack size 25, on hand 150, safety stock one week of average demand (41.5), target cover 4 weeks. Reorder point for A is about 166 (5.93 x 21 + 41.5). Four weeks of demand is 166, which rounds up to 175 with pack size 25 (above the MOQ of 100). SKU B has weekly sales 12, 0, 30, 8, 5 (average 11 per week, about 1.57 per day), lead time 10 days, MOQ 50, pack 10, on hand 20. Reorder point for B is about 27 (1.57 x 10 + 11); four weeks of demand is 44, which rounds up to the MOQ of 50.

PASS only if the reply does all of these:
1. Shows the unit conversion for lead time (3 weeks as 21 days, or the demand as per week against 3 weeks) and does not multiply weekly demand by a lead time in days, or daily demand by weeks.
2. Gives a reorder point near 166 for SKU A and near 27 for SKU B (a stated safety-stock variant within about 10% is acceptable) with the safety-stock rule named.
3. Rounds the order quantity up to the MOQ and pack size: about 175 for A and 50 for B, and notes the surplus over the 4-week target or that B is lifted to its MOQ.
4. Gives reorder points for the demand +20%, lead time +50% scenarios for both SKUs, each higher than the base case.
