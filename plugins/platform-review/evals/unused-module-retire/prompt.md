---
description: What dead-code-keep-or-retire should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [dead-code-keep-or-retire]
---

knip reports these as unused in our Node service:

- src/jobs/reindex-search.ts (exports `run`)
- src/handlers/legacy-webhook.ts (exports `handle`)
- src/lib/backoff.ts (a well-tested retry helper with jitter, 200 lines, no importers since we moved to a library)

Our job runner loads jobs with `await import(\`./jobs/${name}.ts\`)` where `name` comes from config/schedules.yaml, and our router maps paths to handler files from routes.json. Can I just delete all three in one commit?
