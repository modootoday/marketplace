---
description: What mcp-client-probe should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [mcp-client-probe]
---

Our stdio MCP server works in Claude Code but Codex and Gemini CLI behave differently, and the docs disagree about which protocol version each client sends and how headless tool calls get permission. How can I find out what each client really does?
