---
name: bbox-annotation-format-conversion-check
description: Convert object-detection box labels between COCO, YOLO and Pascal VOC without silent shifts - name each side's box form, read image sizes from the files, test the claimed source format against image bounds before converting, convert in code, assert bounds, round-trip to the source within one pixel, map class ids explicitly and render a sample overlay. Use when detection labels are converted between COCO, YOLO and Pascal VOC or loaded into a trainer, or boxes look shifted after a conversion. Not for text or chat training data (training-data-format-contract-check) or for training and scoring a detector.
metadata:
  tier: open
  level: L3
  domain: ml-data
  install: optional
  keywords: [object detection, bounding box, COCO, YOLO, Pascal VOC, annotation conversion, round trip]
  verified-runtimes: [codex-cli]
---

# Bounding box format conversion check

The three formats store four numbers each and a wrong guess about which format a file is in
still produces four plausible numbers. The boxes shift or leave the image and nothing errors.
This skill proves the source format and the result before the labels reach a trainer. It converts
and checks labels; it does not train.

## Box forms

| Format | Four values | Units | Origin |
| --- | --- | --- | --- |
| COCO | x, y, width, height | absolute pixels | top-left corner of the box |
| YOLO | cx, cy, width, height | 0-1, divided by image width and height | box centre |
| Pascal VOC | xmin, ymin, xmax, ymax | absolute pixels | two corners |

## Steps

1. Name the source and target forms from the table above and say where each claim comes from
   (a dataset page, a file header, the user's words). A label such as "COCO" on a file is a claim,
   not a fact, until step 3 passes.
2. Read each image's width and height from the image files or the annotation file's image table.
   Never assume one size for the whole set; a mixed-size set needs the size per image.
3. Test the claimed source form before converting. Read the claimed values under the claimed form
   and count boxes that break a rule: x + width above image width, y + height above image height,
   width or height at or below zero, or (for xyxy) xmax not larger than xmin. Then read the same rows
   under the other pixel form. If the claimed form fails rows that the other form passes, the file is
   probably in the other form: say so in one plain sentence naming the probable form (for example
   "probably corner form, xmin ymin xmax ymax, not COCO"), show the per-sample numbers under both
   readings, and ask the data owner to confirm. Do not convert on the stated label.
4. Convert in code, one function per direction, using the image's own size. Keep floats until the
   final write; say how the output is rounded.
5. Assert on the output: for YOLO every value is within 0 to 1; for COCO and VOC every box lies
   inside its image and has positive area. List each failing box by file and annotation id.
6. Round-trip back to the source form and compare with the original within 1 pixel (a YOLO source
   needs a tolerance of 1 / image size). Report the count that differs and the largest error.
7. Map class ids explicitly. COCO category ids are not contiguous (for example 1, 3, 18) and YOLO
   class ids start at 0 and are contiguous: write the id table, keep the names file in the same
   order, and never use the COCO id as the YOLO index. COCO `iscrowd` boxes are listed, not silently
   dropped.
8. Render an overlay of three samples (the smallest box, the largest and one near an edge) on their
   images and ask for a look before trusting the set. If you cannot run code, give the script and say
   the overlay was not produced.

## Output

The two form names and the evidence for the source form, the step 3 bound-test counts under both
readings, the conversion code, the assertion and round-trip results with counts, the class id table,
the overlay instructions, and what was not verified (for example the real images were not opened).
Say that no training was run.
