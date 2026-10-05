---
description: A discount rule changes its boundary and adds coupon stacking. The reply must map the change to cases, find gaps and duplicates.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [qa-change-test-mapping]
---

Update our test cases for this change.

Story R-12: "A 10% discount applies to orders over 50,000 KRW."

Code change (diff summary): the condition changes from `total > 50000` to `total >= 50000`, and a new rule lets one coupon stack with the discount (coupon applied after the 10% discount). Design mock-up says the discount line is shown in red under the subtotal.

Existing cases:
- TC-1: order 49,999 KRW, no discount.
- TC-2: order 60,000 KRW, 10% discount applied (54,000).
- TC-3: order 60,000 KRW, discount applied (54,000).
- TC-4: order 60,000 KRW with a 5,000 KRW coupon, expect checkout total 49,000? (author unsure of the expected value)
