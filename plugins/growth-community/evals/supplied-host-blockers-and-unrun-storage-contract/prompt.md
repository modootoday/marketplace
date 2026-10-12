---
description: Additional positive hosted-site-prelaunch-smoke coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [hosted-site-prelaunch-smoke, coverage-20261012]
---

Triage a synthetic hosted smoke packet, no network/write access. GET https://example.invalid/.env returns 200 with a redacted key marker; POST/inquiry accepts signed-out requests with no size/rate/origin check; page analytics fires before consent. /detail/7 refresh 404; UI inquiry says success but no stored record/inbox evidence. Owner hours 9-17,page says 9-19. Record requests/results, blocker order, fixes/owners/no-go, unknowns and re test. Treat CORS as insufficient protection; no real key is supplied or rotation performed.
