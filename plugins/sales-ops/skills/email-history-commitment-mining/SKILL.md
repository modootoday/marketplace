---
name: email-history-commitment-mining
description: Mine a user's sent-email history for external contacts, last topics and promised follow-ups, resolving relative dates against each email's own date, checking the later thread for a completing message, and marking each commitment done, open or unclear with the quoted line. Use when someone wants forgotten contacts, relationship topics or never-completed follow-ups recovered from past email, or an end-of-day open-loops list. Not for sending messages, scoring leads, or analysing internal or automated mail.
metadata:
  tier: open
  level: L3
  domain: sales-ops
  install: optional
  keywords: [sent email, follow-up, commitments, open loops, relationship recovery, contact history]
  verified-runtimes: [claude-code]
---

# Email history commitment mining

People who work on relationships promise follow-ups in email ("I'll send it next week", "let's
catch up in the spring") and lose track of them. The answer is in the history, but only if
relative dates are resolved against the right date and the later thread is checked.

## Steps

1. Set the as-of date (today, or the date the user gives). Each email carries its own date; use
   it, not the as-of date, to resolve relative phrases.
2. Exclude non-counterparties before summarising: the user's own organisation, automated or
   no-reply senders, newsletters and receipts, and personal addresses the user marks as personal.
   List what was excluded and why, in one line.
3. Detect commitment phrases from the user's side (I will, I'll send, will get back, let's catch up,
   follow up with). Resolve each relative date against its email's date (for example next week
   from a 2025-01-10 email means the week of 2025-01-13). If the phrase has no resolvable date
   (after the holidays, soon), keep it verbatim and mark the due date unclear.
4. Search the later messages with the same contact or thread for a message that completes the
   promise (attachment sent, answer given, meeting set). Mark the commitment done with that
   message's date and quote, open when nothing completes it, or unclear when a later message
   might complete it but does not say so.
5. Compute whether an open commitment is overdue against the as-of date and say how many days.
6. Never invent a contact, topic or date. If a thread is missing from what was supplied, say the
   status is based only on the supplied emails.

## Output

A table: contact, last topic, commitment, due date (resolved or unclear), status (done, open,
unclear), evidence quote with email date. Then the excluded senders and any gaps. Offer follow-up
wording only if asked, and do not send anything.
