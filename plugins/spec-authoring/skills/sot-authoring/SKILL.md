---
name: sot-authoring
description: Write a source-of-truth document that can be proven stale, by pairing every rule with a command that checks it. Use when recording an invariant, a convention, or a decision that later work must not quietly contradict.
---

# Writing a source of truth

A rule document decays the moment the code moves. The usual defence is review,
which fails quietly: nobody notices that a paragraph stopped being true. The
defence that works is to give the document a way to fail.

## The one thing that makes it different

**Every source-of-truth document carries a command that checks it.** Not a
description of how to check it. A command a machine runs.

```
verify: what a reader should confirm, in a sentence
check_cmd: the command that confirms it, exiting non-zero when the rule is broken
```

A document whose check passes is not proven right; it is proven not-yet-wrong,
which is all a document can offer. A document with no check must say so
explicitly rather than leave the reader guessing:

```
check: manual
```

"No check yet" and "a person reviews this" are different states. Collapsing them
is how a document goes stale without anyone noticing.

## Writing the check

- **Make it fail first.** Break the rule on purpose and watch the command exit
  non-zero. A check that has never failed has not been shown to work.
- **Check the rule, not the file.** Asserting that a paragraph exists proves
  nothing. Assert the condition the paragraph describes.
- **Prefer a command over a script** until the logic outgrows one line, then move
  it to a file the document names.
- **Let it pass when the subject is absent.** A rule about a directory that does
  not exist yet should pass, not fail; otherwise the document cannot be written
  before the thing it governs.

## What belongs here, and what does not

A source of truth holds **invariants**: things that must stay true. It does not
hold proposals, history, or work in progress.

| Content                      | Where it goes                       |
| ---------------------------- | ----------------------------------- |
| an invariant                 | here                                |
| a proposal, still arguable   | a plan document                     |
| why a decision was made      | a decision record                   |
| what changed and when        | version control                     |
| a task list                  | anywhere but here                   |

The test: if a reader could reasonably do the opposite next week, it is not an
invariant yet.

## Shape

State the rule, then the reason it exists, then the measurement that produced
it. A rule with no reason gets deleted by the next person who finds it
inconvenient. A reason with no measurement is an opinion.

Keep each document to one subject. When it outgrows its length budget, split it
into a family rather than compressing it: compression removes the reasons first,
and the reasons are the part that keeps the rule alive.

## Naming and linking

Give the document a stable identifier and refer to other documents by that
identifier, never by file path. Paths move; identifiers should not. Register
every document in one index, so "where is the rule about X" has one answer.
