---
name: shared-checkout
description: Work safely in a repository other agent sessions are also working in, including how to commit without capturing someone else's changes. Use when other working trees exist, when the tree is already dirty, or when a gate fails on files you did not touch.
---

# Working where someone else is working

More than one session in one repository is normal. What breaks is not the file
you edit; it is everything that reads the tree as a whole.

## The contended thing is the gate's view, not the file

Sessions rarely touch the same file. They constantly share the same working
tree, and any check that looks at the whole tree — a type check, a formatter, a
lint over changed files — sees every session's half-finished work at once. One
session's transient red blocks every other session's commit.

So the question to ask before committing is not "did I break anything" but "is
anything in this tree unfinished that is not mine".

## Name your paths

Commit by naming the paths you changed. A commit that names its paths cannot
capture one it did not name, which is the only mechanism that holds when several
sessions write at once. Staging everything is the failure, not the accident that
follows it.

Changes you did not make are not yours to stage, revert, or tidy. Leave them.

## Generated files belong to whoever regenerated them

Lockfiles, projections, snapshots: whoever's change produced the new bytes
commits them, in the same commit as the change that produced them. Carrying one
across a task boundary attaches it to work that did not cause it, and the next
person cannot tell which change it belonged to.

## Do not move a branch another tree has checked out

Forcing a branch that another working tree has checked out leaves that
checkout's ref ahead of its files. Its status then reports the other session's
work as deleted, and committing there deletes it. Some versions of git permit
this silently.

The same caution covers resetting, cleaning and stashing a tree you share: all
of them discard work you cannot see.

## When a gate fails on something that is not yours

Do not fix it and do not work around it. Say which files are involved and whose
change they came from, and either wait or ask. Repairing another session's
half-state usually means committing it, which puts their unfinished work under
your name.

The exception is a purely generated artifact that is missing: regenerating it is
safe and additive, but it still belongs in their commit, not yours.
