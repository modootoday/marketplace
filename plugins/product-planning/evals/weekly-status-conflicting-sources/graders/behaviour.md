---
type: llm
---

Context the reply answers: the user asked for a weekly status for 2026-09-28 to 2026-10-04 from pasted material only: tracker says PROJ-12 "Export to CSV" is Done, closed Wednesday 2026-09-30 by Lee; the dev channel on Tuesday 2026-09-29 (Min) said "export is still failing in staging"; tracker epic E-4 was created 2026-09-01 with 8 stories and three were added on 2026-09-18, so it now has 11. The user could not export the repository's merge history or the release calendar this week.

PASS only if the reply does all of these:
1. Flags PROJ-12 as a conflict between systems (ticket Done on 2026-09-30, channel failure on 2026-09-29), shows both statements with source and date, and does not list it as plainly done; it asks who can confirm the fix in staging.
2. Reports the epic E-4 growth from 8 to 11 stories with when it happened (three added on 2026-09-18).
3. States the window (2026-09-28 to 2026-10-04) and the sources used (tracker, dev channel).
4. Names the unavailable sources (repository merge history, release calendar) and says what stays unverified because of them, for example whether the export was deployed.
5. Gives each status item its ticket id or message source and date, and uses sections that separate done, in progress, blocked or slipped without inventing items beyond the three facts given.
