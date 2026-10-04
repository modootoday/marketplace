---
description: Measurements from a rendered thumbnail with clipping, low contrast, a distorted logo and an unsupported claim. QA must block publishing and say where each defect is.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [asset-qa-review]
---

Our renderer produced a 1200x630 blog thumbnail and reports these measurements. Can we publish it?

- Title box: 1080 px wide; the rendered title line measures 1130 px.
- Subtitle colour #9AA0A6 on a #FFFFFF background, 22 px text.
- Logo source file is 200x80 px; it is drawn at 120x60 px in the bottom right corner.
- Badge text in the top left: "The best coffee in Seoul".
- Fonts used: Pretendard (licensed for web and print).
