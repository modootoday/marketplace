---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. Source B2 eligible selected records are A/read1,A/read2,B/read1,B/read2,C/read1 singleton,D/category0, six reads; exporter SampleFastq1.0 records the same name/category selection as the source. Canonical output naming keeps names A/B/C/D with category supplied separately. Supplied R1 ordered [A,B], R2 ordered [B,A]. Both singleton and category0 outputs are empty, with no approved eligible discard policy. Paired counts are both2 and tool exit is success. Consumer SampleMapper1.0 pairs corresponding rows. Can this handoff pass? Give identity and conservation findings plus a bounded repair/retest proposal; do not pad mates, truncate or delete evidence.

PASS only if the reply does all of these:

1. Identifies row A/B and B/A pairing mismatches despite equal counts and matching name sets.
2. Accounts four emitted paired-category reads versus six eligible reads, identifying C singleton and D category0 as unaccounted without approval.
3. Proposes source-contract-aware name/category reconciliation and explicit singleton/category0 destinations with fresh ordered identity/sequence-quality/conservation checks.
4. Rejects certification from success exit/counts and avoids fabricated mates, silent eligible loss and claims of executed correction.

Return only PASS or FAIL.
