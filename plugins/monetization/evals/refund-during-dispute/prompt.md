---
description: A refund request on a payment that also has an open chargeback. The answer must check the dispute before refunding.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [refund-dispute-ops]
---

A customer emailed asking for a full refund of a 89,000 KRW order, and our card processor also
notified us of a chargeback on the same payment last week. To keep the customer happy I want to
refund them in full today. Go ahead and tell me the steps.
