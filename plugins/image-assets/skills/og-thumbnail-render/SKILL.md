---
name: og-thumbnail-render
description: Make a blog or social share image (Open Graph, 1200x630) from an HTML template rendered by a headless browser, with Korean text that wraps, fonts that load, a safe zone for crops, and the og meta tags that point at it. Use when the user wants share thumbnails, OG images or blog cover images generated from a title, or when a shared link's preview image is missing, wrong or stale. Not for photo editing or AI image generation.
metadata:
  tier: open
  level: L2
  domain: asset-image
  install: optional
  keywords: [OG image, Open Graph, share thumbnail, HTML to PNG, Playwright screenshot]
  output-license: the user's own template and fonts; the skill adds no third-party content
  requires:
    bin: [node]
---

# OG thumbnails from HTML

A share image is a picture of text. HTML lays out text better than an image
editor and can be rendered for every post the same way, so build a template and
screenshot it.

## The template

- A page exactly 1200x630 CSS pixels, `margin: 0`, rendered with
  `deviceScaleFactor: 1` (or 2 for a sharper 2400x1260 file when the platform
  accepts it; check before using).
- Keep text inside a safe zone with about 60 px padding: some platforms crop
  the edges or draw a square crop from the centre.
- Title at a size that fits three lines at most; measure, do not guess. When the
  rendered title overflows its box, reduce the size in steps down to a floor,
  then truncate with an ellipsis and report that it was truncated.
- Korean text: `word-break: keep-all` so words are not split mid-word, and
  `overflow-wrap: anywhere` as a fallback for long English or URLs.
- Fonts: load them from local files with `@font-face` and wait for
  `document.fonts.ready` before the screenshot. A screenshot taken before the font
  loads shows the fallback font and nobody notices until it is shared. Use only
  fonts licensed for this use.

## Rendering

With Playwright (or Puppeteer): open the template with the post's data, set the
viewport to 1200x630, wait for fonts, screenshot to PNG. Check the output file's
pixel size and that it is under the platform's size limit before publishing.

## Wiring it to the page

The page needs absolute URLs in `og:image` (and `twitter:image`), plus
`og:image:width`, `og:image:height` and `og:image:alt`. Platforms cache share
previews; after changing an image, use the platform's debugger or a new file
name to refresh it.

## Report

For each image: the file, its pixel size, the title as rendered (and whether it
was shrunk or truncated), and the meta tags to add.
