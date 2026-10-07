---
name: pdf-reading-order-export-check
description: Compare an exported PDF's intended sequence, tag tree, form tab order and reader observations by element ID. Use when checking PDF reading order, tagged forms or accessibility export reports. Not for judging structure from screenshots or certifying whole-document accessibility.
metadata:
  tier: open
  level: L3
  domain: accessibility
  install: optional
  keywords: [pdf, reading order, tags, tab order, accessibility]
  verified-runtimes: [codex-cli]
---

# Check PDF reading and tab order

Use the exact exported PDF and an intended semantic sequence with element IDs.
The visual layout, tag sequence, keyboard tab sequence and observed reader output
are different evidence. Two columns can look correct while being interleaved in
reading order; tags being present is not sufficient evidence of correct order.

Compare intended order with the tag tree, then record actual observations for
each named reader/assistive technology, version and relevant mode. Include label
and control association in forms, not just a list of words. Test the expected
field focus sequence separately from spoken/read text: one may pass while the
other fails. Preserve supplied observations as supplied, not tests you ran.

Report mismatches by element ID and layer. Incorrect tag/tab configuration is
authoring evidence; a mismatch confined to one reader is an observed compatibility
issue whose cause needs further checks. Do not infer that all readers fail, that
the tag tree is wrong, or that changing a correct sequence will fix a particular
reader. Compare a second configured reader or inspect the relevant tag/annotation
association to discriminate the cause when needed.

Return expected/tag/tab/observed sequence rows and bounded pass, mismatch or
unverified decisions, with reader/version and next checks. A match covers only
the tested sequence and configuration, not every accessibility requirement or
legal compliance. With screenshots or missing expected order, tags, field focus
evidence or reader configuration, request the missing artifacts and avoid an
accessibility-pass claim. Prefer correcting source structure and inspecting the
new exported file over assuming a source edit repaired the PDF.

Sources: [W3C PDF3 reading and tab order technique](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3)
and [a historical PDF.js 3.6.172 form-order report](https://github.com/mozilla/pdf.js/issues/16564).
The technique is informative guidance, and the historical issue is not evidence
of a defect in an untested current reader.
