---
name: vcf-reference-allele-normalization-check
description: Compare exact reference spans and represented alternate sequences while tracing VCF allele indices, genotypes and annotations through normalization. Use when normalized variants cannot merge, REF repair is proposed or splitting changes allele-indexed fields. Not for clinical interpretation, variant calling, guessing a reference or treating allele swapping as strand repair.
metadata:
  tier: open
  level: L3
  domain: bioinformatics
  install: optional
  keywords: [VCF, reference identity, normalization, allele mapping, genotype, bcftools]
  verified-runtimes: [codex-cli]
---

# VCF reference and allele normalization check

Distinguish representation normalization from repairing incompatible source data. A successful command or merge does not establish conserved allele meaning. Work from authorized supplied records and observations unless execution is separately requested and available.

## Establish the contract

Record source/output VCF identities, format/header definitions, sample order and ploidy/phase, exact reference FASTA/contig identity and coordinate convention, tool/version and all normalization/filter/split options. A broad assembly label is insufficient when sequence versions differ. Obtain reference sequence for the affected span and flanking context, plus original-to-output record linkage. Do not choose a convenient reference to make mismatches disappear.

## Compare semantics

1. Check each source REF against its exact reference span before interpreting normalized output. A mismatch is a provenance or source-consistency finding, not authorization to force REF repair. Separate strand, assembly and allele representation uncertainties; do not diagnose them from a warning alone.
2. For ordinary sequence alleles, reconstruct the local alternate sequence from original and output representations against the same established reference/context. Position or padding changes can preserve that sequence; matching POS/ID alone cannot. Symbolic alleles, breakends or unavailable spans require their own explicit contract and may remain unverified.
3. Trace each original REF/ALT index into output records, preserving sample identities and the approved genotype meaning, ploidy and phase. Inspect header cardinalities and applicable allele/genotype-indexed fields, including AD/PL and annotations when present. Splitting, atomization, joining, duplicate removal and filtering each need explicit approved semantics and loss accounting; row counts alone are not a conservation check.
4. Do not claim that a REF-swap option repairs every field. In the documented bcftools contract, check-ref s can update GT/AC while leaving PL or other fields unresolved, and does not fix strand problems. If supplied PL values remain attached to old allele ordering, mark their interpretation inconsistent or unverified until an explicit remapping policy and observations establish it. Never suppress warnings as proof of correctness.
5. Give the smallest justified correction or a missing-evidence request. Preserve originals and require fresh REF, local-sequence and allele/field mapping observations after a change, including an unaffected control. Do not globally rewrite alleles or overwrite evidence to make a merge pass.

## Output

An exact-reference/environment ledger; original-to-output record/allele/sample crosswalk; REF-span and local alternate-sequence comparisons; GT/field retention or unresolved interpretations; approved losses and remaining checks. Separate supplied evidence from executed transformations and representation equivalence from biological or clinical interpretation.

Consult the [bcftools norm contract](https://samtools.github.io/bcftools/bcftools#norm). [Issue 988](https://github.com/samtools/bcftools/issues/988) is a closed historical bcftools 1.9-era REF-prefix report, with cause/reference provenance unconfirmed here. It does not establish a current defect or AI failure. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
