---
name: xliff-source-target-code-handoff-check
description: Check XLIFF unit/source/target roles and permission-aware inline-code reconstruction against approved extraction and merge contracts. Use when translations overwrite source, required targets disappear or valid XML loses native placeholders. Not for linguistic quality or treating every code reorder or absent target as invalid.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  keywords: [XLIFF, source target, inline codes, originalData, dataRef, reconstruction]
  verified-runtimes: [codex-cli]
---

# XLIFF source, target and code handoff check

Obtain exact source and translated artifacts, XLIFF version/languages, approved unit/segment identities, target delivery requirements, inline data and editing hints, skeleton/merger identity and supplied reconstructed-resource observations. Source text is the extraction baseline, not a slot for translated wording. Missing identity or reconstruction evidence limits the conclusion to observable text or XML structure.

## Compare roles and reconstruction

1. Crosswalk file/unit/segment IDs and source content against the approved extraction. Keep intended target content separate. Check target presence/state against the owner's delivery requirement; absence of target is not universally schema invalidity.
2. Inventory inline code IDs and kinds, paired or spanning relationships, originalData/dataRef references and native content. Resolve references and preserve code identity through the declared extraction and merge workflow. Similar visible placeholder counts do not establish the same native code graph.
3. Apply the actual version's canDelete, canCopy and canReorder permissions and defaults. A nondeletable code must survive; permitted reordering is not automatically an error. Check pairing and referenced data separately from textual placement. Do not invent blanket order locks from a linguistic marker checklist.
4. Compare reconstructed resources or supplied merger observations with native controls, including placeholder identity and multiplicity. XML parsing, translation completeness and native reconstruction are separate findings. Without a merge report, leave runtime handoff unverified.
5. When asked for a correction, preserve the extraction and candidate evidence, identify exact affected units/codes and propose an owner-approved restoration with a new merge/control observation. Do not copy source into target to inflate delivery counts or globally rewrite code IDs.

## Output and limits

Give a unit/segment/source/target/code crosswalk, permission and reference violations, delivery-state findings and untested native reconstruction scope. Reuse translation-postedit-qc for meaning, naturalness and glossary review. Do not claim a merge was executed from supplied synthetic observations.

The [XLIFF2.1 standard](https://docs.oasis-open.org/xliff/xliff-core/v2.1/os/xliff-core-v2.1-os.html) documents bounded inline-code/editing-hint contracts. The [historical Weblate report](https://github.com/WeblateOrg/weblate/issues/2668) concerns3.5.1/translate-toolkit2.3.1 and an older trans-unit workflow, closed with milestone3.7. It motivates role checks, not a present2.1 defect or an AI failure. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
