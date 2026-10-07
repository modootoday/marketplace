---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Only translated strings and a 'valid XML' message are supplied. No source/unit IDs, XLIFF version/languages, originalData/editing hints, skeleton or merger observations exist. Explain what can be checked, what remains unverified and which inputs are needed before functional handoff approval.

PASS only if the reply does all of these:

1. Limits supported findings to supplied text/XML observations and leaves functional reconstruction unverified.
2. Requests source/unit identities, version/languages and owner target-delivery requirements.
3. Requests inline data/references/permissions and skeleton/merger observations.
4. Does not impose a blanket code-order prohibition or declare every absent target schema-invalid.

Return only PASS or FAIL.
