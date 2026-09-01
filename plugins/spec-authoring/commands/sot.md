---
description: Start a source-of-truth document — an invariant paired with a command that proves it is still true.
argument-hint: '[the invariant this document owns]'
---

Start a source-of-truth document for: $ARGUMENTS

A rule document decays the moment the code moves, and review fails quietly.
Follow the `sot-authoring` skill; this command only puts a correctly shaped
document in the right place, with the one field that makes it different.

## Before writing

1. **Check this is an invariant.** If a reader could reasonably do the opposite
   next week, it is a proposal, not a rule. Say so and offer `/spec-authoring:plan`
   instead. This is the most common way a rule document goes wrong.
2. **Find where these documents live** and match the existing naming. Do not
   invent a location or a filename shape.
3. **Check the subject is not already owned.** One subject, one document. If a
   document already owns it, extend that one or split the family rather than
   opening a rival.

## The field that matters

Every source-of-truth document carries a command that checks it:

```
verify: what a reader should confirm, in a sentence
check_cmd: the command that confirms it, exiting non-zero when the rule is broken
```

If there is no such command yet, write `check: manual` and say who reviews it.
"No check yet" and "a person reviews this" are different states, and collapsing
them is how a document goes stale with nobody noticing.

Write the check to **check the rule, not the file.** Asserting that a paragraph
exists proves nothing; assert the condition the paragraph describes. Let it pass
when its subject is absent, so the rule can be written before the thing it
governs exists.

**Then break the rule on purpose and watch the command fail.** A check that has
never failed has not been shown to work. Report what you saw.

## Shape

State the rule, then the reason it exists, then the measurement that produced
it. A rule with no reason gets deleted by the next person who finds it
inconvenient; a reason with no measurement is an opinion.

Give the document a stable identifier, refer to other documents by identifier
rather than by path, and register it wherever this project indexes them.

Keep it to one subject. When it outgrows its length, split it into a family
rather than compressing it: compression removes the reasons first, and the
reasons are what keep the rule alive.
