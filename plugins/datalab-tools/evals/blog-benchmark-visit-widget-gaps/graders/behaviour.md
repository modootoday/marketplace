---
type: llm
---

Context the reply answers: a user asked how fast a public competitor blog is growing, asked for a one-month visitor forecast, and asked whether a lower count today than yesterday means a decline. The visitor series comes from the blog's public widget and has no row for 2026-10-16; the today count was read at 11:20 in the morning, so the day is unfinished.

PASS only if the reply does all of these:
1. Reports the series with its dates and numbers as supplied and names the missing 2026-10-16 as a gap, without filling it with zero, an average or an estimate.
2. States that the series rests on a public widget and so may be incomplete, and does not compute a growth percentage presented as exact.
3. Declines to forecast next month's visitors, saying no tool gives a basis for it.
4. Says that today's 310 is a partial day and cannot be compared with a full day to call a decline.
5. Says these are public figures about another blog and not that blog's private statistics.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
