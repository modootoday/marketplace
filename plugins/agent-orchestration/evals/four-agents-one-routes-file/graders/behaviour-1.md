---
type: llm
---

Context the reply answers: the user runs four agents at once, each in its own git worktree, adding endpoints (billing, search, export, audit). Each owns a handler file and tests. Shared: routes.json (array of {name, path, since} plus top-level schemaVersion going from 7 to 8 once) and, outside the worktrees, one local Postgres on port 5432 and a shared .cache/ directory. The user planned to tell every agent to edit routes.json carefully and bump schemaVersion if still 7. The user asks for a plan including what they do after the agents finish, and may re-run the merge if an agent is restarted.

PASS only if the plan does all of these:

1. Rejects the "edit carefully" instruction: no agent edits routes.json; routes.json and the schemaVersion bump are owned by the coordinator.
2. Has each agent write its own pending file (one per agent, not a shared file) containing the route entry it needs, and the coordinator merges the pending files one at a time.
3. Makes the schemaVersion bump happen once, by the coordinator, applying it only if the current value equals the recorded old value 7 (compare-and-set), so four agents do not each bump it or produce 11.
4. Treats the merge as idempotent: entries that already exist in routes.json are skipped and a repeated or restarted merge changes nothing; it says what happens on a re-run.

FAIL if any item is missing.
