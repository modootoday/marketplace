---
type: llm
---

Context the reply answers: the user wants agents used for two jobs. Job 1 is a CI failure from a renamed config key where three modules fail one after another in a call chain (each failure appears only after the previous one is fixed), about ten edits. Job 2 is a read-only check of 40 Dockerfiles for unpinned base image tags and root users, producing a list only. The reply is a plan, no work is done.

PASS only if the reply does all of these for Job 1:

1. Decides not to fan out Job 1 (one agent, or doing it directly) and gives the reason that the steps are sequential, dependent or small, not just "it is simple".
2. Does not recommend several parallel agents or a team for Job 1, and does not recommend one agent per module.

FAIL if any item is missing.
