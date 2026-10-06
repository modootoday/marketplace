---
description: What parallel-write-partitioning-and-merge should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [parallel-write-partitioning-and-merge]
---

I am going to run four agents at the same time in one repository, each in its own git worktree, to add four new API endpoints: billing, search, export and audit. Each agent adds its own handler file under src/handlers/ and its own tests.

Two things are shared. First, every endpoint must be registered in routes.json, which holds an array of entries {name, path, since} and a top-level "schemaVersion" that must go from 7 to 8 once, because the new entries use a new field. Second, the tests of all four agents run against one local Postgres on port 5432 and a shared .cache/ directory configured outside the repo.

I was going to tell each agent "edit routes.json carefully, re-read it first, and bump schemaVersion if it is still 7". Plan how the four agents and I should work, including what I do after they finish. I may also have to re-run my merge step if one agent is restarted.
