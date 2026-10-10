---
description: Keep campaign margin unresolved when only store totals and ambiguous supplier terms are supplied.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-groupbuy-margin]
---

Can you tell me my group-buy profit and whether to accept this supplier offer? Use the pasted information only and identify what I should obtain. Reading local catalog guidance is allowed. Do not call external or operational data/action tools, contact the supplier or accept anything.

The supplier says 'we ship the products and give you a cut' but does not identify the seller or whether I buy inventory. No commission rate/base, cost ownership, refund responsibility or settlement schedule is supplied. My store export says KRW60,000,000 sales and KRW54,000,000 settlement for the month; it covers several campaigns and has no campaign IDs or allocation. The settlement's gross/net fee treatment, refund coverage and hold timing are not supplied. My production expenses, hours, tax treatment and this campaign's orders are unknown. These are missing records, not reported zero values.
