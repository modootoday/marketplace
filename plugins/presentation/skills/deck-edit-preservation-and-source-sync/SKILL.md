---
name: deck-edit-preservation-and-source-sync
description: Edit an existing slide deck without losing content and keep hand fixes alive across regeneration - record a per-slide preservation list of required text and objects before editing, diff the file against it afterwards and report every removed, moved or changed element, keep content source and layout template apart, write manual fixes back to the source, and warn which hand edits a regeneration would overwrite. Use when an AI edit of a pptx or HTML deck dropped a table, image or text, or small manual fixes vanished when the deck was regenerated. Not for building a deck from a template (use pptx-template-build) or reviewing numbers in a finished deck (use deck-qa-review).
metadata:
  tier: open
  level: L3
  domain: presentation
  install: optional
  keywords: [pptx edit, preservation list, regeneration, source of truth, diff, slide elements]
---

# Deck edit preservation and source sync

Two users report the same loss: an AI edit removed slide elements and cost hours of
re-fixing, and fixes made in a generated deck or HTML were lost on regeneration. Evidence is
two first-person reports; the method below is a precaution, not a measured guarantee.

Before replying, read `references/worked-example.md`: it shows the preservation list, the
diff checks and the source write-back for a slide edit when the files cannot be opened.

## Before the edit

1. Restate the requested change in one line (for example "tighten the wording on slide 4")
   and what is out of scope: every other slide and every non-text element on that slide.
2. Write the preservation list per slide: slide number, title, each text block (first words
   and word count), each table (rows by columns), chart, image and shape with its position,
   and the speaker notes. Mark the elements the request allows to change; everything else is
   required. If the file can be read, build the list from it; if not, ask for it or say the
   list is from what the user described and unverified.
3. Agree what deletion is allowed. Default: none.

## After the edit

4. Diff the edited file against the list slide by slide. Report as separate lists: removed,
   moved or resized, changed text (old and new), duplicated, slide order changed. A change
   to layout is reported apart from a change to content.
5. Any removal or change outside the allowed set is restored or flagged for the user, not
   explained away. Do not say "nothing else changed" unless the diff was run; if it cannot
   be run here, give the exact checks to run (counts of shapes, tables and images per slide).

## Source and regeneration

6. Identify what generates the deck: a content source (outline, JSON, markdown, data) and a
   layout template. Keep them separate. A fix made only in the generated file is an
   out-of-source edit.
7. Write each manual fix back to the content source (or the template, when it is a layout
   fix) in the same session, and list the fixes written back.
8. Before any regeneration, list the hand edits in the current deck that are not in the
   source and say they will be overwritten; ask whether to copy them to the source first.
   Regenerate only after that answer.

When the slide text or the file cannot be read in this session, still deliver the whole
plan in the same reply: the preservation list from the user's description, the exact diff
the user or a later step will run (removed, moved or resized, changed text, duplicated,
order changed, each reported with unrequested deletions called out and the lost element
restored or flagged, the table above all), and the regeneration warning. Never stop at a
request for the text.

## Output

The preservation list, the post-edit diff with the four categories, the out-of-source edit
list, and the pre-regeneration warning. State what could not be verified.
