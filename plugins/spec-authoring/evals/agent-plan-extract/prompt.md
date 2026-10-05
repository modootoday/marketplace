---
description: What agent-plan-extract should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [agent-plan-extract]
---

The Plan subagent just returned a full plan document in its final report (frontmatter id cache-migration-plan) but it is read-only so it could not save it. Save that plan into our plans directory. It is long, so be careful not to lose anything.
