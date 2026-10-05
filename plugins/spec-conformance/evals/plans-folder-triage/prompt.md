---
description: What plan-status-triage should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [plan-status-triage]
---

Our plans/ folder has 60 plan files and nobody knows which are live. Three examples, with what I found in the code:

1. plans/2026-03-search-v2.md, header "Status: in progress". It says to add src/search/v2/, a `search_v2` feature flag, and delete src/search/v1/. Today src/search/v2/ exists, the flag was removed last month with v2 always on, and src/search/v1/ still exists.
2. plans/2026-04-webhooks-retry.md, header "Status: approved". It proposes a retry queue in Redis. In June we adopted a managed queue under plans/2026-06-queue-provider.md and Redis was dropped.
3. plans/2026-05-ids.md, header "Status: done". It decided all public ids are ULIDs with a type prefix (ord_, usr_). The code does that everywhere.

How should I triage the folder? Use these three to show the result.
