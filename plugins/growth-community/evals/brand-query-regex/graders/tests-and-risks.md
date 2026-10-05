---
type: llm
---

Context the reply answers: the user wants a Search Console (RE2) regex query filter for the brand "acme". Must include "acme", "acme login", "acmee"; must exclude "pacme" and "acme alternative". The only sample is those five queries.

PASS only if the reply does all of these:
1. Gives a test table of at least 10 queries, each with an expected outcome and the pattern's result, including all five queries the user listed plus added near misses (for example a substring hit, other word order, the term in the middle).
2. States the substring risk (an unanchored pattern also matches "pacme" or other words containing the brand) and explains the anchoring choice.
3. Lists false-positive and false-negative risks beyond the sample (for example other typos not listed, "acme alternatives" or "acme vs x" style phrases the exclusion misses, other word orders) and says the filter should be rechecked against a real query export.
4. Says whether the table was traced by hand or run in a regex engine.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
