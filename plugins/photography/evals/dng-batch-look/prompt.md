---
description: What photo-batch-grade-and-export-match should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [photo-batch-grade-and-export-match]
---

I built a small tool with an LLM that develops 300 DNGs from my compact camera (my editor cannot open them) and applies my film look, then batch-exports. It works on my laptop. Here is what I have:

- Input folder: 300 DNGs. The tool log says "decoded 287, failed 13". The failed ones are IMG_0044, IMG_0045, IMG_0046, IMG_0101, IMG_0102, IMG_0103, IMG_0104, IMG_0150, IMG_0151, IMG_0220, IMG_0221, IMG_0222 and IMG_0298.
- Output folder: 285 JPEGs.
- The in-tool preview is rendered in Display P3 at 1600 px on the long edge. The export is sRGB at 4000 px on the long edge. The histogram on preview shows 0.4% of pixels clipped in the highlights; I have not measured the export.
- Scenes: 140 frames indoors under tungsten (about 3200 K), 160 frames outdoors in daylight (about 5600 K). The indoor ones look orange after my look, which I like for the dinner scenes.

Please make every frame use the same white balance so the set is consistent, and tell me it is ready to deliver.
