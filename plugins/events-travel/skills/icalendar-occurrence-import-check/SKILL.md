---
name: icalendar-occurrence-import-check
description: Compare recurring iCalendar source identities, value types and time zones with bounded expected and observed imported occurrences. Use when an ICS import loses exclusions, shifts recurring times or mishandles a moved occurrence. Not for planning schedules, booking events or certifying an importer from parse success alone.
metadata:
  tier: open
  level: L3
  domain: planning
  install: optional
  keywords: [iCalendar, ICS, recurrence, EXDATE, RECURRENCE-ID, floating time, import verification]
---

# iCalendar occurrence import check

Check source encoding and destination observations separately. A valid serialization or proposed repair does not establish what an application imported. Work from supplied artifacts; do not claim an import you did not perform.

## Establish the bounded comparison

Record the ICS artifact identity, UID, DTSTART, duration/end, RRULE, RDATE, EXDATE, RECURRENCE-ID and exception components. Obtain the comparison window, destination application/version, import route, relevant zone settings and an occurrence report tied to that source artifact. Ask for missing evidence without inventing a successful destination result.

Build a value-type and zone ledger. Distinguish DATE, floating DATE-TIME, TZID-local DATE-TIME and UTC DATE-TIME. DATE is a calendar date, not midnight UTC. A floating time has no fixed UTC instant unless the consumer's interpretation is established. Resolve local offsets from the supplied VTIMEZONE or an identified zone definition for the dates in scope; a zone name without applicable transition evidence may be insufficient. Do not replace a recurring local wall time with a fixed UTC hour across an offset change.

## Compare identities and occurrences

1. Check recurrence inputs and value-type consistency. EXDATE must match DTSTART's value type; RECURRENCE-ID must match the original DTSTART type and identify the original occurrence. Report a source defect even if a destination happens to tolerate it. Do not conflate that defect with an observed client failure.
2. Enumerate only the agreed window using the supplied rule and zone evidence. Apply exclusions and additions without counting duplicates twice. Invalid generated dates and nonexistent local times are not ordinary occurrences; flag ambiguous transitions or unsupported rule interpretations rather than guessing. Keep the original DTSTART identity even if that occurrence is excluded.
3. For moved exceptions, retain the original recurrence identity and show the new scheduled start separately. A move changes the displayed date/time, not the occurrence's original RECURRENCE-ID. Flag RANGE or other exception semantics that cannot be settled from the supplied record.
4. Match expected and observed rows by UID and original occurrence identity where available, then compare displayed time, value type, zone and derived instant when meaningful. List missing, extra, shifted, duplicated and moved-identity discrepancies. If observations lack identity, mark the match provisional instead of equating similar clock strings.
5. Include an ordinary included occurrence as a positive control and an excluded occurrence as a negative check. A blank report, parse success or a repaired ICS alone cannot demonstrate that filtering/import worked. After a proposed fix, require fresh bounded observations from the named destination and exact repaired artifact.

## Output

- Source/type/zone ledger with artifact and environment identities.
- Expected-versus-observed table: UID, original recurrence identity, scheduled start, zone/offset or date/floating status, observation and finding.
- Minimal source repair proposal where justified, preserving unrelated events and identities.
- Scoped conclusion: source-checkable, matched in supplied observations, mismatch or unverified; list the next discriminating destination check.

For the recurrence contract, consult [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545), especially recurrence rules, RECURRENCE-ID and EXDATE. The [historical all-day serialization report](https://github.com/collective/icalendar/issues/349) concerns icalendar 4.0.9 and is closed; it does not establish a current importer defect or an AI failure. This skill's import comparison is a design derived from those contracts. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
