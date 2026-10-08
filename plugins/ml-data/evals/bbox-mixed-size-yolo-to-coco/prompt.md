---
description: Convert confirmed normalized YOLO labels for differently sized images to COCO, preserving explicit category identities and distinguishing supplied-data calculations from unperformed validation.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bbox-annotation-format-conversion-check]
---

We need a proposed Python conversion script for a synthetic YOLO export before importing it into a COCO-based annotation viewer. The export owner confirmed that each row is class_index, cx, cy, width, height, with all four coordinates normalized to the row's image dimensions. This is a supplied-data exercise; do not run code, inspect real images, write files, call external services or train anything. Reading local skill guidance is allowed.

The export's image table is:

| Image ID | File | Width | Height |
| --- | --- | --- | --- |
| A | a.png | 800 | 400 |
| B | b.png | 400 | 800 |

The names file is in this order: person, forklift. The destination viewer's supplied category registry is category 18 = person and category 3 = forklift.

The two annotation rows are:

- A, annotation a1: 0 0.25 0.50 0.20 0.25
- B, annotation b1: 1 0.75 0.25 0.20 0.125

Please propose the conversion code, show what these two records would become, and explain what would still need checking before trusting a larger export. We only have these two rows and the image table, not the image pixels or an execution environment.
