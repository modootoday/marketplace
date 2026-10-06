---
type: llm
---

Context the reply answers: a resolution notice in Korean for a payment outage. Facts: domestic card payments failed or were delayed from 14:05 to 15:12 KST on 2026-10-06; overseas cards and bank transfer were unaffected; payments that failed but were authorised by the card issuer are cancelled automatically within 3 business days (confirmed by the customer-support lead); the internal cause note names "pay-gw-v3 consumer lag"; an unconfirmed engineer guess blames the card processor PayHub; a permanent fix "around Friday" is not confirmed; a detailed report will be on the blog by 2026-10-13 (confirmed).

PASS only if the notice:
1. States what was affected, the start and end time with the timezone (KST), and that it is resolved.
2. Tells users what to do or not do (for example no action needed for the auto-cancel within 3 business days, check the card statement if still charged after that) and says where the fuller report will appear with its date (by 2026-10-13).
3. Contains none of: the internal component name "pay-gw-v3", the vendor name PayHub as a cause, a speculated cause, or the Friday fix promise.
