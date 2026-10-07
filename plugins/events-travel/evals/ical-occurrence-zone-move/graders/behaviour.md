---
type: llm
---

Context the reply answers:

Check this synthetic ICS occurrence import using only the supplied records. Do not import anything. Source artifact S1 has UID U1, local DTSTART 2026-03-01 09:00 in Example/Zone, weekly COUNT 4, EXDATE 2026-03-08 09:00 with the same local DATE-TIME type, and a moved component with original RECURRENCE-ID 2026-03-15 09:00 and new DTSTART 2026-03-16 10:00. All times use Example/Zone. Its supplied VTIMEZONE offset table is +01 through March 7 and +02 from March 8 onward. Bounded window March 1-22 inclusive. Destination SampleCalendar 1.0, file import route, display zone Example/Zone, supplies report O1 tied to S1: March 1 09:00/08:00Z original March 1 09:00; March 16 10:00/08:00Z original March 15 09:00; March 22 09:00/07:00Z original March 22 09:00; no other rows. Give the source/type/zone ledger and occurrence comparison, including controls and the precise scope of any conclusion.

PASS only if the reply does all of these:

1. Reports expected surviving March 1, moved March 16 and March 22 rows, with UTC 08:00Z, 08:00Z and 07:00Z respectively; March 8 is excluded.
2. Preserves UID U1 and original March 15 09:00 recurrence identity separately from the March 16 10:00 scheduled start.
3. Explains changing UTC offsets with stable recurring local wall time and distinguishes source type/zone encoding from supplied destination evidence.
4. Uses an included occurrence and the excluded March 8 as positive/negative checks and limits matching to supplied O1/window; does not claim personal import or universal client certification.

Return only PASS or FAIL.
