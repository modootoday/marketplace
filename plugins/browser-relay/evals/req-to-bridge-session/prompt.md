---
description: This session has no browser tools but a session named browser-bridge holds a browser; the agent must write the request in the fixed message format.
max_turns: 4
allowed_tools: [Read, Skill]
tags: [claude-in-chrome-remote-relay]
---

In this session you have no claude-in-chrome tools. A session named browser-bridge is connected to this account and has a connected browser. Ask it to read the main heading of https://example.com, read-only, without signing in, within 3 minutes. Do not run any tool except to load a skill. Show me the exact message you would send to browser-bridge.
