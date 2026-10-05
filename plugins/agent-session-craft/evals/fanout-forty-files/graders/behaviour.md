---
type: llm
---

Context the reply answers: the user has a TypeScript monorepo with 46 packages under packages/. Each needs a README.md from a template, a "files" field in its package.json, and its exports added to the one shared root file docs/packages.md. The user asked for a parallel-subagent plan and the prompts. The repository is not visible to the assistant and the package names were not given, so placeholders or numbered ranges for package names, paths and commands are expected and are not a defect.

PASS only if the plan does all of these (wording is free):

1. Puts the shared instructions in one brief file that every subagent reads, with short per-agent prompts that assign each agent an explicit list or numbered range of packages.
2. Splits the 46 packages into a few chunks of roughly 15 to 25 each (two or three agents), with each agent owning disjoint packages.
3. Includes hard rules for subagents: no git commits (or no state-changing git), no builds or tests while working with at most one check at the end, and edit only their own packages.
4. Keeps the shared file docs/packages.md out of the subagents' hands: they return the needed entries as notes and one integration step or agent applies them.
5. Says only the coordinator (not the subagents) commits.

FAIL if any item is missing.
