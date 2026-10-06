---
description: What cf-worker-binding-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cf-worker-binding-review]
---

Our Worker works with `wrangler dev` but returns 500 after deploy. Here is what I can see, I have no dashboard access right now.

```toml
name = "orders-api"
main = "src/index.ts"
compatibility_date = "2022-03-01"
routes = ["*.example.com/*"]

[vars]
ENVIRONMENT = "production"

[[kv_namespaces]]
binding = "CACHE"
id = "a1b2c3"

[env.preview]
[[env.preview.kv_namespaces]]
binding = "CACHE"
id = "a1b2c3"

[observability]
enabled = true
head_sampling_rate = 1
```

`src/index.ts` imports `node:crypto` and reads `env.STRIPE_KEY`. `.dev.vars` (git-ignored) contains STRIPE_KEY. Another app of ours lives at `blog.example.com/*`.
