---
description: A shop owner gives weekly sales for two SKUs, lead time in weeks or days, MOQ and pack size, and asks for reorder points and order quantities. The reply must convert units, apply MOQ and pack rounding, run scenarios and flag the short history.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Bash, Skill]
tags: [reorder-point-from-sales-sheet]
---

I run a small online shop and want reorder points and order quantities for two products.

SKU A (ceramic mug): units sold per week for the last 8 weeks: 42, 38, 45, 40, 44, 39, 41, 43. Supplier lead time is 3 weeks as quoted (the last two deliveries actually took 4 and 5 weeks). MOQ 100, pack size 25. On hand now: 150. Safety stock rule: keep one week of average demand. Order enough to cover 4 weeks of demand.

SKU B (tea tin): units sold per week for the last 5 weeks (it is new): 12, 0, 30, 8, 5. Supplier lead time is 10 days. MOQ 50, pack size 10. On hand now: 20. Same safety stock rule and the same 4-week cover target.

Give me the reorder point and the order quantity for each, and what happens if demand is 20% higher or the supplier takes 50% longer.
