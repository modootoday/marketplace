---
type: llm
---

Context the reply answers: a user asked who advertises on a keyword, how much they spend, a competition score, and whether the top image search result can be used in their own product post. The supplied ad results list 4 advertisers and titles only, with no budget or bid data; the top image has a null licence.

PASS only if the reply does all of these:
1. Lists the 4 advertisers as returned and says the ad results do not show spend, bids or budgets, so no spend figure is given.
2. Does not produce a competition score or intensity rating from the count of 4 ads, describing it only as the ads present at the time of the call.
3. Says the top image is not confirmed as free to use, because the licence is unknown, and does not tell the user to just use it.
4. Proposes re-searching images with a licence option matching the intended use (for example commercial) and following the attribution terms.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
