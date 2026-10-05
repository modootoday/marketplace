---
name: flow-diagram-completeness-check
description: Check a workflow or process flow, given as a diagram description, list of steps or arrows, for missing branches, dead ends and loops with no exit - enumerate every node and edge first, check that each decision has an edge for every outcome and each path reaches an end, list each loop with its exit condition and bound, and report findings by node name in a table. Use when someone pastes a flow, process, state or approval diagram and asks if anything is missing, whether it is complete, or to check the paths, exceptions and loops. Not for drawing a new diagram, for a sitemap, or for checking that the flow matches how the system actually runs.
metadata:
  tier: open
  level: L1
  domain: product-planning
  install: optional
  keywords: [flowchart, workflow, process diagram, missing branch, dead end, loop, exit condition, exception path]
---

# Flow diagram completeness check

A flow that looks complete usually is not: the happy path is drawn, the
decision has a "yes" and no "no", and the revise-and-resubmit loop has no
limit. Do not say "complete" until the nodes and edges are enumerated.

This rests on one practitioner report. Treat the checklist as a review aid,
not as proof that a flow is correct.

## Procedure

1. **Enumerate nodes.** Number or name every node and mark its kind: start,
   end, action, decision, wait or external call. Note nodes mentioned in the
   text but missing from the arrows.
2. **Enumerate edges** as `from -> to [label]`. Do not infer an edge the user
   did not give; list "implied" ones separately as questions.
3. **Check each decision.** Does it have an edge for every outcome it can
   have (yes, no, timeout, error, unknown)? A binary decision with one edge
   is a finding.
4. **Check each action that can fail** (payment, external call, upload,
   approval). If the user gave only a success exit, report a missing failure
   branch and say what must be decided there (retry, cancel, escalate).
5. **Check each path from the start** reaches an end. List nodes with no
   outgoing edge that are not an end (dead ends) and nodes with no incoming
   edge that are not a start (unreachable).
6. **List loops.** For each cycle, give the nodes in it, its exit condition
   and whether it is bounded (a count, a deadline, a reviewer decision). A
   loop whose only exit depends on someone behaving well is unbounded.
7. **Report** in a table: id, node(s), problem, what to decide. Ask the owner
   to decide; do not redraw the flow with your own answers unless asked.

## Rules

- Name the nodes exactly as the user did.
- The result says what was checked (counts of nodes and edges, decisions,
  loops) so "no findings" is something that can be audited.
- Say what could not be checked: behaviour that is not in the diagram,
  whether the real system follows it, and any text that was not given.
- If the input is too thin to enumerate (an image you cannot read, one line),
  ask for the arrows instead of guessing.

## Output

1. Inventory: N nodes, M edges, the decisions, the loops
2. Findings table
3. Questions for the flow owner
4. What was not checked
