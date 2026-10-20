---
type: llm
---

Context the reply answers: a user asked whether cafe content on a keyword is saturated, whether it grew since last year, and how many new posts appeared this month. The only data is a single total document count for the keyword.

PASS only if the reply does all of these:
1. Quotes the figure as returned (18420 documents, a total count) and says it is a total without a period, so it cannot show growth versus last year or this month's new posts.
2. Does not invent a year-over-year change or a monthly count, and does not present a saturation verdict as measured; it frames saturation as the user's judgement from the number plus other evidence.
3. Proposes a next step that is supported by cafe tools, such as profiling which cafes dominate the top posts and how fresh they are, and says that profile is a sample of top posts, not a monthly count.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
