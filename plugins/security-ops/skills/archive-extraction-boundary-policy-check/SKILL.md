---
name: archive-extraction-boundary-policy-check
description: Review archive member, link and destination policies for a named extractor before extraction. Use when assessing an untrusted TAR or ZIP handoff, a filter refusal or whether listed names prove containment. Not for executing suspicious archives or certifying universal extraction safety.
metadata:
  tier: open
  level: L3
  domain: security-ops
  install: optional
  keywords: [archive, extraction, tar, zip, links, containment]
  verified-runtimes: [codex-cli]
---

# Archive extraction boundary policy check

A readable listing and matching content hashes do not establish where an extractor will write. Establish a bounded policy for the actual API and destination before endorsing extraction.

## Inputs and decision

Record the archive identity, ordered member inventory, types, declared and allowed expanded sizes, link targets, duplicate names and case collisions. Separate trusted provenance from a caller merely labeling an archive trusted. Ask for the extraction purpose and permitted links, special files, metadata and transformations.

Record the library/tool version, exact API, filter/options, target platform, error behavior and destination state, including preexisting links. A filter name is not an executed containment result. Different ZIP APIs can have different sanitization; do not transfer TAR filter behavior to ZIP.

Compare lexical paths and supplied resolved targets with the approved root. Resolve member-order dependencies, links and aliases rather than relying only on a string prefix. A fresh directory is useful evidence but does not establish immunity to concurrent destination changes. Identify duplicate overwrite order, case collisions, special types and resource limits. Missing types, targets or destination state leave these branches unknown.

## Evidence and stop conditions

Separate an inspection plan from supplied bounded extraction observations and from an extraction personally performed. When observations are supplied, retain the exact API/environment, root identity, unchanged outside control, member outcomes and output digests. State what those observations cover; do not claim the tool ran in this session.

If a supplied link resolution escapes the root, or a necessary branch cannot be resolved, hold the extraction endorsement. Do not bypass a refusal by enabling fully trusted extraction. Do not build or execute exploit archives, run extracted files, or test against a live destination. Actual extraction requires separate authorization and an isolated destination with stated quotas and cleanup policy.

A filter can reject, modify or skip members and can still leave partial output after failure. Report those outcomes separately from successful completion and faithful preservation. Content digest equality does not establish path, link or metadata fidelity. Resource exhaustion and concurrent destination manipulation require separate controls.

## Output

Return a member-order ledger: source name/type/target, resolved destination evidence, policy decision, supplied outcome and preservation exception. Add API/version uncertainties, size/count bounds, collision decisions and partial-output cleanup requirements. Conclude contained under the supplied bounded evidence, refused, or unverified; do not promise universal safety.

Contract references: [Python extraction filters](https://docs.python.org/3/library/tarfile.html#extraction-filters) and [ZIP Path warning](https://docs.python.org/3/library/zipfile.html#zipfile.Path). Check the installed API/version instead of assuming documentation defaults.
