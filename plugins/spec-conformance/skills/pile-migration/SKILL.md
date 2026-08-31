---
name: pile-migration
description: Work through a dossier of existing documents and decide each one's status, relationships and placement by reading it. Use when normalising an accumulated document set into a schema.
---

# Migrating a pile you did not write

The tooling proves what it can and stops. Filenames give ids and kinds,
directories give domains, git gives the timeline, and someone's frontmatter or
prose gives the relationships that were already written down. Everything left is
a judgement, and judgements come from reading the document.

Your job is the reading. Three rules make it safe.

## First decide what these files even are

Before any of the rest, the discovery stage hands you every document-shaped file
in the repository with no opinion about it. Your first pass decides, per file:
is this a design document at all, and if so of what kind.

Nothing in the signals decides it for you. A leading timestamp appears on
proposals and on meeting notes. Frontmatter appears on published pages and on
internal rules. A file in a directory called `docs` may be a public manual and a
file in `notes` may be the only record of an architecture decision.

Classify from the content, and be willing to answer "not a design document" for
most of them. A migration that sweeps every markdown file into the schema
produces a tidy directory full of things that do not belong there.

## Read the document before deciding anything about it

Not the title, not the headings, not the commit subjects. Those are in the
dossier because they help you orient, not because they are evidence. A plan
whose filename says `migration-plan-v2` may be a superseded draft, an accepted
decision, or a record of something abandoned, and only the body says which.

Word overlap is not a relationship. Two documents sharing the word `billing`
share a word. What connects them is one saying it replaces the other, or
building on its conclusion, or contradicting it — and that is a sentence you
have to find.

## Record the evidence, in the decision

Every decision carries the reason it was made, quoting or citing the part of the
document that supports it. A decision with no evidence is refused by the apply
stage, and rightly: an unexplained judgement cannot be reviewed, and a
normalised pile of unexplained judgements is worse than the pile you started
with, because it looks authoritative.

Good evidence is specific: "closing section says superseded by the Phase 3
rewrite, which is document X", not "seems old".

## Judging whether the work happened

A plan says what was going to be done. Whether it was is a separate question,
and the dossier carries three kinds of evidence for it. None of them is an
answer.

| Evidence | Reads as done | Reads as abandoned | Neither by itself |
| --- | --- | --- | --- |
| paths the document names still exist | supports | — | a path can exist and hold something else entirely |
| commits touched those paths after it was written | supports | — | the area moved on without following this plan |
| a commit subject cites the document | strong | — | citing is not completing |
| named paths are missing | — | supports | the work landed somewhere else under another name |
| checkboxes unchecked | — | supports | many documents never used them |

Read the document and see which story it tells, then check the evidence against
it. When they disagree, the disagreement is the finding: say the plan claims one
thing and the tree shows another, and leave the status empty.

**A missing path is not proof of abandonment**, and a present path is not proof
of completion. Both are common when work was done under a different name.

## When you cannot tell, say so

Leave the field empty and note why. An empty status means nobody has decided
yet, which is true and visible. A guessed status means the check that would have
caught the gap now sees a value and stays quiet.

Do not resolve ambiguity by picking the more recent document, the longer one, or
the one with better formatting. Recency is not currency: a document from last
week can be an abandoned experiment and one from last year can be the standing
rule.

## Working order

1. **Group before deciding.** Take one subject cluster at a time. Documents about
   the same subject are decided together or not at all, because the question is
   which of them is current, and that has no answer document by document.
2. **Read the cluster in creation order.** The timeline is derived and reliable.
   Reading oldest first is how a supersede chain becomes visible.
3. **Decide the chain first, then the statuses.** Once you know what replaced
   what, most statuses follow.
4. **Leave the rest empty** and report how many.

## Never compress, never invent

The body crosses unchanged. If a document is too long for its limit, that is a
splitting decision made separately and deliberately — not something to solve by
trimming during a migration.

A free-text status carrying facts has those facts kept. The apply stage appends
them rather than dropping them, and you should check that it did.

## What "done" means

Not that every field is filled. Done is: every document read, every decision
carrying its evidence, and an honest count of what is still unknown. A migration
that reports 100 percent completion on a pile nobody could fully resolve has
resolved it by guessing.
