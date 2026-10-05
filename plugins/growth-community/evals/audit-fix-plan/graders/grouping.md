---
type: llm
---

Context the reply answers: an audit export lists 40 duplicate-title URLs (3 are the paginated /blog/page/2 to /page/4; 37 are product pages whose title template omits the product name), 25 redirect-chain URLs and 12 pages with 404 internal links. The only content supplied is /guide/setup (paragraph 3: "Create your API keys before the first sync") and the live page /docs/api-keys. The user asked for a fix plan and an extra link from /guide/setup to /pricing, but no /pricing page or sentence about pricing was supplied.

PASS only if the reply does all of these:
1. Splits the duplicate titles by cause (3 pagination titles versus 37 product-template titles) with those counts, and gives a different fix for each group rather than one fix for all 40.
2. Gives a fix per issue type (redirect chains, 404 internal links) with its affected count, and orders or prioritises the work by affected count or by whether the pages are meant to be indexed.
3. Does not apply a blanket action to a mixed group (for example noindex or redirect on all 40 duplicate titles).

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
