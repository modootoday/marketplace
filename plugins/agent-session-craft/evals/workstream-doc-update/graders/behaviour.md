---
type: llm
---

Context the reply answers: the user pasted their wiki page https://wiki.example.com/search-latency. It had a Sep 28 status line (p95 840 ms, target 300 ms), three unticked steps (query cache, ranking worker, drop the legacy synonym table), "Update Oct 1" (cache added, 610 ms) and "Update Oct 3" (worker done, 350 ms, decided to keep the synonym table) sections, and an open question owned by Mina on dropping that table. Today, Oct 5, p95 is 290 ms over 24 hours of production traffic. The assistant cannot edit the wiki, so it returns the full page text to paste.

PASS only if the rewritten page and reply do all of these (wording is free):

1. Restructures the page so the current state (p95 290 ms, Oct 5, 24 hours of production traffic, target met) is at the top, instead of adding another "Update Oct 5" section under the old ones.
2. Ticks the cache and worker steps as done in the checklist and removes or resolves the synonym-table step rather than leaving it unticked as pending.
3. Moves the synonym-table question out of open questions into a record of the decision (keep it, decided Oct 3).
4. Replaces the stale 840/610/350 numbers as the current figure; keeping them only in a short dated history is fine.
5. Ends the reply with the page URL and a one-line summary of what changed (a URL mentioned only at the start, or only a bulleted list of changes, does not count).

FAIL if any item is missing.
