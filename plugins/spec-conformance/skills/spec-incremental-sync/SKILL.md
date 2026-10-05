---
name: spec-incremental-sync
description: Bring design documents (sources of truth, decision records, plans, specs) up to date with recent code changes by reading - group the commits since the last sync, read each diff and each candidate document with judgement rather than matching strings, decide per document whether its statements are now wrong, incomplete or still true, and edit only those, citing the commits. Use when the specs have drifted after a run of changes, when the user asks to sync or refresh the docs or SoT after recent work, or on a regular cadence. Not for migrating a whole pile into a new layout or for writing a new document from scratch.
metadata:
  tier: open
  level: L3
  domain: spec-writing
  install: optional
  keywords: [spec sync, documentation drift, source of truth, update specs, stale docs, recent changes]
---

# Incremental spec sync

The tempting shortcut is mechanical: grep the documents for the names that
changed in the diff and patch the matches. It finds renamed identifiers and
misses everything that matters: a rule the code now enforces differently, a
limit that changed value, a step that was removed, a decision that was quietly
reversed. And it patches documents that merely mention a name in passing.

## 1. Fix the window

Start from the last sync point (a recorded commit, a tag, or a date in the
document set's index) to the current HEAD. Record both ends; the next sync
starts from this HEAD.

## 2. Group the changes by subject

List the commits in the window and group them by the subject they change (a
feature, a service, a data model, a policy), not by file. Drop groups with no
behavioural content: formatting, dependency bumps with no API change, test-only
changes, typo fixes.

## 3. Find candidate documents by reading

For each group, find the documents that govern that subject: by the document
index, by the paths and terms the documents declare, and by reading the titles
and summaries. A name match is a lead, not a verdict; a document that governs
the subject without naming the changed file is still a candidate.

## 4. Read and judge, per document

Read the diff and the document together. For each statement in the document
about the changed subject, decide:

- **still true**: leave it.
- **now wrong**: the code contradicts it. Decide which is right: if the code is
  the intended change, update the document; if the document is the rule and the
  code broke it, report a defect instead of editing the document to match.
- **incomplete**: the change added behaviour the document should govern; add it
  in the document's own structure.

Use a model reading pass (yourself or subagents with the diff and document in
hand) for this step. Scripts can list the window and the candidates; they cannot
make this judgement.

## 5. Edit, cite, record

- Edit the statement in place, in the document's own vocabulary and section; do
  not append a "changes since" section.
- Cite the commit(s) behind each edit in the document's history line or the
  commit message.
- Update the document's own last-updated field if it has one.
- Record the new sync point.

## 6. Report

Per group: the documents read, the verdict for each (unchanged, updated,
defect reported), and the commits cited. Say which groups were dropped as
non-behavioural, so the reader can disagree.
