---
name: project-plan-scope-and-schedule-check
description: Draft and check the paperwork of a small project plan with the arithmetic shown - a charter (objective, in and out of scope, deliverables, assumptions, approvers), a work breakdown with an owner and estimate basis per task and a check that no deliverable lacks a task, a schedule check (critical path, buffer against the deadline, dependency cycles), and a change order that sets baseline against new scope, cost and schedule with an approval line. Use when someone asks for a project charter, a WBS or task breakdown, a check of schedule slack, or a change order or change request write-up, and gives the tasks, durations and deadline. Not for sizing a skill-build pilot (pilot-scope-sizing) or turning a feature brief into user stories (requirement-to-testable-stories).
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [project charter, work breakdown, WBS, critical path, schedule buffer, change order, change request, scope]
---

# Project plan: scope and schedule check

A plan model gets wrong in three quiet ways: a deliverable has no task, the
critical path is added up wrongly or ignores a shared person, and a change is
described without saying what it does to the date. Work from the numbers the
user gave, show the arithmetic, and leave the approval to the people named.

## Rules

- **Use only given facts.** Durations, costs, rates, deadlines and names come
  from the user. Anything else (a buffer policy, a resource limit, who
  approves) is an assumption: list it under "Assumptions" and ask. Do not
  invent owners; write a role or "to be assigned".
- **Show the arithmetic.** Write each path as a sum ("config 3 + training 2 +
  cutover 1 = 6 weeks"), not just the total.
- **Charter**: objective, in scope, out of scope, deliverables, success
  measure, assumptions, constraints (date, budget), approvers. Leave a blank
  "to confirm" where the user gave nothing; never fill it with a plausible
  guess.
- **Work breakdown**: one block per deliverable, each task with owner (role or
  "to be assigned"), estimate and the basis of the estimate (given by the
  user, analogy, guess). End with a coverage check: every in-scope deliverable
  has at least one task, and no task serves nothing in scope.
- **Schedule check**, in this order:
  1. List each task with duration and predecessors; say if a predecessor is
     missing or points back to a later task (a cycle).
  2. Compute the longest path through the predecessors (the critical path)
     and its length. Tasks that need the same person or the same room cannot
     overlap: if the user says so, add that as a dependency and say you did.
  3. Compare with the deadline: float = deadline minus critical path. If the
     user gave a buffer policy, compare the float with it; if not, say
     the plan has no stated buffer and propose one as an assumption.
  4. Name the tasks with no float and what slipping each one by a week does.
- **Change order**: a table of baseline against new for scope (what was added
  or removed), tasks, critical path, finish date, cost, and the buffer left.
  Cost is the added effort times the rate the user gave; with no rate, give
  the effort and leave the price blank. Close with the approval line (who must
  sign, left blank), what is not yet known, and the option of removing
  something instead.
- **Say what you could not verify**: holidays, availability, contract terms,
  and whether the estimates are real. A sponsor or contract owner approves
  the change; this output is a draft for them. Put a status line in the change
  order itself: "Draft for <approver role> to review; not approved until
  signed."

## Output

1. Assumptions and open questions (first, short)
2. Charter, if asked
3. Work breakdown with the coverage check, if asked
4. Schedule check: tasks and predecessors, critical path as a sum, float
   against deadline and buffer, cycles found
5. Change order, if asked: baseline against new, approval line
6. What this could not verify
