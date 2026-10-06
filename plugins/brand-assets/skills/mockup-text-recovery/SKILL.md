---
name: mockup-text-recovery
description: Recover the text, hierarchy and colours of an AI-generated mockup or ad image into a reviewable text block, marking every uncertain or garbled character, listing fonts only as candidates and never correcting a word silently. Use when someone has a client mockup or ad image (or a description of one) and needs the copy retyped into an editable layout. Not for generating or redrawing the image, for rebuilding the layout file, or for QA of a finished asset (use asset-qa-review).
metadata:
  tier: open
  level: L2
  domain: brand-design
  install: optional
  keywords: [mockup, ad image, text recovery, transcription, ocr, font candidates, editable layout]
  verified-runtimes: [claude-code]
---

# Mockup text recovery

AI-generated ad mockups often carry text that is nearly right: a letter swapped, a glyph
melted, a word that is not a word. Retyping from the image without marking those spots
puts the error into the editable file. This skill only reads what the user supplies (the
image they attach or their description of it); it never generates or redraws anything.

## Steps

1. Work from what is actually supplied. If only a description came with no image, say the
   transcript is from the description and must be checked against the original image.
2. Transcribe every text element in reading order and as seen, not as it should be. Mark
   confidence per element: certain, or `[?]` after an uncertain word or letter, with the
   reading you chose and the alternatives. A garbled glyph or non-word is flagged as a
   defect of the mockup (do not correct it silently; propose a fix on a separate line for
   the client to approve).
3. List the hierarchy as levels: headline, sub-line, price or offer badge, call to action,
   footer or handle, with the position and relative size of each.
4. List fonts as candidates only ("looks like a high-contrast serif, candidates to check"),
   with the features that suggest them, and say a font is confirmed only against the source
   file or the client. Never state a font name as fact.
5. Capture colours as approximate values read from the description or image, labelled as
   estimates; ask for the brand HEX if the asset must match a brand (see brand-token-kit).
6. End with a checklist for the human: compare each `[?]` with the original, confirm the
   copy with the client, confirm font licences, confirm output size and format.

## Output

A transcript table (element, text, confidence, note), the hierarchy list, the font
candidates, the estimated colours, the flagged defects with a proposed fix each, and the
checklist. Say what could not be verified.
