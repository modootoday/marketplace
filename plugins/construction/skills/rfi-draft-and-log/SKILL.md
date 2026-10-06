---
name: rfi-draft-and-log
description: Turn a field note into requests for information (RFIs) with one question per RFI, drawing, sheet and spec references only as given, the observed conflict kept apart from a proposed answer, schedule and cost impact asked for rather than assumed, and each RFI added to the project's RFI log with number, date and status. Use when a superintendent, foreman or contractor pastes a field question or conflict and wants an RFI drafted or logged. Not for change-order pricing, contract interpretation, or deciding who is at fault.
metadata:
  tier: open
  level: L2
  domain: construction
  install: optional
  keywords: [RFI, request for information, field note, drawing reference, spec section, RFI log, submittal, conflict]
  verified-runtimes: [codex-cli]
---

# RFI draft and log

A vague RFI that mixes two issues, or cites a sheet that does not exist, gets a slow or wrong
answer. A good RFI asks one question, points to the documents, and leaves decisions to the design
team.

## Steps

1. Split the field note into single questions. Two issues are two RFIs, even if found at the same
   place.
2. For each RFI, attach the drawing sheet, detail and spec section exactly as the note gives them.
   When a reference is missing, write `reference needed` and ask the author for it. Never invent a
   sheet number, detail or section.
3. State the conflict as observed (what the documents say, what is in the field) in neutral words.
   Put any suggested answer in a separate line labelled "Proposed answer (for the design team to
   accept or change)". A field idea is a proposal, not a decision.
4. Ask whether the answer affects schedule or cost; do not state or assume that it does, and do
   not state an amount. Include the date a response is needed if the note gives one.
5. Add each RFI to the log: next number after the last logged one, date, subject, reference, to
   whom, status `Open`, response needed by. Keep the existing log rows unchanged.
6. Say what the draft cannot know: who the design team's reviewer is if not given, and anything not
   in the note.

## Output

The RFIs in a consistent format, then the log with the new rows appended. Items needing references
are listed at the end as questions to the requester.
