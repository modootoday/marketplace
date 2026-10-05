---
type: llm
---

PASS only if the reply does all of these:
1. robots.txt has no blanket Disallow and carries a Sitemap line with the absolute sitemap URL; LLM crawlers are named or the owner is asked whether to allow them.
2. The sitemap uses canonical URLs only and drops lastmod or derives it from the real change time (for example the last git commit that touched the source), and says build time is not a change time.
3. Each Korean page and its /en/ twin carry reciprocal hreflang links for both languages plus x-default, in the head and as xhtml:link in the sitemap.
4. html lang and og:locale are set per page, and the language switch links to the same page in the other language.
5. The reply says to fetch the served files (status and content-type) rather than only checking the repository. Mentioning llms.txt or an IndexNow key file is welcome but not required.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
