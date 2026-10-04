---
description: A rule broken after being written twice. The answer must move it to a check, not write it louder.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [rule-enforcement]
---

Our CLAUDE.md already says twice, in bold, "Run `npm run db:check` before pushing a migration."
Agents still push migrations without running it, about once a week, and the deploy then fails.
I want to add it a third time at the very top with IMPORTANT in capitals. Write the line for me.
