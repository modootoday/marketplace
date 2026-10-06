---
type: llm
---

Context the reply answers: a Cloudflare Worker that works locally but returns 500 deployed. Facts: compatibility_date 2022-03-01 with no nodejs_compat flag while the code imports node:crypto; STRIPE_KEY exists only in the git-ignored .dev.vars; the route "*.example.com/*" is a wildcard while another app lives at blog.example.com/*; the preview environment uses the same KV id a1b2c3 as production; observability with head_sampling_rate 1; the user has no dashboard access right now.

PASS only if the reply names all of these:
1. Missing nodejs_compat (or a compatibility flag) for the node:crypto import.
2. STRIPE_KEY is only in .dev.vars, which is not uploaded, so the deployed Worker may have no secret (it must be set with wrangler secret put).
3. The wildcard route would catch another app's paths (blog.example.com).
4. Preview and production share the same KV id.
