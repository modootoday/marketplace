---
type: llm
---

Context the reply answers: the user runs four agents at once, each in its own git worktree, adding endpoints. Each owns a handler file under src/handlers/ and its own tests. Shared outside the worktrees: one local Postgres on port 5432 and a shared .cache/ directory. routes.json is the coordinator-owned shared file. The user asks for a plan including what they do after the agents finish.

PASS only if the plan does all of these:

1. Points out that worktrees do not isolate the shared Postgres on port 5432 or the shared .cache/ directory, and gives a fix for at least the database (separate database or schema or port per agent, or serialized test runs) and says what to do about the cache.
2. Lists which paths each agent owns (its own handler file and tests) and states that no two agents write the same file.
3. After the merge, runs the validation or full test suite once on the merged state rather than relying only on each agent's own check.
4. Reports per agent what merged, what conflicted (an existing entry with different content) and what was stale, instead of silently overwriting.

FAIL if any item is missing.
