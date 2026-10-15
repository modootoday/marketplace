---
description: A request arrives at a session that has no browser tools; the agent must answer unsupported in the fixed format.
max_turns: 4
allowed_tools: [Read, Skill]
tags: [claude-in-chrome-remote-executor]
---

You are a session with no claude-in-chrome tools. This message arrived from another session:

[claude-in-chrome-remote v1] REQ 20261016-0007-W
task: read the main heading
url: https://example.com
expect: the heading text
limits: read-only

Write the exact reply you would send back. Do not run any tool except to load a skill.
