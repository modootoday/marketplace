---
name: deadline-register-from-documents
description: Build a deadline register from pasted event or exhibitor documents - each item with its date, time zone, owner and the quoted source line - and diff a new version against the previous one. Use when someone pastes a kit, guide or schedule (often revised) and asks for a list of deadlines, who owns each, or what changed between versions. Not for calendar invites, reminders, legal or contract deadlines, or documents the user has not pasted.
metadata:
  tier: open
  level: L2
  domain: planning
  install: optional
  keywords: [deadline register, exhibitor kit, document diff, time zone, due dates, owners]
  verified-runtimes: [claude-code]
---

# Deadline register from documents

Revised kits hide date changes in prose. A register is only useful if every date can be
traced to a line someone can open.

## Steps

1. Read only the pasted text. Number lines or sections as the document does, and cite them
   (for example "v2 line 14") with a short exact quote for every date.
2. One row per deliverable: item, date, time and time zone, owner, source cite and quote,
   status. Put a time zone from the document next to every date. If the document states a
   default zone, say it is the document's default and cite that line. If none is stated,
   write "zone not stated" and ask; do not assume one. The owner column says "not stated"
   whenever the document gives no owner, whatever words it uses ("not listed", blank); quote
   the document's own words in the cite column. With two versions, an item present only in the
   old one keeps a row marked "removed in v2" with its old cite and quote.
3. If the user gave their own zone and a conversion, show both the document's time and the
   converted time, each with its zone label (for example 23:59 CET, 07:59 KST next day), and
   say which zone is only the document's default or an assumption. A date with no clock time
   is flagged as having none; offer a conversion for it only as conditional. Without a given
   zone, do not convert. State in one line that the document's times are its own and the
   converted times are derived from the offset the user gave, not stated by the document.
4. When there are two versions, add a diff: changed (old to new, both cited), added, removed,
   unchanged count. A date present in one version only is a finding, not an omission.
5. List what could not be settled: owner not stated, two lines that disagree (quote both,
   do not pick), relative dates ("two weeks before the show") with the anchor date missing,
   dates with no year.
6. End with the items to confirm with the organizer. The organizer's current document
   decides, not this register.

## Never

- Fill a missing owner, time or zone from guesswork; write "not stated".
- Pick between two conflicting lines; show both and flag it.
- Give a date without its cite and quote.
- Treat the register as legal or contractual advice.
