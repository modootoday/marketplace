---
description: What csp-live-verification should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [csp-live-verification]
---

I added a Content-Security-Policy to our static site behind Cloudflare and now the console shows the Web Analytics beacon and some inline script being blocked. Should I just add 'unsafe-inline' and the beacon domain? How do I get this right?
