---
type: llm
---

Context the reply answers:

Review the following redacted supplied sponsorship records and draft an unsent clarification if anything is unresolved. No external lookup, bank action, sending or collection is authorized. Local catalog guidance may be read.

Agreement P1 for campaign Cedar, invoice INV-C7, promises a EUR 900 cash fee plus EUR 60 travel reimbursement. A gifted product has stated retail value EUR 120 with no cash-substitution agreement. Acceptance A1 explicitly accepts the submitted final post on 2026-10-12. The contract sets payment due 2026-10-19, with no hour or time zone specified.

Receipt T1 is a completed incoming EUR 960 credit dated 2026-10-18, identifying payer Cedar Studio, campaign Cedar and INV-C7, transaction TX-71. Export E1 repeats the same TX-71 amount/date/payer. No deductions are stated. Snapshot date is 2026-10-20 UTC.

Prepare the agreement/acceptance/payment reconciliation, describe any duplicate records and remaining limits, and state what the supplied evidence supports.

PASS only if the reply does all of these:

1. Reconciles EUR 900 fee plus EUR 60 reimbursement to the one EUR 960 completed receipt for the matched campaign/invoice, keeping the gift separate rather than adding it to cash.
2. Treats T1 and E1 as duplicate evidence of TX-71 rather than two EUR 960 payments.
3. Preserves explicit acceptance and date-only due 2026-10-19 with unknown hour/zone, recognizing the receipt date precedes the supplied due date without inventing an absolute deadline instant.
4. Provides source-linked evidence and remaining limits without inventing tax settlement, external verification or executed communication/collection.

Equivalent arithmetic and natural wording are acceptable. FAIL if any required evidence distinction is absent or contradicted.

