---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Synthetic XLIFF2.1 extraction E1 unit u1 has immutable source 'Hello [ph p1]', originalData d1='{name}', and p1 dataRef=d1 with canDelete=no, canCopy=no, canReorder=yes. Approved delivered target uses translated wording and moves p1 while keeping ID/reference and exactly one occurrence. Source is unchanged. SampleMerge1.0 supplied output report tied to candidate X1 contains exactly one native placeholder{name}. Owner requires a populated target. Give a source/target/code crosswalk and separate delivery, permission and supplied reconstruction findings.

PASS only if the reply does all of these:

1. Preserves immutable source and distinguishes its role from the populated approved target.
2. Treats moving p1 as permitted under canReorder=yes while retaining ID/dataRef/d1 identity.
3. Checks the single nondeletable/noncopyable code and one reconstructed{name} placeholder rather than equating XML validity with handoff.
4. Separates owner target delivery and supplied merger agreement from linguistic quality or unobserved native execution.

Return only PASS or FAIL.
