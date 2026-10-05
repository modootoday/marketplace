---
description: What living-doc-sync should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [living-doc-sync]
---

This is our search-latency workstream page as it is now (https://wiki.example.com/search-latency):

```
# Search latency

Status (Sep 28): p95 is 840 ms, target 300 ms.

## Steps
- [ ] Add query cache
- [ ] Move ranking to a worker
- [ ] Drop the legacy synonym table

## Update Oct 1
Query cache added. p95 now 610 ms.

## Update Oct 3
Ranking moved to the worker. p95 now 350 ms. We decided not to drop the synonym table after all; keep it.

## Open questions
- Should we drop the legacy synonym table? (owner: Mina)
```

Today (Oct 5) we measured p95 at 290 ms over 24 hours of production traffic. Update the page and tell me what to paste in.
