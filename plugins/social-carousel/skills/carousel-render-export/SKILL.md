---
name: carousel-render-export
description: Render carousel slides from HTML to PNG with a headless browser at the platform's sizes (1080x1350 portrait, 1080x1080 square, 1080x1920 story), check every slide before export, and export only after the user approves. Use when the user has carousel copy or a design and wants the slide image files produced. Not for writing the copy or editing photos.
metadata:
  tier: open
  level: L3
  domain: asset-image
  install: optional
  keywords: [carousel export, HTML to PNG, Instagram slides, Playwright, slide images]
  output-license: the user's own template, fonts and images; the skill adds no third-party content
  requires:
    bin: [node]
  verified-runtimes: [claude-code]
---

# Carousel slides from HTML

Slides share a template, so one layout bug repeats on every slide. Render all
of them, check all of them, and show them before writing the final files.

## Sizes

| Format | Pixels | Note |
| --- | --- | --- |
| Feed portrait | 1080x1350 | most screen space in the feed |
| Feed square | 1080x1080 | safe when unsure |
| Story or reel cover | 1080x1920 | keep text out of the top and bottom 250 px where the app draws its own UI |

One carousel uses one size for every slide; mixed sizes are cropped to the
first slide's ratio.

## Render

- One HTML template, one data object per slide (headline, lines, image, slide
  number). Same fonts and spacing on every slide.
- Load fonts from local files and wait for `document.fonts.ready` before each
  screenshot; Korean needs `word-break: keep-all`.
- Screenshot each slide at exactly the target viewport, `deviceScaleFactor: 1`,
  to numbered files (`01.png`, `02.png`) so the upload order is the file order.

## Check every slide before export

- Text fully inside the safe zone, nothing clipped or overlapping, no headline
  wrapping into more lines than the design allows; measure in the page, not by
  eye.
- Contrast of text over images.
- Slide count within the platform's limit, and the last slide carries the call
  to action.
- File sizes within the upload limit.

## Approval before export

Show the rendered slides (or a contact sheet of all of them) and the check
results, and wait for the user's go-ahead. Only then write the final export
folder. Revisions re-render every slide, not only the changed one, because a
template change moves all of them.

## Report

The export folder, each file with its pixel size and bytes, the check results,
and anything the user approved despite a warning.
