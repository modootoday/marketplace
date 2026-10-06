---
name: living-doc-sync
description: Keep one living document per workstream (a shared doc, wiki page or published page) current as the work moves - update its checklist, measured results and open decisions in place, restructure sections instead of appending new text below stale text, date every measurement, and return the document's URL after each update. Use when the user asks to keep a doc, page or artifact updated, to reflect progress in the plan document, or to "update the doc" after a step. Not for writing a new one-off report or for a changelog.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [living document, status page, update the doc, workstream document, checklist, open decisions]
  verified-runtimes: [claude-code]
---

# Living document sync

A document that follows a workstream is read by someone who was not in the
session. It fails them in two ways: it drifts behind the work, or it grows by
appending, so the current state sits under three older versions of itself and
the reader has to reconcile them.

## 1. One document per workstream

- Find the existing document before writing. A second document on the same
  workstream splits the truth.
- The document has a fixed shape the reader learns once:
  1. **Current state** (two or three lines, dated).
  2. **Checklist** of the planned steps, each done, in progress or not started.
  3. **Measured results**, each with date, what ran, how much, and on what.
  4. **Open decisions**, each with options and a recommendation, and who decides.
  5. **History** (optional, short): decisions taken and when.

## 2. Update in place

- Change the line that became wrong; do not add a new line under it saying it is
  now different. A step that finished is ticked, not described again below.
- When a measurement is redone, replace the old number with the new one and its
  date. Measured results holds only the latest figure per metric; a superseded
  figure is dropped or kept as one dated line in History, never as a growing
  results table or a stack of dated "Update" sections.
- When the plan changed shape (steps merged, a phase dropped), restructure the
  checklist so it shows the plan as it now is. A reader should never need to
  read the document top to bottom to learn the current state.
- A decision once taken moves from Open decisions to History with its date and
  the chosen option.

## 3. Read before writing

Others may have edited or commented since your last update. Read the current
version first and merge into it; never overwrite with a copy from earlier in
the session. Answer or resolve comments that your update settles.

## 4. Return the link every time

After each update, give the URL and one line saying what changed. The user
should not have to search for the document or diff it to see what moved.

If you cannot write to the document yourself and hand over text to paste, still
end the reply with that pair: the URL, then one line of what changed (not a
bulleted changelog). Anything the user must check goes above it.

## 5. What not to put in it

No session narrative, no tool output dumps, no credentials or internal hosts if
the document is shared beyond the team. A number without its date and source is
left out until it can be measured.
