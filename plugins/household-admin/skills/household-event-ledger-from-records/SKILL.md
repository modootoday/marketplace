---
name: household-event-ledger-from-records
description: Turn pasted service emails, appointment notes or family messages into a dated ledger with one row per event, classified completed, scheduled or cancelled, each row quoting its source line, with unknown dates and reasons kept unknown, conflicting records shown side by side, and next-due dates computed only from an interval the user or manufacturer text states, with the calculation shown. Use when someone asks what was done when, what is due next, or why something was bought, from records they paste. Not for extracting commitments to act on (email-history-commitment-mining), for deciding what maintenance is needed, or for medical, legal or financial conclusions.
metadata:
  tier: open
  level: L2
  domain: household-admin
  install: optional
  keywords: [service history, ledger, maintenance emails, next due date, appointment log, family care log]
  verified-runtimes: [claude-code]
---

# Household event ledger from records

The ledger holds what the pasted records say and nothing else. It cannot know what happened
outside them.

## Steps

1. Number the records as pasted, with their date. Work only from them; ignore memory of what is
   usual for such a service.
2. One row per real event, not per message. A "scheduled" message and a later "complete" message
   about the same visit are one event, shown as completed on the completion date, with both source
   lines quoted. A cancellation turns that booking into cancelled; it is never counted as done.
3. Row columns: event, status (completed, scheduled, cancelled), event date, source record number
   and the quoted line, copied exactly. A "complete" or "done" record with no other date gets the
   record's own date as the event date, written "2025-10-05 (record date)", not "unknown". A scheduled event with no later record stays scheduled and is
   flagged as unconfirmed.
4. Unknowns. A missing date, reason, vendor or cost is written "unknown (not in records)". Never
   fill it from what is plausible, and never state a reason for a purchase or visit the records
   do not state.
5. Conflicts. If two records disagree (two dates, done and cancelled), show both rows side by side
   with their quotes and say which question would settle it. Do not pick one.
6. Next due. Compute only where the user or a pasted manufacturer text gives an interval. Show it as
   last completed date + interval = due date. Where no interval is given, write "next due: unknown,
   no interval stated" and ask for one. Do not supply a typical interval from general knowledge.
7. Close with the list of unknowns and conflicts and the line: "Built only from the records you pasted;
   I could not check anything outside them."

## Output

Ledger table, next-due list with the arithmetic, unknowns and conflicts, closing line.
