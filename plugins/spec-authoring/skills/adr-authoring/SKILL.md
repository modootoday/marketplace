---
name: adr-authoring
description: Record an architectural decision so a later reader can tell whether it still applies, including what was rejected and what would reverse it. Use when a choice closes off alternatives or is expensive to undo.
---

# Recording a decision

A decision record exists for one reader: the person who, a year from now, is
about to undo the decision without knowing why it was made. Write for them.

## When to write one

Write a record when the choice **closes off alternatives** or is expensive to
reverse. Choosing a data store, a boundary, a protocol, a naming rule everything
else will follow. Not every commit, and not routine work with an obvious
default.

The test: would a competent person reasonably choose differently? If yes, the
reasoning is worth keeping.

## Required parts

**Context** — the situation that forced a choice, without the choice in it. If
this section already implies the answer, it is advocacy, not context.

**Decision** — one sentence, in the present tense, as a rule the reader must
follow.

**Alternatives rejected** — each one, and **why**. This is the section that gets
skipped and the section that does the work. Without it, the next reader
re-proposes the rejected option, and nobody can say what was already known.

**Consequences** — what this costs, including what becomes harder. A record that
lists only benefits was written to win an argument, not to inform.

**Reversal conditions** — what would have to be true for this to be reconsidered.
Naming them in advance is what stops a decision from becoming folklore.

## Status and supersession

A record is `accepted`, `superseded`, or `deprecated`. Records are **immutable
once accepted**: to change a decision, write a new record that supersedes it.
Editing an accepted record destroys the only evidence of what was believed at
the time.

Amendments are the exception and must say what they amend and why the change is
an amendment rather than a new decision. An amendment that reverses the decision
is not an amendment.

## Numbering

Number records so they can be cited in code and commit messages, and never reuse
a number. A gap in the sequence is fine; a reused number makes every old
citation wrong.

## What not to write

- **No unmeasured performance claims.** "Faster" without a number is a
  preference.
- **No decisions still under discussion.** Those belong in a plan until settled.
- **No implementation detail** that will drift within a release. The record holds
  the choice, not the code.
