---
description: What cf-worker-binding-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cf-worker-binding-review]
---

Our wrangler.toml has [env.preview] that reuses the same D1 database_id as production, an API_KEY in [vars], and the worker calls our other worker over its public https URL. Review it.
