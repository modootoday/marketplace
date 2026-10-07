---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Owner requires populated delivered targets and preservation of the approved extracted source under synthetic XLIFF2.1. Unit u1 extracted source is English; candidate overwrites source with target-language wording and has no target. Separate unit u2 originally contains ph p2 referencing d2 with canDelete=no; candidate target drops p2. XML parses. Compare the candidate with the approved baseline, identify independent failures and propose a scoped correction/recheck.

PASS only if the reply does all of these:

1. Identifies u1 immutable-source overwrite and missing owner-required target as role/delivery failures.
2. Distinguishes missing target delivery failure here from a universal schema-invalid assertion.
3. Identifies u2 loss of nondeletable p2 separately despite XML parsing.
4. Proposes preserved-baseline, unit/code-specific restoration and a fresh merger/native-placeholder control rather than source-to-target count padding.

Return only PASS or FAIL.
