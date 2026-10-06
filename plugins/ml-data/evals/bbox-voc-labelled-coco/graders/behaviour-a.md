---
type: llm
---

Context the reply answers: a user has vendor detection labels called "COCO json" and wants YOLO txt files. All images are 640x480. Sample annotations: image 1 bbox [412, 96, 598, 330] category 18; image 2 bbox [30, 40, 200, 220] category 3; image 3 bbox [350, 120, 600, 410] category 18. Read as COCO (x, y, width, height) boxes 1 and 3 end at x 1010 and 950, beyond the 640 pixel width; read as corner form (xmin, ymin, xmax, ymax) all three fit inside the image, so the file is probably Pascal VOC style mislabelled as COCO. Categories are 1 pallet, 3 forklift, 18 person. Nothing can be run in this conversation. The user asked for conversion code and the checks to run.

PASS only if the reply does all of these:
1. Treats the "COCO" label as a claim to test and says, from the three samples, that read as x, y, width, height boxes 1 and 3 extend past the 640 pixel image width (x plus width 1010 and 950), while read as corners they all fit.
2. Concludes the file is probably corner (xmin, ymin, xmax, ymax) form, asks for the vendor or data owner to confirm, and does not convert the file as COCO on the label alone.
