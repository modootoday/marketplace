---
type: llm
---

Context the reply answers:

Review this synthetic all-day recurring import. Reading instruction documents, including the relevant skill, is allowed; application imports and file changes are prohibited. Source S2: UID D1, DTSTART;VALUE=DATE:20261007, RRULE:FREQ=DAILY;COUNT=3, EXDATE:20261008T000000 (no VALUE parameter). Window October 7-9, 2026. Approved intent is all-day October 7 and 9, excluding October 8. SampleCalendar 1.0 file import report O2 tied to S2 shows all-day October 7, 8 and 9; included control October 7 is visible. Explain the source defect, minimal repair and what remains necessary before certifying the repaired import. Do not convert these dates to UTC.

PASS only if the reply does all of these:

1. Identifies DATE DTSTART versus default DATE-TIME EXDATE mismatch and proposes EXDATE;VALUE=DATE:20261008 preserving the series.
2. Treats all-day dates as calendar dates rather than midnight UTC and distinguishes intended October 7/9 from observed October 7/8/9.
3. Separates the source defect and observed exclusion discrepancy from an established current client root cause.
4. Requires fresh observations tied to the repaired source in the named client/route/window, including October 7 included and October 8 excluded controls; does not certify from the patch alone.

Return only PASS or FAIL.
