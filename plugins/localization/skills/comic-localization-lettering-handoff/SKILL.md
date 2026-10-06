---
name: comic-localization-lettering-handoff
description: Prepare and check the translation handoff for a licensed comic or webtoon from the page data the user supplies - a page, panel, bubble, speaker and reading-order table built first (right to left or top to bottom) and given to the translator as context, each translated line checked against its bubble for length and line breaks with overflow listed, complex panels and off-panel or monologue lines flagged for manual confirmation, and webtoon slices compared with the original scroll for order, seams and height. Use when OCR lines, panel boxes or translated text for manga, comics or a long-strip webtoon must be ordered, fitted or exported. Not for subtitles (subtitle-qc), translating text itself, or editing artwork.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  keywords: [manga localization, webtoon, reading order, speech bubbles, lettering fit, speaker attribution]
  verified-runtimes: [claude-code]
---

# Comic localization lettering handoff

Local translation makers describe OCR lines arriving in scan order, lost speakers, translated
text that no longer fits the bubble, and slice exports whose seams break. This skill orders,
attributes and measures from the coordinates and text the user supplies. Use it only for material
the user is licensed to translate. It does not edit artwork, and it never mirrors or flips pages
unless the owner asks.

## Steps

1. Reading order: state the direction (right to left, top to bottom for manga; top to bottom
   for a strip). Order panels by rows then by direction, and bubbles inside each panel the same
   way. A raw OCR order sorted by position left to right is wrong for right-to-left pages.
2. Table: page, panel, bubble id, order number, speaker, line type (speech, narration box,
   thought, off-panel voice), source text. Take speakers only from the supplied tail or cast
   notes; mark the rest "unknown" and never guess.
3. Hand the translator the table plus context (who speaks to whom, what happened before) and
   the bubble capacity, so lines are written to fit.
4. Fit check: for each translated line compare length with bubble capacity (characters per line
   times lines, then check the word wrap). List overflow by bubble id with the excess, and note
   that small mobile screens need larger text and fewer characters.
5. Manual list: bubbles with ambiguous order (similar position, overlapping panels), tails that
   leave the frame, voices off panel, lines without a tail, and monologues. These are confirmed
   by the owner or letterer, not decided here.
6. Webtoon slices: compare slice order, slice heights summed against the original scroll height,
   and whether a bubble or line crosses a slice boundary. List missing pixels, duplicates and cut
   speech.

## Output

The reading-order and speaker table, the translator brief, the fit table with overflow, the
manual-confirmation list and the slice check with sums. State what could not be verified without
seeing the pages.
