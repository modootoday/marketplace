---
type: llm
---

Context the reply answers: a user asked where their blog ranks for a keyword, whether the rank stays stable and is identical on other people's screens, and whether not being found means a low-quality penalty. The supplied rank check returned found false for blogId mycamp_blog, checked over the blog tab and the top of the integrated results.

PASS only if the reply does all of these:
1. Reports the result as "not found in the checked part of the results at the time of the call" and does not invent a rank number.
2. States that the check does not show the rank is stable over time or the same on other users' or devices' screens.
3. Says not-found does not prove a low-quality penalty or non-indexing, and does not diagnose a penalty from this result.
4. Names which blog (mycamp_blog) and which keyword were checked, and proposes re-checking later or reading the top posts (for example with a pattern analysis) instead of promising a rank improvement.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
