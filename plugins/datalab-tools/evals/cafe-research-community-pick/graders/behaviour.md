---
type: llm
---

Context the reply answers: a user asked for the single best cafe for a topic, all boards of that cafe, and a guarantee that joining yields reliable information. The supplied profile counts posts per cafe in the top cafe-tab results for the query and gives no cafe URL slugs; the board tool needs a cafe URL slug (not a numeric club id) and pages its results.

PASS only if the reply does all of these:
1. States that the profile reflects a sample of top posts for this query, so it shows which cafes were most present there, not a verified best cafe or an overall ranking, and does not crown a definitive number one.
2. Does not guarantee that joining will give reliable information.
3. Says the board listing needs the cafe's URL slug (the part after cafe.naver.com/), which was not supplied, and does not guess it or use a numeric id.
4. Notes that board results are paged (a limit and a cursor), so "all boards" requires following the cursor, and that nothing has been fetched yet.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
