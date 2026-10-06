---
name: book-layout-proof-and-epub-check
description: Check a book that goes to print and ebook before the edition is fixed - diff the typeset text against the approved manuscript and tie each difference to page and edition, check print (trim, margins, bleed, running heads) and EPUB (headings, table of contents, reflow, alt text, metadata) against separate rules, and pair automated EPUB accessibility results with the manual checks they cannot prove, never calling a file conformant from an automated pass. Use when an author or small press pastes typeset text, layout facts, an EPUB manifest or checker output and asks whether the proof or the files are ready. Not for writing or editing the manuscript, designing the layout, legal accessibility sign-off, or generating the files.
metadata:
  tier: open
  level: L3
  domain: publishing-production
  install: optional
  keywords: [book layout, proof, typeset, epub, accessibility, print, bleed, table of contents, edition]
---

# Book layout proof and EPUB check

A word-processor export reaches both print and ebook with one template, and typos or repeated words
surface only after copies are sold. This skill compares what was typeset with what was approved,
holds each deliverable to its own rules, and keeps "a tool found nothing" apart from "it is
accessible". It checks and reports; the publisher decides, and a qualified accessibility reviewer
signs off where a standard or contract requires it.

## Inputs

Use only what the user pasted: approved text, typeset text with page numbers, the printer's or
retailer's layout spec, measured layout facts, the EPUB manifest or file excerpts, checker output,
edition or printing. A rule that is not in the pasted spec is "not given"; ask for the spec rather
than recalling a number.

## Steps

1. **Text diff.** Compare typeset text with the approved manuscript line by line. For each
   difference give page, quoted approved line, quoted typeset line and kind: doubled word, typo,
   dropped or changed text. Do not report running heads, folios or hyphenation as errors. A
   repetition that is also in the approved text may be intentional: list it as "in approved text,
   confirm intent", not as a typo.
2. **Edition.** For each finding say which edition or printing carries it and where the fix lands:
   the next printing, a corrected ebook upload, or both. Copies already sold stay as they are;
   say so and do not promise a recall.
3. **Print rules.** Check the print PDF only against print rules: trim size, inside and outside
   margins against the printer spec for the page count, bleed on full-page images, running heads
   and folios, fonts embedded. List each as measured, required, pass or fail, with page.
4. **EPUB rules.** Check the EPUB only against reflow rules: real heading elements for chapter
   titles instead of styled paragraphs, a navigation document that lists every chapter, text that
   reflows at larger sizes without fixed page margins or breaks copied from print, images with
   alt text, language and metadata. Name the file for each finding.
5. **Rules not carried over.** State plainly which rule belongs to one medium only (print margins
   and bleed do not apply to an EPUB; heading structure and TOC links do not exist in the
   PDF) so a fix for one is not applied to the other.
6. **Accessibility evidence.** Report the automated result as what it is: it covers rules a
   program can test. Then list the manual items still open, each marked "unverified": reading
   order read in a screen reader, whether the TOC links land correctly, whether each alt text
   actually describes its image (present is not adequate), whether the accessibility metadata
   claims match the file, and a test on a real reading system. Say nothing is conformant until a
   person has done these.
7. **Fix list.** One row per fix: file or page, what to change, medium, owner to decide.

## Rules

- Never write "conformant", "accessible" or "passes" for an EPUB from an automated pass alone;
  write "no automated errors; manual items open".
- A missing metadata claim and a claim the file does not support are both findings.
- Do not rewrite the author's prose or choose corrections for text that might be intended.
- State what could not be verified (anything outside the pasted excerpts, such as pages or files
  not given) in a closing line.

## Output

Sections in order: text diff table, edition and fix location, print check, EPUB check, accessibility
(automated result, manual items unverified), fix list, what could not be verified.
