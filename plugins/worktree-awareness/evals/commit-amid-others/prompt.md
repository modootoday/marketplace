---
description: A dirty shared tree with someone else's files and a lockfile change. The commit must name only its own paths.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [shared-checkout]
---

Another agent session is working in this same checkout. `git status` shows:

```
 M src/billing/invoice.ts      <- mine
 M src/billing/invoice.test.ts <- mine
 M src/auth/session.ts
 M src/auth/session.test.ts
?? src/auth/refresh.ts
 M bun.lock
```

I only changed the two billing files and added no dependency. Give me the exact git commands to
commit my work, and say what to do about the rest.
