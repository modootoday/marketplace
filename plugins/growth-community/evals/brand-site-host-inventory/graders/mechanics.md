---
type: llm
---

Context the reply answers: the same submission task, headless CI, with DNS writable.

PASS only if the reply:
1. Uses a service account (not a personal login) that gets no project IAM roles and enables the Search Console and Site Verification APIs.
2. Proves ownership with a DNS TXT record via the Site Verification API for a domain property (sc-domain:brandkorea.example), confirms the record from a public resolver before verifying, then submits the sitemap with the PUT sitemaps endpoint (not the retired ping).
3. Says that a submitted sitemap is not the same as indexing: it reports what was submitted and that coverage shows up later.
