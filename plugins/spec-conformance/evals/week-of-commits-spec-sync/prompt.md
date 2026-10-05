---
description: What spec-incremental-sync should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [spec-incremental-sync]
---

Our specs live in docs/spec/ and were last synced at commit 9f1c2aa. Since then these commits landed:

- 3d4e5f6 "refunds: allow partial refunds up to 3 per order" (changes src/refunds/policy.ts: maxRefundsPerOrder 1 -> 3)
- 7a8b9c0 "chore: prettier"
- b1c2d3e "orders: rename OrderState.CANCELLED to OrderState.VOIDED"
- e4f5a6b "auth: session TTL 24h -> 8h" (src/auth/session.ts)

docs/spec/refund-policy.md says: "An order may be refunded once; a second refund request is rejected." docs/spec/sessions.md says sessions last 24 hours. Several docs mention CANCELLED.

My plan: grep docs/spec for every identifier changed in the diffs and replace old with new. Write me the procedure you would follow instead, or confirm mine.
