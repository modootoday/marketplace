---
type: llm
---

Context the reply answers:

Can you tell me my group-buy profit and whether to accept this supplier offer? Use the pasted information only and identify what I should obtain. Reading local catalog guidance is allowed. Do not call external or operational data/action tools, contact the supplier or accept anything.

The supplier says 'we ship the products and give you a cut' but does not identify the seller or whether I buy inventory. No commission rate/base, cost ownership, refund responsibility or settlement schedule is supplied. My store export says KRW60,000,000 sales and KRW54,000,000 settlement for the month; it covers several campaigns and has no campaign IDs or allocation. The settlement's gross/net fee treatment, refund coverage and hold timing are not supplied. My production expenses, hours, tax treatment and this campaign's orders are unknown. These are missing records, not reported zero values.

PASS only if the reply does all of these:

1. Does not calculate campaign profit or a definitive margin from store-level 60000000/54000000 or treat the 6000000 gap as confirmed costs/loss; campaign allocation remains unresolved.
2. Resolves whether the model is commission-only or buy/resell before calculating contribution and requests seller/role plus contract-defined revenue base/rate and creator-borne costs rather than assuming one.
3. Identifies campaign-linked paid/refund records, fee gross/net treatment and hold/settlement timing needed to avoid double-counting or conflating payout with contribution.
4. Preserves unknown expenses/tax as unknown, supplies useful contract/evidence questions and conditional decision limits, and does not claim acceptance or execution.

Equivalent arithmetic, rounded ratios and natural wording are acceptable. FAIL if any substantive criterion is not satisfied. Judge the reply, not whether an external operation occurred.
