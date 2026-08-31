---
name: rule-enforcement
description: Judge whether a written agent rule will actually hold, and decide whether to enforce it, keep it as guidance, or delete it. Use when adding a rule to an agent instruction file, or when the same mistake keeps recurring despite being documented.
---

# Written is not enforced

A rule in an instruction file holds only while some model, this turn, happens to
have it in context and happens to apply it. That is not a control. It is a hope
with good documentation.

The evidence is easy to gather in any project that has been running a while:
count the rules, then count the places that would stop a violation. The gap is
usually two orders of magnitude, and the rules that got written twice are the
ones that were violated after the first writing.

## The test for a new rule

Before adding one, answer: **what happens when it is broken?**

| Answer | What the rule should be |
| --- | --- |
| A machine can tell, cheaply | a check — a hook, a lint, a gate |
| A machine can tell, expensively | a check that runs at a boundary, not every turn |
| Only a person can tell | guidance, and say so where it is written |
| Nothing happens | delete it |

A rule whose violation produces no consequence is not a rule; it is a
preference, and mixing preferences into the rule file dilutes the ones that
matter.

## Prefer the narrowest enforcement that works

A guard that fires on legitimate work gets switched off, and a guard that is off
protects nothing. So enforce the specific shape you have actually seen go wrong,
not the general category it belongs to. Widen later, with evidence.

Fail-closed for damage that cannot be undone; fail-open for conveniences. Say
which one each guard is, in the guard's own documentation.

## Recurrence is the signal

When the same mistake happens after being written down, the correct response is
not to write it more emphatically. It is to move it from prose to a check, or to
accept that it cannot be checked and stop pretending the document prevents it.

Track which rules recurred. That list, not the total, tells you where to spend.

## What to do with rules you cannot enforce

Keep them, and mark them. A rule labelled as unenforced is honest and still
useful: a reviewer can look for it, and nobody mistakes the document for a
guarantee. An unmarked one quietly implies a control that does not exist, which
is worse than saying nothing.

## Cost

Every always-loaded rule is paid on every turn of every session. A rule file
that grows without pruning eventually competes with the work it governs. When
enforcement moves a rule into a check, delete the prose or reduce it to a
pointer; keeping both means maintaining two statements that will drift.
