---
name: datalab-sponsor-payment-evidence
description: Reconcile supplied sponsorship agreements, acceptance records and payment receipts. Use when checking promised fees against evidenced receipts and unresolved due conditions. Not for tax or legal judgments, bank actions or collection execution.
metadata:
  tier: open
  level: L3
  domain: marketing
  install: optional
  keywords: [sponsorship, payment, receipt, agreement, reconciliation, datalab]
---

# Sponsorship payment evidence

Separate what was promised, what was accepted and what cash is actually evidenced. A sender's payment promise is not a receipt, and matching an amount alone does not identify a campaign.

## Workflow

1. Identify each agreement and amendment by campaign, deliverable, version, invoice or other supplied matching keys. Keep currencies separate; do not assume an exchange rate. Read [references/payment-records.md](references/payment-records.md) when matching or calculating.
2. Record the agreed cash fee, separately documented expense reimbursement, gift or noncash consideration and any documented deduction. A gift substitutes for cash only if an explicit amendment says so. Keep gross obligation, reported deduction and actual cash distinct without declaring tax liability settled.
3. Match delivery and acceptance evidence to the contractual due condition. Preserve an explicit date as supplied, including its zone or missing zone; a due-after-acceptance term does not start from delivery alone. Unknown conditions remain unresolved, not overdue or waived.
4. Match actual receipts using their supplied transaction, payer, invoice and campaign evidence. Distinguish duplicate copies of one transaction from independently evidenced additional payments. An unidentified equal-value receipt remains ambiguous; a promised, initiated or pending transfer is not confirmed cash receipt.
5. Calculate confirmed amounts and unexplained differences only within the evidenced identity and currency scope. Separate missing evidence from a confirmed unpaid balance. Return a source-linked ledger and an unsent clarification draft for missing identity, acceptance, due-date or deduction records. Do not send, contact a bank, initiate a collection or determine legal enforceability.

## Optional evidence tools

Supplied records suffice without MCP or discovery. If optional supporting records are requested, use visible tools only within actual schemas or datalab_find_tools followed by datalab_call for returned names and schemas. Do not invent tool names or arguments. If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status. Unavailable optional evidence remains a gap; do not change the supplied-data review into an invented bank or conversion lookup.

