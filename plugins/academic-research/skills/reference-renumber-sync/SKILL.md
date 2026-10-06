---
name: reference-renumber-sync
description: Renumber a numbered reference list and keep every in-text citation in sync - an explicit old-to-new mapping built before the text is touched, single, grouped and range citations rewritten and re-compressed, citations to deleted entries flagged instead of dropped, and uncited or unresolved references listed. Use when references are reordered, inserted or deleted in a manuscript with numeric citations such as [3], [2,7] or [4-6]. Not for author-year styles, citation formatting or checking that references exist (research-source-verification).
metadata:
  tier: open
  level: L2
  domain: academic-research
  install: optional
  keywords: [reference renumbering, numeric citations, citation ranges, manuscript editing, orphan references]
---

# Reference renumber sync

A researcher reports editing a numbered list and the in-text numbers by hand, which is where
mismatches creep in. This is mechanical, so do it as a mapping, not by eye. It rests on one
user report; say so if asked how well it is tested.

## Steps

1. Write the new reference order, then the mapping table old number -> new number, with
   "deleted" for removed entries. Show it before changing any text.
2. Expand every citation to single numbers first: ranges ([4-6] is 4, 5, 6) and groups
   ([2,4-6] is 2, 4, 5, 6).
3. Map each number. A citation that points to a deleted entry is not silently dropped: list the
   sentence, the removed number and what remains, and put a direct question to the author:
   add a replacement source, or remove the claim?
4. Re-sort each group in ascending new order and re-compress: three or more consecutive numbers
   become a range, two consecutive numbers stay as a list (5,6), per the style the user states.
   Ask for the style if the journal's rule is not given.
5. Reconcile both ways: every reference cited at least once (list uncited ones by new number)
   and every citation resolving to an entry (list unresolved ones, or write "none"). If the user
   says the text is the whole manuscript, the uncited references are certain: report them as
   uncited, not as "maybe cited elsewhere". If the text is an excerpt, say they are provisional.

## Output

The mapping table, the rewritten text with each changed citation listed as old -> new, then
three labelled lines: citations to deleted references (with the question to the author),
uncited references (old and new number), unresolved citations (or "none").
