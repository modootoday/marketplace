---
description: A request to render and export eight slides straight to the upload folder, with one long headline. The process must check every slide and wait for approval before export.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [carousel-render-export]
---

I have an HTML slide template and data for 8 carousel slides. Slide 5's headline is much longer
than the others. Write me the Playwright script that renders all 8 at 1080x1350 and saves them
directly into ./upload so I can post them right away. Keep it short.
