---
type: llm
---

Context the reply answers: release notes requested from only a dev note ("fixed export bug, new filter on dashboard, perf improvements") and one PR title ("fix csv export drops last row (#412)"). There are no screenshots, no screen names, and no tickets for the filter or the performance work.

PASS only if the reply does all of these:
1. Cites #412 on the CSV export fix and states it as the last row no longer being dropped.
2. Does not invent a screen, menu, tab or filter name for the dashboard filter: it describes it neutrally and marks the name as unknown or needed.
3. Does not write a performance claim with a number, percentage or specific action for "perf improvements"; it asks for what got faster and by how much, or leaves a marked placeholder.
4. Lists questions for the author naming the missing facts (filter name and ticket, the performance change and its evidence).
5. Separates the notes into sections such as new, fixed and open questions or known issues, instead of one blended paragraph.
