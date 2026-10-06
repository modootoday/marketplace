---
name: insurance-paper-trail-ledger
description: Reconcile a policyholder's own paperwork - match bills, explanations of benefits and payment proofs by date of service and claim or invoice number, show billed, allowed, insurer paid, patient owed and patient paid per claim with who received each payment, list unmatched items, and order insurer letters by date to tabulate reasons and flag changed reasons or evidence submitted but not mentioned - with a source for every row. Use when someone pastes medical bills, EOBs, payment records or months of insurer letters and asks who was paid what or how the insurer's statements changed. Not for building an appeal, coverage or legal conclusions, or telling the insurer what it owes.
metadata:
  tier: open
  level: L4
  domain: insurance-admin
  install: optional
  keywords: [explanation of benefits, medical bill, insurer letters, payment reconciliation, denial reason, policyholder]
  verified-runtimes: [claude-code]
---

# Insurance paper trail ledger

This helps a policyholder see what their own documents say. It compares and
tabulates; it does not decide what the insurer must pay, whether a denial was
right, or what the law requires. Use synthetic or redacted text: if a member ID or
diagnosis appears, say so and suggest redacting it. Building an appeal packet is a
different task; this skill supplies the facts it would rest on.

## 1. Frame first

List what was pasted: bills, EOBs, payment proofs, letters, each with its date and
identifier. Quote figures as written. Do not add amounts from memory or assume a
contract rate.

## 2. Match

Join bill, EOB and payment by date of service and claim or invoice number. A
record that joins on one key only is a weak match: say which key. List every
unmatched bill, EOB or payment under its own heading.

## 3. Per-claim ledger

One row per claim: provider, date of service, billed, allowed, insurer paid,
patient owed per EOB, patient paid, payee of each payment. Then arithmetic in view:

- billed minus allowed (the difference is a question, not a finding),
- patient paid minus patient owed per EOB,
- total received by each payee against billed.

Say whether any insurer payment reached the policyholder or only the provider.
Never state who is right. Phrase gaps as questions for the provider and for the
insurer, for example "why was 420 collected when the EOB shows 60 owed".

## 4. Letter chronology

Order insurer letters by date. Tabulate per claim: letter date, what was decided,
the stated reason, corrections. Flag: a reason that changed between letters (quote
both), and any document the policyholder says was submitted that a later letter
does not mention (state it as "not mentioned in this letter").

## 5. Source discipline

Every row quotes its source document and line. Any statement you add that is not in
the records is labelled "not in the records". Do not infer intent.

## 6. Output

Ledger, unmatched list, letter table, questions to ask, then "To verify": coverage
and balance-billing questions need the insurer or the regulator to confirm, and
nothing here is a legal conclusion. State what was not pasted.
