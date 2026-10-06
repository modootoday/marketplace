---
type: llm
---

Context the reply answers: a user has vendor detection labels called "COCO json" and wants YOLO txt files. All images are 640x480. Sample annotations: image 1 bbox [412, 96, 598, 330] category 18; image 2 bbox [30, 40, 200, 220] category 3; image 3 bbox [350, 120, 600, 410] category 18. Read as COCO (x, y, width, height) boxes 1 and 3 end at x 1010 and 950, beyond the 640 pixel width; read as corner form (xmin, ymin, xmax, ymax) all three fit inside the image, so the file is probably Pascal VOC style mislabelled as COCO. Categories are 1 pallet, 3 forklift, 18 person. Nothing can be run in this conversation. The user asked for conversion code and the checks to run.

PASS only if the reply does all of these:
1. Includes a bounds assertion on the output (YOLO values within 0 to 1, boxes inside the image) and a round-trip back to the source form compared within about 1 pixel.
2. Maps class ids explicitly through a table: COCO-style ids 1, 3 and 18 are not contiguous, so YOLO indices 0, 1, 2 are assigned and the names file kept in the same order; it does not reuse 18 as the YOLO class.
3. Computes the YOLO centre and size values by dividing by the image width and height, uses each image size read from the data rather than hard-coded guesses where sizes can differ, and plans an overlay check of a few samples or says it was not produced.
