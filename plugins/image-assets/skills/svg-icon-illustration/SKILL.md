---
name: svg-icon-illustration
description: Draw icons, small illustrations and diagrams as hand-written SVG - a consistent grid, stroke and corner style across a set, currentColor for theming, accessible titles, optimised output - and check them rendered at the sizes they will be used. Use when the user needs an icon set, a simple illustration, a pixel-art sprite or a diagram drawn as SVG code. Not for photos or AI-generated images.
metadata:
  tier: open
  level: L2
  domain: asset-image
  install: optional
  keywords: [SVG icon, icon set, illustration, vector graphics, pixel art]
  output-license: the user's own drawing; no third-party icon set is copied
  verified-runtimes: [codex-cli]
---

# Icons and illustrations in SVG

A set of icons looks professional when every icon follows the same rules; one
icon drawn on a different grid or stroke is what makes a set look amateur.

## Set the rules once

- Grid: a `viewBox` of `0 0 24 24` (or the set's size) with a 2-unit safe margin.
- Stroke: one width (for example 1.5 or 2), round or square caps and joins
  chosen once, no mixed filled and outlined styles in one set.
- Corners: one radius rule.
- Color: `stroke="currentColor"` or `fill="currentColor"` so icons follow text
  color and themes; no hard-coded colors unless the icon is meant to be colored.

## Draw

Write the paths by hand with simple shapes (`rect`, `circle`, `line`, `path` with
few points). Align to whole or half units so strokes stay crisp at small sizes.
For pixel art, use a small grid of `rect`s with `shape-rendering="crispEdges"`.

## Accessibility and output

- Meaningful icons get `role="img"` and a `<title>`; decorative ones
  `aria-hidden="true"`.
- No editor metadata, ids that collide across icons, or embedded raster images.
- Optimise (for example with SVGO) and check the result still renders the same.

## Check rendered

Render each icon at the sizes it will be used (16, 20, 24 px and large) and on
light and dark backgrounds, and compare the set side by side. Fix any icon that
looks heavier, lighter or off-centre than its neighbours.

When icons arrive from different hands, redraw them to one rule set (one style
for the whole set, filled or outlined, never both) rather than patching each.

Do not copy paths from existing icon sets unless their licence allows it and you
record it.

## Reply

The SVGs, then a short list: the rules used (grid, stroke, caps, style), what was
removed (metadata, unused defs, colliding ids, embedded rasters), whether each
icon is meaningful (`role="img"` and `<title>`) or decorative (`aria-hidden`),
and the checks still to run because you cannot render here: the three sizes on
light and dark backgrounds side by side, and the SVGO pass followed by a
same-render comparison. Never say the icons were tested visually unless a render
was made.
