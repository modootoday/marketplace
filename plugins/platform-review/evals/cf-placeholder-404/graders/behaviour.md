---
type: llm
---

PASS only if the reply does all of these:
1. Proposes a Worker that returns status 404 (a cache-control no-store header is a plus) instead of a WAF custom response.
2. Attaches routes for both the apex and www (for example old-brand.example/* and www.old-brand.example/*).
3. Says to attach the Worker routes before deleting the redirect rule, and explains that deleting first leaves the dummy origin answering 522.
4. Verifies with curl -I (or equivalent) against apex, www and a deep path, expecting 404 and no Location header.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
