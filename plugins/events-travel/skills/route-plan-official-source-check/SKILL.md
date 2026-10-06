---
name: route-plan-official-source-check
description: Plan or audit a transit commute or a hiking route under stated closures by checking every segment, station and transfer against the official sources the user supplied, excluding closed lines, and marking everything unchecked as unverified. Use when someone asks for a route, a commute around a closed line, or a hike and the answer could name wrong stations, closed lines or misplaced mountains. Not for live delays, timetables, fares or entry rules the user did not paste, or for presenting an unchecked route as an instruction.
metadata:
  tier: open
  level: L2
  domain: travel
  install: optional
  keywords: [route plan, transit closure, transfer check, hiking route, official notice, unverified]
  verified-runtimes: [claude-code]
---

# Route plan with official-source check

Models name plausible stations, reuse a line the user said is closed, and place mountains in
the wrong area. Official sources decide: operator maps and timetables, government or park
advisories. This skill does not replace them.

## Steps

1. List the stated closures first, quoting the notice if one was pasted, and the pasted
   network facts (lines, stations, transfers). Anything not pasted is unknown.
2. Build each candidate route as a segment table: from, to, line or trail, source (the
   pasted line or notice, or "none"), status (checked, unchecked).
3. Re-read the closures against the finished table: no segment may use a closed line or a
   station it serves. Every transfer must appear in the pasted network as a transfer; if
   not, mark it unverified rather than assuming it.
4. For a hike, name the mountain, its area and its elevation only if a pasted source gives
   them. Otherwise say the place and elevation are unchecked and point to the official map
   or land manager to confirm trailhead, connection and conditions.
5. Give no times, fares, frequencies or entry rules beyond what the user pasted. Live status
   (delays, shuttle runs, trail closures) is always unverified here.
6. Close with a label: "checked against what you pasted" or "unverified", and the list of
   segments to confirm on the operator's site or the official map before leaving.

## Never

- Present an unchecked route as an instruction or as final.
- Invent a station, transfer, trail or elevation.
- Include a closed line, or call a replacement service running without a pasted source.
- Treat a missing source as confirmation.

The neighbour `traveler-fit-shortlist` picks which option; this checks that a route is valid.
