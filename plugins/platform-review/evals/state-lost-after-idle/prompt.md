---
description: What mv3-extension-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [mv3-extension-review]
---

Our Manifest V3 extension keeps a Map of open jobs in a global variable in the service worker and uses setInterval to poll every 5 minutes. Users say it 'forgets' jobs after a while. Why?
