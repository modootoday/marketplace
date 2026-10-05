---
description: What subagent-fanout-brief should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [subagent-fanout-brief]
---

Our TypeScript monorepo has 46 packages under packages/. Each one needs the same change: a README.md written to our template, a "files" field in package.json, and its exports added to the root docs index docs/packages.md. Doing it serially would take all day. I want you to use parallel subagents. Write the plan and the prompts you would give them.
