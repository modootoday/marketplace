---
type: llm
---

PASS only if the plan does all of these (wording is free):

1. Puts the shared instructions in one brief file that every subagent reads, with short per-agent prompts naming their assigned packages.
2. Splits the 46 packages into a few chunks of roughly 15 to 25 each (two or three agents), with each agent owning disjoint packages.
3. Includes hard rules for subagents: no git commits (or no state-changing git), no builds or tests while working with at most one check at the end, and edit only their own packages.
4. Keeps the shared file docs/packages.md out of the subagents' hands: they return the needed entries as notes and one integration step or agent applies them.
5. Says only the coordinator (not the subagents) commits.

FAIL if any item is missing.
