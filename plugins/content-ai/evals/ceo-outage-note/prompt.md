---
description: What plain-language-technical-explainer should change in a note from an outage to a CEO.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [plain-language-technical-explainer]
---

Write a note for our CEO, who is not technical, about last night's payment problem.

Facts: the payment queue stalled for 41 minutes, from 02:10 to 02:51 UTC. 312 orders were delayed. No data was lost. The cause was a full disk on one node. The fix is a disk alert that the team will add next Friday. Nothing else is known yet, and nobody has been named as owner of the fix.
