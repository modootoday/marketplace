---
name: bagit-completeness-fixity-audit
description: Separate BagIt structural completeness from checksum validity using bag inventory, manifests, fetch entries and full digest evidence. Use when fast validation passed, a transferred bag needs fixity review or missing payloads must be distinguished from changed bytes. Not for repairing, downloading or certifying a bag without evidence.
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [BagIt, completeness, fixity, manifest, checksum]
  verified-runtimes: [codex-cli]
---

# BagIt completeness and fixity audit

A matching byte count is compatible with changed content. Keep completeness and validity as separate findings.

## Check

1. Identify the exact bag snapshot, BagIt version/encoding, validator version/options and manifest algorithms. Preserve the bag; this review does not authorize changing manifests or fetching missing payloads.
2. Check required bagit.txt, data/ and version-required structure. Reconcile every payload file with payload manifests and every manifest entry with an actual file. Check tag manifests, their referenced tag files and required files independently. List absent files, unlisted payloads and unresolved entries; do not call the bag complete from a single matching digest.
3. Treat fetch.txt as a list of payloads to account for, not proof they arrived. Missing referenced payloads make the bag incomplete. Record expected sizes where available; leave retrieval for separately authorized work.
4. Compute or inspect full checksums for every file listed in each payload and tag manifest using its declared algorithm. Compare actual bytes with the manifest values. Bag validity requires completeness and all listed checksums verified. A demonstrated incomplete bag is invalid even if every present file's checksum matches; a complete bag with a checksum mismatch is also invalid. Payload-Oxum and fast size/count checks are preliminary evidence, not fixity verification.
5. If only reports are supplied, attribute the findings to those reports. Missing structural inventory prevents a completeness conclusion; absent full digest evidence prevents a validity conclusion. A sample checksum or unsupported algorithm does not settle unchecked files.

## Report

Give separate complete/incomplete/unverified and valid/invalid/unverified conclusions for the named snapshot, with a file ledger: path, manifest/algorithm, present status, expected digest, actual digest or unchecked, discrepancy. Keep present-file fixity and unchecked scope separate from overall validity. For a detected mismatch, name the next evidence check that would locate the change against the preserved received snapshot, source reference and transfer record; do not rewrite manifests to conceal it. Missing evidence is unverified, distinct from demonstrated absent required files. State report versus executed checks. Do not overwrite evidence to make a result pass.

Contract: [RFC 8493 sections 2 and 3](https://datatracker.ietf.org/doc/html/rfc8493). Historical motivation: [fast validation report](https://github.com/LibraryOfCongress/bagit-python/issues/177); it does not establish a current defect.
