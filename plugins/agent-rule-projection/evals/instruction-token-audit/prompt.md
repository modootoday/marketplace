---
description: What instruction-token-audit should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [instruction-token-audit]
---

Our monorepo has a root AGENTS.md with a 12 KB budget and about 60 package AGENTS.md files with a 4 KB budget each, many written in Korean. Are these byte budgets sensible in terms of what they cost the model? We have an Anthropic API key in a local env file (ANTHROPIC_API_KEY) that is not committed. You can't see the repo from here, so give me the measurement plan and the script outline I should run.
