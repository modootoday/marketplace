---
type: llm
---

Context the reply answers: how to get www.brandkorea.example into Google Search Console from a headless CI server. Facts: DNS for brandkorea.example is writable by the pipeline; hosts are www, shop, docs (public), admin and api (login only), status (a vendor-run page); the sitemap lists http:// URLs without lastmod; /pricing carries meta noindex; robots.txt has no Sitemap line.

PASS only if the reply:
1. Lists the other public hosts (shop and docs) in a host inventory instead of silently handling only www (submitting them now, or listing them as not submitted, are both fine), and keeps admin and api out of the sitemaps and the index.
2. Says to fix the site before submitting: absolute https canonical URLs in the sitemap, remove the staging noindex on /pricing (or drop that page from the sitemap), and add the Sitemap line to robots.txt.
