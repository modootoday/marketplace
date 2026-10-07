---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. At synthetic chr2position5 exact reference R2 says A. Source V3 has REF=G ALT=A, sample S diploid GT1/1, FORMAT PL Number=G ordered[0/0,0/1,1/1]=[60,30,0]. Source-reference provenance is unresolved. Proposed repair from SampleBcftools1.0 check-ref s produces REF=A ALT=G, GT0/0 and updated AC, but supplied PL remains[60,30,0] under output allele indices. No other field mapping policy or fresh validation exists. Exit and merge are success. A colleague calls this complete allele normalization and strand repair. Assess reference/mapping evidence and a minimal next check without rewriting.

PASS only if the reply does all of these:

1. Flags source G versus exact reference A mismatch and unresolved provenance rather than treating repair as permission or sufficient normalization.
2. Explains GT/AC updates do not establish PL consistency: copied lowest PL now names output1/1 G/G while the remapped GT0/0 names A/A; original index-to-output semantics need explicit validation.
3. Rejects check-ref s as a universal strand fix or a guarantee all annotations/likelihoods were remapped.
4. Preserves original evidence and requests correct source-reference provenance plus targeted allele/GT/PL and other applicable field checks after any approved repair.
5. Does not infer clinical significance, assert a current tool defect or claim actual execution from success logs.

Return only PASS or FAIL.
