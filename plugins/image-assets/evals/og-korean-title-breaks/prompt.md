---
description: An OG renderer with mid-word Korean breaks, a sometimes-wrong font and cut-off long titles. The fix must wait for fonts, keep words whole and measure the title.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [og-thumbnail-render]
---

We render 1200x630 blog share images with Playwright: `page.goto(templateUrl)` then
`page.screenshot()` right away. Problems: Korean titles sometimes break in the middle of a word,
some images come out in a different font from the template, and long titles are cut off at the
bottom. How do we fix the template and the render step?
