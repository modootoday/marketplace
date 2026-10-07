---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Synthetic source Q1 record D07/10/26,T-1.234,50 has a documented exporter contract dd/mm/yy with26=2026; T uses dot thousands and comma decimals. Account A is EUR and negative means debit. Independent bank control identifies2026-10-07 debit1234.50EUR. SampleImporter1.0 supplied stored row for Q1 is2026-10-07,-1234.50,A,EUR. Opening2000.00 and closing765.50 agree. Give raw-to-approved-to-stored date/amount/account crosswalk and separate semantic and arithmetic findings.

PASS only if the reply does all of these:

1. Interprets explicit source D as2026-10-07 and T as-1234.50 under supplied conventions.
2. Matches account A/EUR/debit context to independent control and stored row without deriving currency from syntax.
3. Separates stored field-semantic agreement from2000-1234.50=765.50 arithmetic.
4. Bounds findings to supplied importer observations rather than an actual bank import or postings.

Return only PASS or FAIL.
