---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Synthetic QIF has D07/10/26,T1,000. No exporter date/year or field-specific number convention, currency/account/sign context, independent control or stored importer row exists. Explain ambiguities and necessary inputs before import verification.

PASS only if the reply does all of these:

1. Leaves July/October and century unresolved rather than guessing locale or year.
2. Leaves one-versus-thousand amount interpretation unresolved without field-specific separators.
3. Requests exporter conventions, independent unambiguous controls and account/currency/sign context.
4. Requests named consumer/settings and actual stored-row observations; parseability alone is not import certification.

Return only PASS or FAIL.
