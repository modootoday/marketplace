---
name: rule-layering
description: Keep one source of rules per package and project it into the filename each coding agent expects, splitting always-loaded constraints from the document read on demand. Use when a repository is read by more than one agent, or when rule files have started to disagree.
---

# Layering rules across agents

Coding agents do not agree on what a rule file is called. Each expects its own
filename in the package root. Keeping one copy per agent means keeping copies,
and copies drift silently: nobody notices that two of the three stopped saying
the same thing.

## One source, several names

Keep the rules in one directory inside the package and make each agent's
expected filename a link to it. The direction never reverses: the projection is
read, the source is edited. Editing through a projection is editing the source,
which is fine; treating a projection as its own document is not.

When a projection is a real file rather than a link, that is the drift already
happening. Move its content into the source and replace it.

## Two documents, not one

Split the rules in two:

**The always-loaded document** holds constraints only. Its size is paid on every
turn of every session, so every line competes with the work. Rules, and the one
sentence each needs to be obeyed rather than argued with.

**The on-demand document** holds everything else: the reasoning, the
measurements, the history, the runbook. Read when someone asks why.

The split is not stylistic. A rule file that grows to hold reasoning stops being
loadable, and the usual response is to stop loading it.

## What must not be in the always-loaded document

- dated progress notes, "phase 2 complete"
- task lists and open questions
- changelogs
- runbooks and operational procedure

Each of these changes on a different clock than the rules do. Mixing them means
the rules churn at the speed of the fastest-moving section, and a document that
churns is a document nobody trusts to be current.

## Judging a rule

A rule earns its place in the loaded document if breaking it causes something
the reader cannot see. Rules that restate what the code already makes obvious
cost tokens on every turn and change nothing.

Write the reason with the rule, in the same breath. A rule with no reason is
deleted by the first person it inconveniences.

## Drift is normal, silence is not

Projections break routinely: a package is added, a package is renamed, a file
moves. That is expected and cheap to repair. What is not acceptable is not
knowing. Check projections wherever you already check formatting, so a missing
link is caught by a machine rather than by an agent that quietly reads no rules
at all.
