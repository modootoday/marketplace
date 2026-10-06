---
name: translation-postedit-qc
description: Review a machine or AI translation against its source before delivery - segment-by-segment omissions and additions, footnote and numbering parity, unnatural phrasing with a fix and a reason, a term glossary, and the spots a native reviewer must confirm. Use when a user asks to check, polish or make an AI translation sound natural, especially academic text with footnotes. Not for producing the first translation from scratch.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  keywords: [translation review, post-editing, footnotes, naturalness, term glossary, machine translation]
  verified-runtimes: [claude-code]
---

# Translation post-edit QC

Translators report that after an AI pass they still must check naturalness, footnotes and
academic formatting, and often the reviewer is not a native speaker of the target language.

## Steps

1. Align source and target segment by segment. For each segment mark: omission (source content
   missing), addition (target content the source lacks), or meaning shift.
2. Parity: count and order footnote markers, citations, numbers, list numbering and headings in
   both texts. Report any marker lost, added, moved or renumbered, with its position.
3. Naturalness: mark phrasing that reads as a calque or literal rendering. Give a more natural
   alternative and a one-line reason. Keep meaning unchanged.
4. Glossary: list key terms with the target term used, and flag a source term translated two
   different ways. Do not swap established terms without saying so.
5. Uncertainty: the user may not be a native speaker of the target, and your own judgement of
   nativeness is not proof. Word every call on idiom, register or collocation as a suggestion
   ("probably", "consider"), never "must" or "nobody says". List each such spot, the flagged
   calque included, as an item for a native reviewer. Do not claim the text is native-quality.

## Output

A table: segment, issue type, source, target, fix, reason. Then the parity result, the glossary,
the native-reviewer list, and the corrected text with markers in source order. Change only
what the table justifies.
