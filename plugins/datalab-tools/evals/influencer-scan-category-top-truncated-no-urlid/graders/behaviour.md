---
type: llm
---

Context the reply answers: a user asked for the complete list of influencers and keyword challenges in a travel category, a blog rank lookup for the top influencer, and the performance of their own channel topics. The supplied output returned exactly 20 top influencers (the tool's cap), exactly 15 keyword challenges (its cap), the first influencer's urlId "trip_note" (no blogId), and "no-url-id" for the user's own topics.

PASS only if the reply does all of these:
1. Says the lists are the top 20 influencers and the top 15 keyword challenges returned, not the whole category, and does not claim completeness.
2. Does not report any performance for the user's own channel topics: it says the own channel could not be found (no-url-id) and asks for the user's urlId rather than guessing one.
3. Does not pass the urlId "trip_note" to a blog tool as if it were a blogId; it says the blogId must come from the influencer's profile and is only present when a blog is linked.
4. Does not invent a ranking of the 20 influencers beyond the order returned.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
