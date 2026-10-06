---
name: index-locator-verification
description: Check a book index, made by hand or with AI, against page-numbered final proofs - parse each entry and locator, search the term and its variants on the cited page in code, mark every locator found, not found or off by one page, check that each page range holds the term throughout or is queried, and check that every see and see also target exists as an entry. Use when an index is checked before release against the final page proofs, or when an AI-made index may cite pages where the term never appears. Not for choosing index terms or for layout checks (book-layout-proof-and-epub-check).
metadata:
  tier: open
  level: L3
  domain: publishing-production
  install: optional
  keywords: [book index, locator, page proofs, see also, cross-reference, indexing, verification]
  verified-runtimes: [codex-cli]
---

# Index locator verification

An index can look complete and still send readers to pages where the term never appears. A model asked
whether an index is correct tends to say yes. The check is mechanical, so it is done by search on the proofs and
the result is a count.

## Steps

1. Confirm the inputs: the index entries with their locators and the final page-numbered proof text (the pagination
   must be the final one; say so if the proofs are earlier). If a page the index cites is missing from the
   proof text, mark it "page not supplied", not found and not correct.
2. Parse each entry into heading, locators, page ranges and cross-references. Keep the entry as written.
3. For every locator, search the proof text of that page for the heading and for its variants (plural, inflected
   forms, an alternative name the index gives). Do it in code, or page by page with the matching words quoted. Mark
   each locator: found (quote the matching words), not found, or off by one page (found on the neighbouring page
   and not on the cited one).
4. Ranges: check every page of a range. A page with no mention of the term is reported as a gap for the indexer to
   decide, since discussion can continue without the word; do not call the range right or wrong yourself.
5. Cross-references: every "see" and "see also" target must exist as an entry heading, spelled as in the index, and
   a "see" heading must not also carry locators. Report each unresolved target.
6. Report counts: locators checked, found, not found, off by one, range gaps, unresolved cross-references, then the
   fix list by entry. Do not add, remove or rewrite entries, and do not suggest new terms.
7. State what the search cannot show: a term found on a page may be a passing mention that does not merit a
   locator, and a missing locator for a real discussion is not detected by this check.

## Output

A table of entry, locator, result and the quoted match, the range gap list, the unresolved cross-reference
list and the unverified note, then close the reply with the counts and the fix list by entry, as the last
two items. The indexer decides every fix; rewrite no entry and add no entry yourself, even to resolve a
cross-reference.
