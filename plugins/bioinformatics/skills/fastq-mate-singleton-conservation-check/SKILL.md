---
name: fastq-mate-singleton-conservation-check
description: Compare ordered FASTQ mate identities and eligible read conservation against source name/category inventories and explicit singleton and catch-all policies. Use when paired exports have equal counts but wrong pairing, orphan reads disappear or BAM-to-FASTQ recovery is questioned. Not for alignment, biological interpretation or reconstructing unavailable mates or clipped bases.
metadata:
  tier: open
  level: L3
  domain: bioinformatics
  install: optional
  keywords: [FASTQ, mate pairing, singleton, read conservation, QNAME, BAM export]
  verified-runtimes: [codex-cli]
---

# FASTQ mate and singleton conservation check

Equal output counts do not establish pairing. Compare read identities and the recoverable eligible set, distinguishing supplied reports from an export actually executed.

## Define the recoverable set

Identify exact source/output artifacts, exporter/version/options, source collation/order and downstream pairing requirements. Obtain eligible name/category/sequence-quality records and the explicit filter, duplicate-selection and naming contracts. Do not silently remove suffixes or merge distinct names; a /1 or /2 normalization must follow the declared convention. When identities are ambiguous, report that boundary rather than pairing by row.

For SAM/BAM-derived output, distinguish READ1-only, READ2-only and both/neither categories for each QNAME. Record secondary/supplementary and other exclusions, selected sequence per name/category, and any missing-quality policy. Raw alignment-record counts are not unique eligible read counts. Hard-clipped sequence absent from the source cannot be recovered; do not promise original sequencer-read reconstruction.

## Reconcile outputs

1. Crosswalk the selected eligible reads into paired mate1/mate2, singleton, category-0 and explicitly approved discarded outputs. A paired flag alone does not prove both mate records are present. Record missing counterpart identities, collisions and duplicate multiplicities.
2. Check each paired-file row or interleaved pair by canonical identity and mate category, not just equal lengths or matching sets. Name collation is required by converters that depend on it; source order and export policy must be evidenced. Reordering is only a proposal until the actual source contract and new output observation support it.
3. Check sequence and quality preservation under the declared conversion policy, including orientation/quality substitutions if relevant. Verify their identity at the selected name/category level instead of relying on one aggregate file size.
4. Give a conservation equation in read units: two times complete pairs plus singleton reads plus category-0 reads plus approved eligible discards equals selected eligible reads. Keep excluded alignment records and unrecoverable source content outside that equation with their own ledger. A default discard example is not approval to discard the user's reads.
5. After a proposed correction, request observations tied to exact new outputs: ordered mate IDs, singleton/category-0 accounting, sequence-quality checks and the named consumer's input requirements. Preserve original evidence; do not pad mates, truncate files or erase orphan rows to equalize counts.

## Output and limits

Provide an artifact/filter/naming ledger, ordered pair discrepancies, eligible-read destination table and separate conservation and consumer-readiness conclusions. Missing names/categories or destination policies leave these conclusions unverified even if parsing succeeds. Scope matching to supplied observations; do not claim application execution, biological accuracy or restoration of absent reads.

The [samtools FASTQ manual](https://www.htslib.org/doc/samtools-fasta.html) documents collation, name/category selection and singleton routing. The [historical toolkit 2.9.0 report](https://github.com/ncbi/sra-tools/issues/123) is closed and unreproduced here; it is not evidence of a current exporter defect or AI failure. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
