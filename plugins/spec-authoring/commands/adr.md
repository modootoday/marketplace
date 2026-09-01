---
description: Start a decision record — what was chosen, what was rejected and why, and what would reverse it.
argument-hint: '[the decision being made]'
---

Start a decision record for: $ARGUMENTS

A decision record exists for one reader: the person who, a year from now, is
about to undo this decision without knowing why it was made. Follow the
`adr-authoring` skill; this command only puts a correctly shaped document in the
right place.

## Before writing

1. **Check this deserves a record.** Write one when the choice closes off
   alternatives or is expensive to reverse. The test: would a competent person
   reasonably choose differently? If no, this is routine work with an obvious
   default and a record adds noise.
2. **Check it is settled.** A decision still under discussion belongs in a plan
   until it is made. Offer `/spec-authoring:plan` instead.
3. **Find where records live, and take the next number.** Never reuse a number:
   a gap in the sequence is fine, a reused number makes every old citation
   wrong. Read the existing filenames and match them.

## Sections to create

All five, none omitted:

- **Context** — the situation that forced a choice, with the choice left out. If
  this section already implies the answer, it is advocacy rather than context.
- **Decision** — one sentence, present tense, written as a rule to follow.
- **Alternatives rejected** — each one, and why. This is the section that gets
  skipped and the section that does the work. Without it the next reader
  re-proposes what was already ruled out, and nobody can say what was known.
- **Consequences** — what this costs, **including what becomes harder**. A record
  listing only benefits was written to win an argument, not to inform.
- **Reversal conditions** — what would have to be true to reconsider. Naming
  them in advance is what stops a decision becoming folklore.

Set the status to `accepted`.

## Supersession

Records are immutable once accepted. To change a decision, write a new record
that supersedes the old one, and make each name the other so a reader can walk
the chain in either direction. Never delete a superseded record: deleting
removes the reason, which is the part nobody can reconstruct.

An amendment must say what it amends and why it is an amendment. An amendment
that reverses the decision is not an amendment — it is a new record.

## What not to write

No unmeasured performance claims: "faster" without a number is a preference.
No implementation detail that will drift within a release; the record holds the
choice, not the code.

If you cannot name a rejected alternative, stop and say so. A decision with no
alternatives was not a decision, and the record will not help anyone.
