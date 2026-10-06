---
type: llm
---

Context the reply answers: a shop owner asked for reorder points for SKU A (8 weeks of steady sales) and SKU B (a new tea tin with only 5 weeks of sales: 12, 0, 30, 8, 5, with a zero week and a spike). SKU A's supplier quotes 3 weeks but the last two deliveries took 4 and 5 weeks. SKU B is on hand 20, below its reorder point of about 27.

PASS only if the reply does all of these:
1. Flags SKU B as low confidence because of its short history, the zero week or the uneven weeks, and says what more history or information would be needed, while still giving a number.
2. Does not present the reorder points as a forecast of future demand; it says they are arithmetic on the sales given and lists the assumptions the owner must confirm (both the safety-stock rule and the lead time used, each stated explicitly).
3. Notes that SKU A's quoted lead time (3 weeks) is shorter than its last two actual deliveries (4 and 5 weeks), and shows or states that the reorder point at the observed lead time would be higher (about 207 at 4 weeks, about 249 at 5 weeks with the same one-week safety stock).
4. Notes that SKU B's on-hand stock (20) is below its reorder point, so it is already due, and that SKU A (150 on hand) is below its reorder point of about 166 as well.
