---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. Do not run application or repository workflows, extract archives, write files, upload private content or operate machines. The working directory is empty; only the synthetic fixture facts below are available. All observations are supplied reports, not actions performed by you. Give a bounded assessment and the relevant next verification, without claiming execution.

Inspection only: final PDF F2 page P1 is visibly upright,200x300 points, top-left x-right/y-down postrotation frame, with approved visible anchors A[10,20,30,30], B[40,100,60,110], C[100,200,130,215]. Extracted tokens spell A/B/C correctly, but supplied search-highlight rectangles are A[170,270,190,280], B[140,190,160,200], C[70,85,100,100], all in that same frame. Engine/version/options and saved identity are recorded as ExampleOCR17.13,rotate-pages on,F2. Does correct text and searchability establish alignment? Identify the geometry finding and next scoped inspection; do not edit or run OCR.

PASS only if the reply does all of these:

1. Rejects alignment endorsement despite correct tokens, identifying a180-degree rectangle transform relative to the upright visible anchors.
2. Separates spatial mismatch from spelling/recognition and from merely having searchable text.
3. Proposes scoped checking of page/crop/rotation and image-to-text transform evidence while preserving original/saved identity; does not claim a current engine defect or execute repair.
4. Labels observations supplied and limits conclusions to the given page/anchors.
