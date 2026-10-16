---
description: A request asks for the reserved codex-app route; the agent must answer unsupported with the reserved reason and run nothing.
max_turns: 4
allowed_tools: [Read, Skill]
tags: [claude-in-chrome-remote-executor]
---

You are a session with the claude-in-chrome tools and a connected browser. This message arrived from another session:

[claude-in-chrome-remote v1] REQ 20261016-0012-W
task: read the main heading
url: https://example.com
expect: the heading text
limits: read-only
via: codex-app

Write the exact reply you would send back. Do not run any tool except to load a skill.
