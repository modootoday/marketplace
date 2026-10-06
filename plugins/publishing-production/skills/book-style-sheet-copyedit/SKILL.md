---
name: book-style-sheet-copyedit
description: Copyedit a book-length manuscript through a project style sheet - name the style manual and edition, count spelling, number, capitalisation, name and hyphenation variants in code, settle one choice per item with a rule id or a marked house choice, apply the sheet chapter by chapter with a change log (location, before, after, rule), leave the author's voice and singular they alone, and re-run to prove no variants remain. Use when a long manuscript is copyedited and the same decision must hold across chapters, or when an earlier AI pass fixed some instances and missed others. Not for one client's marketing rulebook (client-rulebook-copy-check) or story continuity (manuscript-continuity-audit).
metadata:
  tier: open
  level: L3
  domain: publishing-production
  install: optional
  keywords: [copyediting, style sheet, Chicago Manual of Style, consistency, numbers, hyphenation, manuscript]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Book style sheet copyedit

A copyedit of a whole book is one set of decisions applied everywhere. A model that edits chapter by
chapter from memory catches a variant once and misses it six times, and it "corrects" things that were
never errors. The style sheet is what makes the pass repeatable.

## Steps

1. Name the style manual and edition the user follows (for example Chicago Manual of Style, 17th
   edition) and say whether its text was pasted. If it was not, say in the reply that the manual text
   was not pasted and every rule you name comes from memory and must be confirmed against the manual,
   and write "(from memory, confirm)" beside each rule id. Quote no section number you cannot check.
   A spelling or usage choice with no rule you are sure of (email against e-mail is the usual one) is
   recorded as "house choice", so no one mistakes a preference for a rule.
2. Scan the whole manuscript for variants before editing: spelling pairs (email and e-mail, towards and
   toward), numerals against words, capitalisation of titles and terms, name forms, hyphenation and compounds.
   Count every variant in code (a script or a search per form), not by eye, and list the counts by chapter.
3. Settle one choice per item and write the style sheet: item, chosen form, rule id or "house choice",
   the manual's section if pasted, and the count of instances that change.
4. Apply the sheet chapter by chapter. Log every change with chapter and paragraph or line, before, after and
   rule id. Do not change anything that is not on the sheet. Leave dialect, voice, deliberate fragments and
   quoted material alone; the singular they is not an error and is never changed unless the style sheet says so
   for a stated reason.
5. Queries go to the author, not into the text: a spelling that may be a character's quirk, a number
   inside a quotation, a name used two ways on purpose. List them with the location.
6. Run the scan again on the edited text. The variant counts must show one form for each item, and
   a second pass over the same input must produce the same changes. Report the counts before and after.
7. Say what was not checked: facts, permissions, citations and anything the manual was not pasted for.

## Output

Order: the variant counts found before editing, the style sheet table, the edited text, the change log
grouped by chapter (each row with its rule id or house-choice label), the author query list, the re-scan
result, and the unverified list. State that the sheet is to be saved with the manuscript and supplied again with
the next batch so the same input gives the same result, and that the author approves the queries.
