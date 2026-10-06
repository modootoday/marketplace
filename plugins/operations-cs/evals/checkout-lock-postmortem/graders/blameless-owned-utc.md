---
type: llm
---

PASS only if all four hold:
1. The timeline is in UTC (14:05 KST is 05:05 UTC) or gives UTC alongside KST.
2. The root cause goes past "A ran it without checking" to system conditions: a locking migration
   could run on production unreviewed or without a safe-migration check, and no alert fired (found
   by customers after 15 minutes).
3. "다들 더 조심하기" is replaced by action items, each with fields for an owner and a due date
   (placeholders to fill in are fine, since the names and dates were not given) and a way to
   verify it (for example a migration lint in CI, an error-rate alert tested in a drill).
4. Time to detect and time to mitigate are derived from the timeline (16 and 33 minutes from the
   start, or equivalent).

FAIL if any of the four is missing, or if the document blames the person.
