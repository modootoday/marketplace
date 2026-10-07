---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Synthetic Q1 and approved exporter/bank control are identical to dd/mm/yy26=2026, European T-1.234,50, account A/EUR debit1234.50 dated2026-10-07. SampleImporter1.0 stored row instead has2026-07-10,-1234.50,A,EUR. Opening2000 and closing765.50 still match. Identify the failure and propose a scoped parser correction and verification plan.

PASS only if the reply does all of these:

1. Finds stored July10 versus approved October7 date/period discrepancy.
2. Recognizes amount/account/currency and arithmetic agreement do not resolve date semantics.
3. Does not certify parsing from matching totals or display preferences.
4. Preserves source/observations and proposes documented parse-format correction with new stored-date/control evidence, without inventing bank error or posting changes.

Return only PASS or FAIL.
