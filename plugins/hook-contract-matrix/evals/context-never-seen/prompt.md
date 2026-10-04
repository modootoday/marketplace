---
description: A hook that exits 0 and whose context the model never mentions. The answer must prove each stage instead of trusting the exit code.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [hook-compat]
---

My PostToolUse hook prints JSON with additionalContext ("Remember: staging only") and exits 0.
The agent never acts on it or mentions it. The hook is in the settings file. Is it working, and
how would I find out?
