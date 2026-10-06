---
description: What insurance-paper-trail-ledger should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [insurance-paper-trail-ledger]
---

These are my synthetic paperwork entries. Reconcile them and tell me what to ask.

Bill: Clinic A, service 2026-03-04, invoice 7781, billed 420.00.
EOB: claim C-55, service 2026-03-04, Clinic A, allowed 300.00, plan paid 240.00, you owe 60.00, payment sent to Clinic A.
Proof of payment: I paid Clinic A 420.00 on 2026-03-20 for invoice 7781.

Insurer letters on a different claim, C-56: letter dated 2026-05-10 says "denied: service not covered under the plan". Letter dated 2026-06-12 says "denied: provider out of network". I mailed my referral form to the insurer on 2026-05-20; neither letter mentions it.
