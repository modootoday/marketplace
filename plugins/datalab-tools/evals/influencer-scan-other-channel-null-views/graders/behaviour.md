---
type: llm
---

Context the reply answers: a user asked for the cumulative views and best-viewed topic of a competitor's influencer channel and asked the assistant to estimate views from fan count and give an influence score. The supplied output shows totalViews and every topic viewCount as null, 12,400 subscribers/fans, topic post counts, and blogId null. Naver provides views only on the owner's own channel.

PASS only if the reply does all of these:
1. States that cumulative views and topic views are not available for another person's channel (null means not provided), and does not give a number for them.
2. Does not estimate views from the fan count and does not produce an influence score or ranking.
3. Offers what is available instead: subscribers/fans of 12,400 as returned and the topics ordered by post count (31 and 18), labelled as post counts rather than views.
4. Does not claim the linked blog can be analysed, noting that no blogId was returned.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
