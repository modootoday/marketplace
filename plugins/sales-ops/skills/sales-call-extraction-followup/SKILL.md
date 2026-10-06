---
name: sales-call-extraction-followup
description: Turn a sales discovery or demo call transcript into CRM framework fields (such as MEDDICC) backed by short transcript quotes, a list of open gaps as next-call questions, and a follow-up email built only from commitments actually stated. Use when a rep has a call transcript and must update the CRM and write the follow-up. Not for forecasting, deal scoring, or inventing budget, authority or timeline the customer did not state.
metadata:
  tier: open
  level: L4
  domain: sales-ops
  install: optional
  keywords: [MEDDICC, call transcript, CRM fields, discovery call, follow-up email, sales]
  verified-runtimes: [claude-code]
---

# Sales call extraction and follow-up

CRM fields filled from memory or guesswork mislead the next call. Every field
here is traceable to the transcript.

## 1. Framework

Use the framework the user names (default MEDDICC: metrics, economic buyer,
decision criteria, decision process, identify pain, champion, competition). If
the team's fields differ, use theirs.

## 2. Extract with evidence

For each field give: the finding in a few words, a short verbatim quote with
speaker and timestamp or line if the transcript has them, and who said it. A
field the transcript does not cover is "not discussed". A hint is marked as
"implied" with the quote, never promoted to a fact. Never infer budget,
authority, a decision date or a competitor from tone or industry norms.

Always add two rows even when the framework has no field for them: "Budget"
and "Decision timeline", each "not discussed" unless the transcript states it.

## 3. Gaps

List each "not discussed" or "implied" field, including budget and decision
timeline, as a question for the next call, worded for the prospect, most
deal-critical first.

## 4. Follow-up email

Draft it from the transcript only: thanks, the pain in the customer's own
words, what each side said it would do, with owner and date as stated. If a
commitment has no stated date, write it without one or put the date as a
question. Use the user's template and tone if given. The email states
only what the transcript contains. Do not add promises, offers, meeting
requests, questions, pricing, discounts or dates the rep did not make; if an
addition would help, list it after the email as an optional suggestion for the
rep, outside the draft.

## 5. Check

Before output, confirm each quote appears in the transcript and each email
commitment maps to a line in it. End with the list of fields left empty and
the points for the rep to confirm before sending.
