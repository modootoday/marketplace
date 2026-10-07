---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. Source B1 exporter SampleFastq1.0 is name-collated and selects one eligible primary record per canonical QNAME/category, filtering secondary/supplementary records. Eligible selected reads are A/read1, A/read2, B/read1, B/read2, C/read1 with no counterpart, D/category0 (neither mate bit). These are six distinct recoverable reads. One extra secondary A/read1 alignment is explicitly excluded, not a seventh eligible read. Declared output naming adds /1 and /2 only to mate-category names. Supplied outputs O1: R1 ordered [A/1,B/1]; R2 ordered [A/2,B/2]; singleton [C/1]; category0 [D]. Supplied per-name/category sequence and quality digests match the selected source records. Consumer SampleMapper1.0 requires same canonical names per paired row and handles singleton/category0 separately. Give ordered-pair findings, conservation arithmetic and precise scope.

PASS only if the reply does all of these:

1. Matches A/B canonical identities and mate categories at each paired row under the declared suffix policy.
2. Shows two pairs/four paired reads +one singleton C +one category0 D =six selected eligible reads, with the secondary alignment separately excluded.
3. Uses supplied sequence/quality evidence and destination/naming/filter contracts rather than raw alignment count or equal paired-file lengths alone.
4. Limits agreement to supplied O1 and consumer contract without claiming executed export, original sequencer recovery or recreation of unavailable reads.

Return only PASS or FAIL.
