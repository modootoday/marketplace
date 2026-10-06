---
description: What incident-postmortem should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [incident-postmortem]
---

Write the postmortem for the 2026-10-03 search outage. Sources I collected:

- Alert log (UTC): 02:14 "search-api 5xx > 5%" fired.
- Deploy log (UTC): 02:02 v412 of search-api deployed; 02:51 rollback to v411 completed.
- Incident chat (Pacific time, UTC-7): 7:30 PM "customers are reporting empty results"; 7:55 PM "rolled back, watching"; 8:40 PM "looks fine now".
- Status page (KST, UTC+9): "Investigating" posted 11:35 KST, "Resolved" posted 11:40 KST (same calendar day as the alert in KST).
- Support: 214 tickets mention empty search results; the first ticket was at 02:20 UTC. We have no request logs between 02:02 and 02:14 UTC.
- Cause as the team sees it: the engineer who deployed v412 did not run the index migration, so queries hit an empty index. Proposed actions: "retrain the on-call engineer", "be more careful with deploys".
