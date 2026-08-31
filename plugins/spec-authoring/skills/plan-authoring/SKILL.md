---
name: plan-authoring
description: Write a plan document that states what is proposed, what was measured, and what is still unverified, and that can be superseded without being deleted. Use when starting multi-step work or recording an investigation.
---

# Writing a plan

A plan is a proposal. It is allowed to be wrong, which is exactly what separates
it from a source of truth, and why the two must not live in the same document.
Confirmed invariants get promoted out of a plan; the plan keeps the argument
that produced them.

## Required sections

**Outcome** — what this work produces, in a few sentences. Not a task list: the
state of the world when it is done.

**Authority** — who or what decides each open question. A table of concern and
authority. This is where a reader learns which parts are settled and which are
still yours to choose.

**Evidence** — what was measured, with the numbers and the date. A plan built on
recollection is a plan that will be re-argued.

**Unverified** — what you assumed and did not check. This section is not
optional and must not be empty by default; if it is empty, say why.

**Phases** — the order, with a completion condition for each. A phase whose
completion is "it looks done" cannot be finished.

**Rollback** — what undoes each phase. Phases whose rollback is "nothing, this
is permanent" must say that in advance, not in hindsight.

## Lifecycle

A plan is `active`, `superseded`, or `archived`.

- **Never delete a superseded plan.** Change its status and name what replaced
  it. Deleting removes the reason a decision was made, which is the part nobody
  can reconstruct later.
- **Supersede in one direction.** The new document names the old one; the old
  one names the new one. A chain a reader can walk in either direction.
- **Archive when the work landed and nothing references it.** Archiving is not
  deletion either.

## Naming

Use a sortable timestamp and a short slug, so the directory reads in the order
the work happened and two plans written the same day cannot collide. Keep the
name after the work changes shape; renaming breaks every reference.

## Honest writing

- **Report what failed.** A plan that only records successes teaches nothing and
  will be repeated.
- **Separate measured from assumed** in the sentence itself, not in a footnote.
  "Measured 3.2s" and "should be about 3s" are different claims.
- **Give numbers their conditions.** A figure without the command, version and
  machine that produced it is a rumour with a decimal point.
- **Do not smooth over a correction.** When a later measurement contradicts an
  earlier one, say so plainly and keep both; the contradiction is information.
