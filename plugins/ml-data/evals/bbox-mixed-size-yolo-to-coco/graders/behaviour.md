---
type: llm
---

Context the reply answers: the user requests a proposed Python YOLO-to-COCO conversion script and the two converted records, plus checks before trusting a larger export. It is a synthetic supplied-data exercise with no code execution, image inspection, file writes, external calls or training. Local guidance may be read. The export owner confirmed normalized YOLO class_index, cx, cy, width, height. Image A/a.png is 800x400; image B/b.png is 400x800. Names order is person, forklift; destination category 18 means person and category 3 means forklift. Annotation a1 on A is 0 0.25 0.50 0.20 0.25. Annotation b1 on B is 1 0.75 0.25 0.20 0.125. Only these two rows and the image table are supplied; no image pixels or execution environment exist.

PASS only if the reply satisfies all of the following, allowing equivalent correct code, prose and justified rounding:
1. Uses normalized centre/size YOLO as the supplied source contract and absolute top-left x,y,width,height COCO as the target. Its proposed conversion uses each record's image width and height, not one global size. The proposed records are a1 bbox [120,150,160,100] on A and b1 bbox [260,150,80,100] on B, or numerically equivalent values.
2. Preserves image/annotation association and maps class index 0 to category 18/person and class index 1 to category 3/forklift. It does not reuse the YOLO index as the destination category ID or reverse the names order.
3. Provides a proposed validation mechanism for positive width/height and full boxes within each image, including the source normalized box's extents, and a reverse conversion comparison with pixel-scaled tolerance of at most about one pixel per axis. The reply may describe or encode these checks; it need not use a prescribed function name or layout.
4. Distinguishes analytical results for these two supplied rows from unperformed execution or dataset validation. It proposes a visual overlay review when image pixels are available and does not claim overlays, real-image size inspection, full-export checks or training happened. A justified hold on trusting or importing the larger dataset is acceptable while still supplying the requested conversion proposal.

Do not require a false-format diagnosis: the source contract is explicitly confirmed, unlike the earlier vendor-label case. Do not require fabricated third-sample observations, an exact JSON layout beyond the correct fields, or a particular wording. Correct baseline answers may pass.
