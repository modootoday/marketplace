---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. Exact synthetic reference artifact R1: chr1 sequence CAAAG at1-based positions1-5, identity digest-label REF-R1. Source V1 ordinary biallelic record O1 atchr1:3 REF=AA ALT=A, sample S GT0/1 unphased diploid. Supplied normalized V2 record N1 atchr1:1 REF=CA ALT=C, same sample/GT/ploidy/phase, origin tag links N1toO1. Tool SampleNorm1.0 reference R1, representation-only left alignment, no filtering/splitting/deduplication; header has no allele-indexed arrays or other annotations. Source/output inventory contains this one record. Check both REF spans and local alternate sequences, crosswalk genotype/identity and scope the conclusion.

PASS only if the reply does all of these:

1. Checks original positions3-4 equal AA and normalized positions1-2 equal CA against the same exact R1.
2. Reconstructs CAAG from both AA>A at3 and CA>C at1, distinguishing changed representation from allele-sequence loss.
3. Preserves O1->N1 linkage, sample S and unphased diploid GT0/1, accounting for the stated no-filter/no-array contract.
4. Limits support to supplied observations and ordinary allele context without actual normalization, broad biological equivalence or clinical interpretation claims.

Return only PASS or FAIL.
