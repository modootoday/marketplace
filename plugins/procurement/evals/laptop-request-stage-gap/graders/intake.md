---
type: llm
---

Context the reply answers: the request text is "We need 20 laptops for the new team, ASAP, budget about 30k, Dana approved". The requisition stage needs cost center, spec and quote. The text gives no cost center, no spec, no delivery date ("ASAP" is not a date), and no quote; the approval by Dana is stated in the request text and the record says approved.

PASS only if the reply does all of these:
1. Preserves the original request text verbatim.
2. Lists cost center, spec, quote and a needed-by or delivery date as missing, phrased as questions for the requester.
3. Treats Dana's approval as claimed in the request text (and recorded as approved), not independently verified.
