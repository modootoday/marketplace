---
type: llm
---

Context the reply answers: the user pasted eight rows of watch data over two Monday-to-Sunday weeks. Week of 2026-09-14: four sessions, 32.3 km (5.0 + 8.2 + 5.1 + 14.0), 198 minutes (30 + 49 + 31 + 88); average heart rate is 147.25 bpm as a plain mean of the session values or about 146.5 bpm weighted by duration. Week of 2026-09-21: four sessions, 36.5 km (6.0 + 9.5 + 5.0 + 16.0), 225 minutes (36 + 58 + 30 + 101); average heart rate 148.75 bpm as a plain mean or about 148.0 weighted by duration. Distance rose 4.2 km, about 13 percent. The vendor fields are training_status (Productive, Maintaining, Unproductive, Detraining) and race_predictor_10k (48:10 at the end of week 1, 49:30 at the end of week 2).

PASS only if the reply does all of these:
1. Gives a weekly table with correct measured totals: 32.3 km and 198 minutes for the first week and 36.5 km and 225 minutes for the second, four sessions each, with the average heart rate rule stated (plain mean or duration-weighted).
2. Reports the week-over-week change in measured distance as an increase of about 4.2 km or 13 percent.
3. Keeps training status and the race predictor in their own column or section labelled as vendor estimates, separate from the measured columns.
