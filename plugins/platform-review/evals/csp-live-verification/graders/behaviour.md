---
type: llm
---

PASS only if the reply does all of these:
1. Says to load the live page in a headless browser (or equivalent) and collect the CSP violations and network requests, not to write the policy from the source alone.
2. Allows the beacon script host in script-src and its report endpoint in connect-src, noting the report may go to a same-origin /cdn-cgi/ path that needs 'self'.
3. Rejects 'unsafe-inline' and keeps CDN-injected per-request inline snippets blocked unless the owner wants them.
4. Hashes the site's own inline script from the exact inlined text (ideally at build time) so the hash cannot drift.
5. Re-loads after deploying and confirms the beacon request succeeds and only deliberately blocked violations remain.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
