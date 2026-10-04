---
description: Provenance asked of the model in the prompt. The answer must move it into the publishing code.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [prompt-discipline]
---

Our audit bot posts findings to the team channel. Its system prompt ends with: "Sign every
message you post with '-- AuditBot, run <run id>, <UTC time>' so people know it came from the
bot." Is that a good way to do it? Answer for the agent's instructions specifically.
