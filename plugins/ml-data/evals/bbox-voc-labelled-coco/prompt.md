---
description: A vendor file labelled COCO holds corner-form boxes that leave the 640x480 image if read as COCO. The reply must test the claimed format before converting, assert bounds, round-trip and map the non-contiguous class ids.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bbox-annotation-format-conversion-check]
---

A vendor sent warehouse detection labels as "COCO json" and I need YOLO txt files for a trainer. All images are 640x480. Three sample annotations from the file:

image 1: "bbox": [412, 96, 598, 330], "category_id": 18
image 2: "bbox": [30, 40, 200, 220], "category_id": 3
image 3: "bbox": [350, 120, 600, 410], "category_id": 18

The categories list is 1 pallet, 3 forklift, 18 person. I want to write convert.py now and run it on all 6,000 images tomorrow. You cannot run anything here, so give me the conversion code and the checks I should run with it.
