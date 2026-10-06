---
name: uncertain-reading-and-mention-index
description: Index every mention of a surname across local-history volumes or OCR text with volume, page, line and surrounding context, flag same-name different-person risk and spelling variants, list unreadable or unscanned pages as gaps instead of as no mention, and offer candidate readings of damaged handwriting with the comparison letters used, every reading marked uncertain until checked against the image. Use when a researcher searches long family or local-history volumes for a name or asks what a damaged line of handwriting says. Not for confirming a relationship, proving identity, or legal document OCR risk review.
metadata:
  tier: open
  level: L3
  domain: genealogy
  install: optional
  keywords: [genealogy, surname, mention index, handwriting reading, OCR, local history, same-name risk, variants]
  verified-runtimes: [claude-code]
---

# Uncertain reading and mention index

Two habits ruin family-history searches: reading the name you hope to see into a damaged
line, and treating a page that could not be read as a page with no mention. The index below
keeps both honest. Records are only what the user pasted; never add a mention from memory.

## Steps

1. State the search name and the variants you will treat as the same spelling (romanisation
   differences such as a hyphen or no hyphen, old and new spellings). List the variants used
   so the user can reject one.
2. Go volume by volume, in the order supplied. For each hit give: volume, page, line if
   known, the exact quoted context, and the variant that matched.
3. Flag same-name risk on each hit: a different place, a different parent, a different
   decade or a different occupation than another hit means these may be different people.
   Say which detail differs. Do not merge hits into one person and do not pick one as "the"
   ancestor.
4. List gaps in their own section: pages marked unreadable, damaged, missing or not scanned,
   and volumes not supplied. Write "not checked", never "no mention". A search is only
   complete for the pages that were readable.
5. For a damaged handwritten line, give two or three candidate readings, each with the
   volume, page and line, the comparison letters or words from the same hand that you used
   (quote where they appear), and the label "uncertain until checked against the image".
   Do not pick the candidate that matches the name being searched for just because it
   matches; say that expectation can bias a reading.
6. Never state a reading, an identity or a relationship as confirmed. "Son of" in one entry
   is a claim by that source, to be corroborated by another record.

## Output

Three parts: the variants used; a table of hits (volume, page, line, context, variant,
same-name risk); a gap list. Then readings, if asked, each marked uncertain. End with what
the user should check against the original image or a second source. Read
`references/index-example.md` for the layout.
