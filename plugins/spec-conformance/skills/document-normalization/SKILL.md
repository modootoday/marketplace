---
name: document-normalization
description: Bring an existing pile of design documents into a schema without losing content or inventing values. Use when backfilling frontmatter, normalising status vocabularies, splitting an over-long document, or reviewing a stale one.
---

# Normalising documents that already exist

Two prohibitions govern everything here. They are not style preferences; each
one names a way normalisation destroys the thing it was meant to fix.

## Never compress

Normalisation does not reduce content.

- A document over its length limit is **split**, not summarised. Split it into a
  family and index the parts from the parent.
- A status string carrying facts has those facts **moved into the body**, never
  dropped to fit a vocabulary.
- Removing text to make a document conform removes the **reason** first, because
  reasons are the longest part. A rule without its reason is deleted by the next
  person who finds it inconvenient.

If you cannot fit the content, the limit is wrong or the document is two
documents. Both are fine. Shortening is not.

## Never invent

Write only values you can derive from evidence.

| Field | Derivable | Why |
| --- | --- | --- |
| kind | yes | the filename pattern says so |
| id | yes | it is the filename stem |
| domain | yes | it is the directory |
| updated | **no** | file history includes formatting commits and moves |
| reviewed | **no** | nobody has confirmed anything yet |
| status | **no** | it is a judgement |
| supersedes, references | **no** | a relationship has to be read to be known |

**An empty field is honest. A guessed one is worse than missing**, because the
check that would have caught the gap now sees a value and stays quiet.

When you cannot derive a value, leave it out and say in your report how many
documents are waiting on a human for that field.

## Order of work

1. **Derivable fields first.** Mechanical, reversible, no judgement.
2. **Human judgement second.** Status, relationships, which document is current.
3. **Review last.** Confirm, supersede or archive.

Backwards, and a later mechanical pass overwrites a decision a person made.

## Normalising a status vocabulary

Free-text statuses accumulate: `complete` and `completed`, `in-progress` and
`in_progress`, and eventually a whole sentence in the field.

- Map only spellings whose meaning is unambiguous. `completed` → `archived` is a
  judgement about lifecycle, not a spelling fix; ask.
- A status holding extra information — a date, a caveat, a link — gets that
  information moved into the body under a heading, then the field set.
- Anything you cannot map, leave and list. A long tail of five odd values is
  cheaper to read than a wrong mapping you cannot see.

## Splitting a document

- Split along the seams the document already has: its headings.
- The parent keeps the summary and links to the parts; the parts keep the
  detail. Nothing is lost in the move.
- Each part gets its own id, and the parent names them, so a reader arriving at
  a part can get back.

## Reviewing a stale document

Age is not a status. A document untouched for a year may be exactly right. The
review has three outcomes and all three are decisions a person makes:

- **confirm** — still true; record that it was reviewed, without editing content
- **supersede** — name the successor, and have the successor name it back
- **archive** — say why, and leave the document in place

**Never archive automatically.** A tool cannot tell abandoned from stable, and
the stable case is the common one for documents that hold invariants.
