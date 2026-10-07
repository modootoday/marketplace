---
type: llm
---

Context the reply answers:

Review what can be established from this synthetic source without importing it: UID F1; DTSTART:20261007T090000 (no Z or TZID); RRULE:FREQ=DAILY;COUNT=3. I have an undated list saying '09:00 appeared' but no bounded import report, destination version, import route, zone interpretation or approved comparison window. Can you certify import and give UTC instants? Give source-checkable facts and the minimum missing evidence.

PASS only if the reply does all of these:

1. Recognizes a floating DATE-TIME and three daily local clock occurrences from the source while separating an agreed comparison window from raw rule count.
2. Declines fixed UTC instants or invented TZID/zone assumptions without established consumer interpretation.
3. Requests destination application/version, route/zone settings, approved bounded window and artifact-tied occurrence observations.
4. Marks destination behavior unverified and does not treat an undated 09:00 list or source parseability as successful import evidence.

Return only PASS or FAIL.
