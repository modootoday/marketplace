---
description: What remotion-explainer should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [remotion-explainer]
---

Write the Remotion composition for our 30 fps, 1920x1080 explainer. Storyboard:

- Scene 1, 4 seconds: caption "Every month our team spends hours copying numbers from invoices into spreadsheets by hand, and mistakes slip through" (18 words), image `logo.png` in the public folder.
- Scene 2, 6.5 seconds: a bar chart that animates from 0 to 80, the label "Time saved".
- Scene 3, 5 seconds: closing line "Try it free", a remote image at https://cdn.example.com/hero.jpg, font "Pretendard" loaded with a CSS @import in the component.

A colleague already typed `durationInFrames={450}` and wants a CSS transition on the bar. Also tell me how to prove the render is right.
