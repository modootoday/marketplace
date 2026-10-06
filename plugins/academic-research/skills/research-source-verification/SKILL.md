---
name: research-source-verification
description: Check AI-suggested papers, citations, measurement instruments and extracted statistics before they go into research notes or a manuscript - match each citation to a real index entry, pull instruments and scales only as quoted text, and screen papers against the research question. Use when an assistant recommends a paper, a scale or a reference list, or when you extract methods or measures from a paper. Not for formatting citations or writing the literature review itself.
metadata:
  tier: open
  level: L3
  domain: academic-research
  install: optional
  keywords: [citation check, hallucinated references, DOI verification, measurement instrument, literature screening]
  verified-runtimes: [claude-code]
---

# Research source verification

Users report that assistants recommend papers that cannot be found anywhere and name
measurement instruments that do not exist. A reference is a claim until an index confirms it.

## Rules

1. Every citation an assistant produced, including your own earlier ones, is unverified until
   author, year, title, venue and DOI or URL all match one entry in a real index (Crossref, the
   publisher page, PubMed, Google Scholar or a library catalogue).
2. Without a search tool, say so plainly: you cannot confirm that a paper exists. Never
   complete a half-remembered citation, and never invent a DOI.
3. A near match is not a match. A wrong year, an author spelled differently or a different title
   is a mismatch: report the differing field, do not fix it silently.
4. Instruments, scales, item counts, subscales and statistics are extracted only as text that
   appears in the supplied paper or abstract, with page or section. Anything not in the text is
   written as "not stated". Do not fill from memory, and separate a scale that is used in the
   study from one that is only mentioned in the references.
5. Before deep reading, screen each paper against the stated research question: include or
   exclude, with one reason tied to the text. Ask for the research question if none was given.

## Output

A table, one row per source: source as given, status, evidence, next step.

- `verified`: every field matched, with the index entry you matched it to.
- `mismatch`: name the field that differs and both values.
- `unverifiable`: no index entry found, or no search was possible. Do not guess a replacement.

Then a second table for extracted measures: item, quoted text, location, or "not stated".
End with the count per status and the sources the user must check by hand.
