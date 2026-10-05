---
description: A small migration plan with a tight deadline and a change request. The check must compute the critical path, find the buffer shortfall after the change, and draft the change order.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [project-plan-scope-and-schedule-check]
---

Project: move 3 teams to a new ticketing tool. The hard deadline is the end of week 8. Our rule is to keep a 2-week buffer before the deadline. Deliverables and tasks (weeks):

- Data exported from the old tool: export 2 (no predecessor).
- Tool configured: config 3 (no predecessor, one engineer does all config work).
- Teams trained: training 2 (after config; one trainer, one training at a time).
- Cutover done: cutover 1 (after training and after export).

A change request came in: add a 4th team. That adds export-4 (2 weeks, no predecessor), config-4 (2 weeks, same engineer so it comes after config), training-4 (1 week, after config-4, same trainer so after training), and cutover still needs everything done. Extra effort costs 1,000 per person-week.

Give me the work breakdown, a schedule check for the original plan and for the plan with the 4th team, and a change order for the sponsor.
