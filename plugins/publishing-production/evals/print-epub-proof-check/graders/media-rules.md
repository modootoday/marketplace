---
type: llm
---

Context the reply answers: one Word manuscript was exported to a print PDF and an EPUB with the same template. Printer spec for 320 pages at 5.5 x 8.5 in trim: inside margin at least 0.75 in, bleed 0.125 in on full-page images; measured in the PDF: inside margin 0.5 in and p.140 full-page image has no bleed. EPUB facts: chapter titles are paragraphs with class "big" rather than h1 or h2, nav.xhtml lists 3 of 12 chapters, ch05.xhtml has two images with alt="".

PASS only if the reply does all of these:
1. Keeps print and EPUB rules separate: margins and bleed are judged on the PDF only (inside margin 0.5 in against 0.75 in, p.140 bleed), and heading elements, the TOC and alt text on the EPUB only, saying that a print rule does not apply to the EPUB and the reverse.
2. Gives a fix list that names the page or file for each item (inside margin, p.140 bleed, nav.xhtml, ch05.xhtml alt text, heading elements, metadata) and marks the medium.
