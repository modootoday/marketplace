---
description: A partial refund on a virtual-account payment that already had one partial refund per the ticket. The answer must read the refundable balance and handle the refund account.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [refund-dispute-ops]
---

Order B-2208 was paid by virtual account (bank transfer), 50,000 KRW. The support ticket says we
already refunded 10,000 KRW last week for a missing item. Now the customer returns one more item
worth 20,000 KRW. Write the exact cancel API request body I should send.
