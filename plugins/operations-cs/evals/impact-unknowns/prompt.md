---
description: A postmortem impact section with gaps. The draft must mark unknowns instead of estimating them as facts.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [incident-postmortem]
---

Write the Impact section of our postmortem. Our image CDN served stale images for about two hours
on 2026-10-02. We know 312 support tickets mentioned it. We don't have request logs for that
window, and we don't know how many users saw stale images or whether any orders were affected.
