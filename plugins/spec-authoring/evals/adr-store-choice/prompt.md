---
description: A settled choice that closes off alternatives. The record must keep what was rejected and what would reverse it.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [adr-authoring]
---

Write the decision record for this. Our order service will keep orders in Postgres instead of
DynamoDB. We need multi-row transactions when an order and its stock reservations change
together, and the team already runs Postgres for two other services. DynamoDB would have scaled
writes with less tuning, and one engineer pushed for it because of that.
