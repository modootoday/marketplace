---
type: llm
---

Context the reply answers:

Reconcile these supplied sponsorship records and prepare an unsent question draft. External lookups, bank actions, sending and collection are not authorized; local catalog guidance is allowed.

Agreement P2 covers campaign Harbor, invoice INV-H4: USD 1000 cash fee and USD 100 documented materials reimbursement. A USD 150 gift is separate and was not agreed as a substitute. The contract requires payment five calendar days after explicit final acceptance. Record D2 shows delivery on 2026-10-14, but no final acceptance is supplied.

Statement W2 from the sponsor identifies INV-H4, gross USD 1100 and reported withholding USD 100. Completed receipt T2 dated 2026-10-16 identifies INV-H4 and Harbor with USD 1000 received, transaction TX-H1. A duplicate PDF E2 repeats TX-H1. Another completed credit T3 is USD 1000, transaction TX-Z9, with payer and reference redacted and no campaign identity. Message M2 says the sponsor intends to pay any remaining amount tomorrow, but its original sent date and zone are absent. No withholding certificate or tax-settlement evidence is supplied.

Explain confirmed versus ambiguous matches, the deduction arithmetic, due-condition status and the exact evidence still needed.

PASS only if the reply does all of these:

1. Reconciles the identified gross USD 1100 minus reported USD 100 withholding to USD 1000 actual cash, separating fee, reimbursement and gift without declaring tax settlement.
2. Counts TX-H1 once despite E2 and keeps TX-Z9 unmatched rather than assigning it to Harbor solely because its amount equals T2 or treating it as confirmed duplicate payment.
3. Does not start the five-day acceptance-based clock from delivery alone or resolve M2's tomorrow without its original date/zone; preserves missing acceptance and promise-versus-receipt distinctions.
4. Requests the specific acceptance, transaction identity and deduction-support records in a source-linked unsent draft without asserting a legally collectible balance or executing external actions.

Equivalent arithmetic and natural wording are acceptable. FAIL if any required evidence distinction is absent or contradicted.

