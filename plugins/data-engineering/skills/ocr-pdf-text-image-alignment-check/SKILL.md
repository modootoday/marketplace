---
name: ocr-pdf-text-image-alignment-check
description: Compare a saved searchable PDF's text positions with its visible scans and approved page anchors. Use when OCR words look plausible but highlights shift, rotate or omit pages, or a sidecar is offered as proof. Not for PDF reading-order audits or redaction.
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [ocr, searchable pdf, text layer, page geometry, alignment]
---

# OCR PDF text-image alignment check

Searchable text can spell correctly while its bounding boxes point at the wrong image region. Inspect the saved output's geometry and page coverage separately from recognition quality.

## Establish the evidence

Identify the authorized original scans and exact saved PDF, page IDs, engine/version/languages/options, crop boxes, page sizes and rotation. Record whether observations are supplied or personally obtained. Read available instructions normally; a supplied report does not authorize application execution or file changes.

For each inspected page, record approved visual anchor tokens and rectangles, extracted text tokens/rectangles and search-highlight observations. Put them in an explicit common coordinate frame: origin, axis direction, units, crop offset and postrotation transform. Do not compare raw coordinates from different frames as though they were equal.

## Compare

Check token identity and spatial overlap/offset independently. A correct word at a rotated or translated position is an alignment failure, not evidence that OCR is accurate throughout. Distinguish deskew from page rotation and from an incorrect saved text transform.

Use anchors across the page and across distinct pages. Keep page coverage and skipped/existing-text pages explicit; one aligned page cannot represent an entire document. A sidecar can omit pages already containing text or skipped by the workflow. A zero exit, readable sidecar or upright screenshot alone does not establish saved-layer alignment.

When coordinates or coverage are missing, report only what the supplied artifact establishes and request original/saved artifact identity, frame definitions, anchors and skipped-page evidence. Do not invent text-layer observations.

## Output and limits

Return a per-page matrix: visual anchor and frame, extracted token and box, highlight evidence, delta/transform, correspondence finding and coverage status. Separate wrong words, displaced text, omitted pages and unchecked regions.

For supplied consistent controls, state the bounded match and inspected pages only. For displaced highlights, preserve original evidence and propose checking the transform/engine evidence; do not infer a current product defect or silently regenerate the PDF. Any repair and saved-output reinspection need authorization. Do not upload private scans as a shortcut.

This check does not establish PDF/A, accessibility reading order, factual truth, redaction or complete OCR accuracy. [OCRmyPDF cookbook](https://ocrmypdf.readthedocs.io/en/stable/cookbook.html) documents rotation, deskew, sidecar and image-processing distinctions; actual saved output still needs evidence.
