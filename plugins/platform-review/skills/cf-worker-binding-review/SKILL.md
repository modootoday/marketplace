---
name: cf-worker-binding-review
description: Review a Cloudflare Workers project's bindings and configuration - service bindings instead of public URLs between workers, secrets as secrets not vars, environments that do not share production resources, compatibility date and flags, routes, observability and limits - before deploy. Use when reviewing or changing wrangler.toml or wrangler.jsonc, adding a binding, KV, D1, R2, queue or durable object, or debugging a worker that works locally but not deployed. Not for writing the worker's business logic.
metadata:
  tier: open
  level: L3
  domain: edge-platform
  install: optional
  keywords: [Cloudflare Workers, wrangler config, service binding, secrets, D1, KV, R2, review]
  verified-runtimes: [codex-cli]
---

# Reviewing a Worker's bindings and config

Most Worker incidents are configuration: a preview environment writing to the
production database, a secret committed as a plain var, a worker calling another
over the internet with a shared key.

## Check each binding

| Kind | Look for |
| --- | --- |
| Service binding | used for worker-to-worker calls instead of fetching a public URL; target and entrypoint named |
| Secrets | set with `wrangler secret`, never in `vars` or the repository; local values only in `.dev.vars`, git-ignored |
| KV, D1, R2, queues, durable objects | each environment points at its own resource ids; preview never at production |
| Vars | non-secret only, and the same names across environments |

## Configuration

- `compatibility_date` recent and deliberate; flags (such as Node.js
  compatibility) only when the code needs them.
- Routes and custom domains match the intended zone; no wildcard that catches
  another app's paths.
- Observability: logs and traces configured to what you need; turn verbose
  invocation logging on only while debugging.
- Limits: CPU time and subrequest counts for the plan, especially for fan-out.

## Works locally, fails deployed

Compare the binding ids and secrets present in the deployed environment
(`wrangler secret list`, the dashboard) with local `.dev.vars` and the config;
check the compatibility date and flags; read the deployed logs for the request.

## Output

A table: setting, finding, risk, fix. Separate what you verified in the files
from what needs the dashboard or the API.
