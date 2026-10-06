---
name: asset-qa-review
description: Check a rendered asset - a thumbnail, banner, carousel slide or deck page - from its screenshot for clipped or overlapping text, low contrast, off-brand colours or fonts, forbidden patterns and font licences, and report each defect with where it is. Use when the user asks to QA, review or approve a rendered image or slide before it is published. Not for critiquing the concept or rewriting the copy.
metadata:
  tier: open
  level: L3
  domain: brand-design
  install: optional
  keywords: [asset QA, design review, rendered image check, contrast, text overflow]
  verified-runtimes: [codex-cli]
---

# Asset QA from the render

Review what will be published, not the source file. A template that is right in
the editor can clip a long Korean line, drop a fallback font or shift on a
different viewport. Open the rendered image (read it as an image) at the size it
will be seen.

## Check, in this order

1. **Text fits.** Every line is fully visible: nothing clipped at an edge,
   nothing hidden behind another element, no word broken mid-syllable, no text
   inside the platform's crop or overlay zone (profile badge, play button,
   caption area).
2. **Text is readable.** Contrast between text and what is actually behind it,
   including busy photo areas, meets 4.5:1 for body text and 3:1 for large text.
   Estimate from the pixels and say it is an estimate.
3. **Brand.** Colours and fonts match the brand tokens when they exist; the logo
   is unstretched, at least its minimum size, with its clear space. A missing
   brand rule is a question, not a pass.
4. **Forbidden patterns.** Anything the brand forbids, plus claims the copy cannot
   support (a price, a "best", a guarantee) that need a source.
5. **Licences.** Fonts, photos and icons are ones the brand may use for this
   channel. When you cannot tell, say so.
6. **Platform format.** Size and aspect ratio match the destination.

## Report

A table of defects: where (top left, slide 3, the price badge), what is wrong,
severity (blocks publishing, should fix, optional), and the fix. Do not mark the
asset approved while a blocking defect remains; say what you could not check
from the image alone.
