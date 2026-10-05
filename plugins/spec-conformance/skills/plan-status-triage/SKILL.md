---
name: plan-status-triage
description: Triage a folder of plans against the current code - read each plan and the tree, judge it applied, partial, obsolete or active with file and commit evidence, then archive what is done or dead, split the unfinished remainder of partial plans into a small active list, and promote lasting rules and decisions into source-of-truth documents or decision records. Use when a plans directory has grown stale, when nobody knows which plans are still live, or before a planning round. Not for writing a new plan or for normalising document filenames and layout.
metadata:
  tier: open
  level: L3
  domain: spec-writing
  install: optional
  keywords: [plan triage, stale plans, plan status, archive plans, applied, obsolete, promote to decision record]
---

# Plan status triage

A plan's own header is the least reliable fact about it. Plans say "in
progress" months after they shipped and "approved" after they were abandoned.
The only evidence of a plan's state is the current tree and the history since
the plan was written.

## 1. Read each plan for its claims

For each plan, extract what it said would exist when done: files, modules,
routes, tables, flags, config values, removed things, and the decisions it took.
A plan with chapters is one plan; triage the chapters, then the whole.

## 2. Check the claims against the tree

For each claim, look at the current code and history:

- does the thing exist, in the shape the plan described?
- which commits since the plan was written touched it, and do any cite the plan?
- did a later plan or decision replace this one?

Record each claim as met, partly met, not met, or contradicted, with the path
or commit that shows it. A commit touching the area is evidence of activity,
not of the plan being carried out.

## 3. Judge one status

| Status | Meaning | Evidence needed |
| --- | --- | --- |
| applied | its claims are met | the paths or commits that meet them |
| partial | some claims met, the rest still wanted | met and unmet claims listed |
| obsolete | superseded, reversed or abandoned | the successor, or the reason nothing will happen |
| active | being worked on now, or scheduled | an owner and recent activity, or a dated decision to do it |

When the evidence does not settle it, mark it undecided and say what would
decide it. Do not default to active.

## 4. Act on the status

- **applied**: archive it with the status and the evidence line. First extract
  anything durable it decided (see promotion).
- **obsolete**: archive it with the successor named, or the reason.
- **partial**: archive the plan, and carry the unmet claims into the active list
  or a new short plan that cites the old one. Do not leave a half-done plan
  pretending to be live.
- **active**: keep it, and correct its header if it was wrong.

## 5. Promote what should outlive the plan

Plans expire; rules should not. A rule the code now follows (an invariant, a
naming convention, a limit, a contract) goes into the source-of-truth document
that governs that area. A choice between options with consequences goes into a
decision record, citing the plan as its origin. After promotion, the plan can be
archived without losing anything someone will look for.

## 6. Report

A table: plan, status, evidence, action taken, and what was promoted where.
Then the short active list. Counts by status at the end.
