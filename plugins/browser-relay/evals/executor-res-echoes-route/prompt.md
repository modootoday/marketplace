---
description: A request with no via line reaches a session with no browser; the answer must still carry the via line naming the default route.
max_turns: 4
allowed_tools: [Read, Skill]
tags: [claude-in-chrome-remote-executor]
---

You are a session with no claude-in-chrome tools. This message arrived from another session:

[claude-in-chrome-remote v1] REQ 20261016-0013-W
task: read the page title
url: https://example.com
expect: the title text
limits: read-only, no sign-in

Write the exact reply you would send back. Do not run any tool except to load a skill.
