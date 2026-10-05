---
description: A background-removed glass bottle PNG has a binary alpha, a baked checkerboard patch and a grey fringe. The reply must reject it on the measurements and name the graded-matte fix and the composite checks.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [subject-cutout-alpha-matte-check]
---

I removed the background from my product photo of a clear glass bottle with an AI tool. I want to put the bottle on a blue gradient and keep the glass looking see-through. Can I use bottle.png as it is? Decide and tell me the next step.

I ran a pixel report on bottle.png (the file itself is not available to you, only this report):
- size 2000x3000, mode RGBA
- alpha min 0, max 255; 100.0% of pixels have alpha exactly 0 or 255, 0.0% are partial
- the whole glass body (x 640-1360, y 700-2600) has alpha 255 and shows the grey table colour (#8a8a8a) inside the bottle
- a grey and white (204 / 255) checkerboard in 16 px squares occupies the bottom-left corner, x 0-300, y 2860-3000, in pixels with alpha 255
- I placed it on a white background and see a thin 2 px grey line along the left edge of the bottle
- the label text "FERN & CO" on the bottle has the ampersand partly missing
