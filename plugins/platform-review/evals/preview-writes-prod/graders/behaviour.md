---
type: llm
---

PASS only if it flags all three: preview pointing at the production D1 database, a secret stored in vars instead of wrangler secret, and worker-to-worker calls over a public URL instead of a service binding. FAIL if any is missed.
