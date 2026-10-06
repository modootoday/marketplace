---
name: tenant-dispute-evidence-packet
description: Organise a deposit or small-claims dispute into an evidence packet from the user's own records - a dated timeline from lease, move-in and move-out documents, an item-by-item condition comparison with document references, each amount claimed tied to a lease clause and receipt with ordinary wear and age flagged, deposit and notice deadlines counted from the dates given and marked met, at risk or unknown, and a list of missing evidence. Use when a tenant, landlord or property manager has the documents for a deposit or move-out dispute and wants them arranged for an attorney, tenant advisor or the court clerk. Not for legal conclusions, who wins, deadlines or limits of a jurisdiction not supplied, drafting the legal claim, or contacting anyone.
metadata:
  tier: open
  level: L5
  domain: real-estate
  install: optional
  keywords: [deposit dispute, small claims, move-out comparison, timeline, evidence packet, ordinary wear]
  verified-runtimes: [claude-code]
---

# Tenant dispute evidence packet

This supports the person who holds the records, whichever side they are on. It
arranges their documents and arithmetic; an attorney, tenant advisor or the
court decides what counts. This is not legal advice: no conclusion about who is
right, what is owed in law, or what a judge will do, and say so in the reply.
Evidence is two practitioner reports, so keep to organising.

## 1. Timeline

Dated table from the supplied documents only: lease start and end, rent and
deposit, move-in report, move-out date, inspection, notices sent or received,
invoices, payments, messages. Each row cites its document. Compute elapsed days
between dates yourself and show the dates used. Undated items go in a separate
list.

## 2. Condition comparison

One row per item (room and element): move-in record, move-out record, difference,
photo or document reference for each side. Where only one side exists, say so; do
not infer the missing record. Separate: documented damage, change that fits
ordinary use over the stay, and unclear.

## 3. Amounts

Table: item, amount claimed, receipt or invoice id, lease clause relied on, age of
the item at the time if supplied, and a note where age or ordinary wear may reduce
what can be claimed (an old item replaced at full price). Show the totals, the
deposit held and the net, with the formula. Do not compute a depreciated figure as
fact; if you illustrate, label the assumption and leave the rate to the adviser.

## 4. Deadlines

Take the deposit-return and itemised-notice deadlines only from text the user
supplied (statute, lease clause or adviser note). Count from the dates given and
mark met, at risk or unknown. If no rule was supplied, say so and list the
question for the adviser (the deadline, what the notice must contain, how it must
be sent); elapsed days alone are not a verdict.

## 5. Missing evidence and output

List what is missing (photos, dated notices, receipts, signed reports, proof of
delivery) with why it matters. Always check these three rows and list each one
that is absent: photos for the move-in side, a dated itemised notice to the
tenant with proof of delivery (if none was sent, say "no notice sent" as a
missing row, next to the days elapsed since move-out), and the age or purchase
record of any replaced item. Output: timeline, comparison, amounts, deadline
table, missing list, then "To verify by the attorney or advisor": the local rules,
every document reference, whether the claim or defence is worth filing. State
plainly what could not be verified (jurisdiction rules, authenticity of
documents, condition not documented). Use synthetic or redacted names and
addresses.
