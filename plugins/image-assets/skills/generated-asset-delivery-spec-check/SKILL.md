---
name: generated-asset-delivery-spec-check
description: Accept or reject an AI-generated image asset against a hard delivery spec by measuring it - turn the brief into numeric checks (allowed palette, real alpha channel, aspect ratio and print size, tile seam, viewpoint, part and prop counts), measure with a script instead of judging by eye, reject baked-in checkerboards, mockup surroundings, placeholder text and off-palette pixels, then write one corrective prompt line per failure and stop after three failed rounds. Use when a generated logo, print card, texture, map, transparent graphic or limited-color design must meet a spec before it is accepted, or the user asks whether a generated image can be accepted or delivered and has a pixel report or measurements. Not for creating the image, retouching a photo or making the image look nicer.
metadata:
  tier: open
  level: L3
  domain: image-assets
  install: optional
  keywords: [generated image, delivery spec, alpha channel, palette check, tileable texture, pillow]
  requires:
    bin: [python3]
---

# Generated asset delivery spec check

Creators report discarding most generated images for reasons a measurement shows at once:
colors beyond the allowed palette, a transparency checkerboard drawn into the pixels, a card
shown as a mockup instead of the flat print face, placeholder text left in, a map in
perspective instead of top-down, a texture that does not repeat, a missing required prop.
This skill checks a finished image against the brief. It does not generate images; the
generation tool changes the asset, this skill decides whether it may be accepted.

## Steps

1. Turn the brief into numeric checks before looking at the image: allowed colors and a
   tolerance, alpha required or not, width and height or aspect ratio, tile seam limit,
   camera viewpoint, counts of parts or props, and text that must or must not appear.
2. Measure with a script, for example Pillow: the distinct colors and the pixel count of each,
   the image mode and whether an alpha channel exists, the size, and for a tile the mean
   difference between the left and right edge columns and between the top and bottom rows.
   If no file or report is available, say which checks cannot be measured, and do not pass
   them by looking.
3. Judge each check pass or fail. Colors only along edges that sit between two allowed
   colors (for example dark grays next to black) are antialiasing, not a palette failure:
   call them antialiasing, state the tolerance in color levels, and say whether you accept
   them or threshold them to the palette. Colors away from edges, such as a stray blue, fail. A checkerboard visible in the pixels, a card on a surface, leftover placeholder
   text and any color outside the palette are failures, not style.
4. For each failure write one corrective line for the next generation or the next
   post-processing step (for example threshold to the palette, export a real alpha channel,
   ask for a flat front-facing print face), changing only that constraint. A baked
   checkerboard cannot be fixed by a fill; ask for or produce a real alpha export.
5. Allow at most three rounds. If a check still fails, report what the tool cannot do and
   the manual fallback instead of retrying.

## Output

A table (check, measured value, limit, pass or fail), one corrective line per failure, the
verdict (accept or reject), and the round count.
