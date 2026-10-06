---
name: editable-layered-design-delivery-check
description: Check that a design handed back as an editable layered file is real - opened in the target format with layers, editable text and independently movable elements, a download that exists - and check a bulk artboard script on a copy, per artboard, for linked state, aspect ratio, centre and margin. Use when a user asked more than once for an editable PSD, SVG or layered file and received dead links, a renamed flat image or an unfinished upload, when a delivered file or a script report on 100 or more artboards must be accepted or rejected (artboard count, linked logo, margin, centre), or when a flat image is split into objects and must recompose to the original. Not for generating the design or images, or for checking dimensions and formats of a single asset.
metadata:
  tier: open
  level: L3
  domain: image-assets
  install: optional
  keywords: [editable file, layered PSD, artboards, linked layer, margin check, flat image to layers, delivery check]
  verified-runtimes: [claude-code]
---

# Editable layered design delivery check

Designers report links that do not open, a flat PNG with a .psd extension, scripts that
cannot tell 100 or more artboards apart, and image regeneration that destroys earlier
edits. Verify what was delivered; do not generate or redraw the design.

## Steps

1. Confirm the file exists: a path or URL that was fetched, with its size in bytes and its
   media type. A link that was not fetched, a missing upload or a name without a size is
   not delivered. Never write "done" while the file or upload is missing; say what is
   missing and ask for the file or regenerate it.
2. Open the file in the requested format, not by extension. For PSD or similar, list the
   layers (name, type, visible) and confirm the text layers are live text, not raster
   pixels, and that the main elements (background, logo, headline, decoration) are separate
   layers that move independently. A flat image renamed to .psd fails this step; the file
   signature (`8BPS` for PSD, `<svg` for SVG) is the quick check.
3. For artboard automation, run on a copy of the file, never the original. First count the
   artboards and list each one's id, name, width, height and bounds. Stop if the count differs
   from what the user stated.
4. Per artboard, check and report: the layer is linked to the source (not embedded), the
   aspect ratio of the placed layer equals the source ratio, the layer centre equals the
   artboard centre, and the margin to each edge equals the requested percentage of the
   shorter artboard side (for 8 percent on a 1080 by 1920 artboard, 86.4 px). Report
   failures by artboard id with the measured value, not as a summary.
5. When a flat image is split into objects, recompose the layers and compare the result
   with the original; list missing, duplicated and reordered objects and the overlap order.
   Earlier edits must be kept when a later edit changes only one object.
6. If tools to open files or run the script are not available, state each check as
   unverified and list the exact steps and expected values to run.

## Output

A delivery table (file, exists, size, opens, layers, text editable), the artboard count and
bounds, a per-artboard result table with failures by id, and the list of unverified items.
