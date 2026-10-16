---
description: A request asks for the site-mcp route in a session that has no site-specific MCP tools; the agent must answer unsupported and name the missing route.
max_turns: 4
allowed_tools: [Read, Skill]
tags: [claude-in-chrome-remote-executor]
---

You are a session with no claude-in-chrome tools and no site-specific MCP tools. This message arrived from another session:

[claude-in-chrome-remote v1] REQ 20261016-0011-W
task: read the search volume trend for one keyword
url: https://example.com
expect: the numbers as a short list
limits: read-only
via: site-mcp

Write the exact reply you would send back. Do not run any tool except to load a skill.
