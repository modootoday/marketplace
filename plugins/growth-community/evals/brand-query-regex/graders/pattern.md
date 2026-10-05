---
type: llm
---

Context the reply answers: the user wants a Search Console regex query filter (Search Console uses RE2, which has no lookahead or lookbehind) for the brand "acme". Must include: "acme", "acme login", "acmee". Must exclude: "pacme" and "acme alternative".

PASS only if the reply does all of these:
1. Names the regex dialect as RE2 (or states that the filter cannot use lookarounds) before or with the pattern.
2. The pattern uses no lookahead, lookbehind or backreference, and the reply handles "acme alternative" with a second "doesn't match regex" filter or an alternation that lists the allowed forms, not with a negative lookahead.
3. The pattern does not match "pacme" (it is anchored at the start of the query or at a word boundary) and does match "acmee".
4. A hand-checked pattern, if shown, is consistent: traced against the three include examples and two exclude examples gives the stated results.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
