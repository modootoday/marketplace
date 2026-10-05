---
type: llm
---

Context the reply answers: the user is in Seoul (KST, UTC+9) and the show is in Berlin; the kit's default deadline time is 23:59 CET (UTC+1), so 23:59 CET is 07:59 KST the next day (eight hours ahead), and 12:00 noon CET is 20:00 KST the same day. The user supplied this offset, and nothing else about daylight saving or other zones.

PASS only if the reply does all of these:
1. Shows both the document time (CET) and the KST conversion for the dated deadlines it converts, using the eight-hour offset, with the date rolling to the next day for 23:59 CET (for example March 5 23:59 CET is March 6 07:59 KST).
2. States that the CET time is the document's own and that the converted time is derived from the offset the user gave, not from the kit.
3. Writes the zone label (CET or KST) next to every clock time it shows, including each converted KST time, and says where the zone is only the kit's default or an assumption (the v2 noon deadline states a time but no zone). A date the kit gives with no clock time (such as "until March 11") is flagged as having none, and any conversion offered for it is labelled conditional.
