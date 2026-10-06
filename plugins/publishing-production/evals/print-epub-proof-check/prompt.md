---
description: What book-layout-proof-and-epub-check should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [book-layout-proof-and-epub-check]
---

I exported a Word manuscript to a print PDF and an EPUB with the same template. Please check the layout rules for each and tell me what the accessibility check cannot prove. All facts are below.

Approved text vs typeset print PDF (first printing, 400 copies already sold):
- p.37 approved: "She lit the lamp." Typeset: "She lit the the lamp."
- p.88 approved: "to receive the letter". Typeset: "to recieve the letter".
- p.112 approved: "He waited, waited, and waited." Typeset: the same.
- Every page has the running head "NIGHT HARBOR" and a page number; those are not in the manuscript file.

Printer spec for 320 pages at 5.5 x 8.5 in trim: inside margin at least 0.75 in, outside 0.5 in, bleed 0.125 in on full-page images.
Measured in the PDF: inside margin 0.5 in, outside 0.5 in, p.140 full-page image has no bleed.

EPUB facts:
- Chapter titles are paragraphs with class "big", not h1 or h2.
- nav.xhtml lists 3 of the 12 chapters.
- ch05.xhtml has two images, both with alt="".
- Metadata has dc:language "en" but no accessibility metadata at all.
- Automated checker output: 0 errors, 2 warnings (both about the missing metadata).
