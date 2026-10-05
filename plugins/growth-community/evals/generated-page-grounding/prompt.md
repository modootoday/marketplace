---
description: What site-content-grounding-check should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [site-content-grounding-check]
---

An AI generated a landing page for my app from my README. Review it before I publish.

README (the only source): "Notesync is a desktop notes app. Features: offline mode, CSV export, dark theme." I also have one screenshot, which shows the CSV export dialog.

Generated page text:
- Headline: "Notesync: the AI-powered notes platform"
- "Trusted by 5,000 teams worldwide"
- Feature cards: "Offline mode", "CSV export", "Dark theme", "AI-powered insights"
- "Rated 4.9 stars"
- Button "Download for free" with href="#"
- Footer: "Contact: hello@notesync.example"

Tell me what to change.
