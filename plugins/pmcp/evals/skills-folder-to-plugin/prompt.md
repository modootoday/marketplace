---
description: What marketplace-plugin-scaffold should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [marketplace-plugin-scaffold]
---

I have a folder of agent assets I want to publish as a plugin in our company's internal plugin marketplace so our pmcp skill server can serve it. The marketplace is meant for internal staff only. Right now it looks like this (you can't see it, so this is the whole picture):

```
finance-assets/
  month-end-close/SKILL.md        frontmatter: name: month-end-close, description: ..., metadata: { tier: open }
  vat-check/SKILL.md              frontmatter: name: vat-check, no description yet
  reconcile.md                    a slash command people run by hand
  auditor.md                      a subagent definition
  mcp.json                        { "ledger": { "command": "node", "args": ["ledger-server.js"] } }
```

Give me the marketplace layout with the manifest files' content, where each file goes, and how to confirm the server will list everything.
