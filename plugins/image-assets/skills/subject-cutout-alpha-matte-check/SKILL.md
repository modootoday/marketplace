---
name: subject-cutout-alpha-matte-check
description: Check a background-removed subject or cutout before it is placed on a new background - measure that the file has a real alpha channel with the share of partial-alpha pixels, find a checkerboard baked into the colour channels, require a graded matte for glass, smoke, hair and other translucent parts, composite over a light, a dark and the target background to list fringes, halos, lost thin parts and damaged lettering by location, and for frame sequences check count, order, mask polarity and edge flicker. Use when a user has an AI or tool background removal result, wants a product placed on a transparent or new background, or asks whether a cutout is ready. Not for generating the cutout or the new background, and not for checking a flat-colour logo against a palette spec.
metadata:
  tier: open
  level: L3
  domain: asset-image
  install: optional
  approval: none
  keywords: [background removal, cutout, alpha matte, transparent PNG, glass, compositing, halo, mask]
  output-license: the user's own images; the check adds no third-party content
---

# Subject cutout alpha matte check

AI background removal often hands back a PNG that looks transparent and is not: a
checkerboard drawn into the pixels, a hard silhouette where glass should show the new
background through it, grey halos on the edge, thin straps or lettering eaten. This skill
decides from measurements whether the cutout may be placed. It checks mattes; it does not
make them. If the matte is wrong, say what the next run must do differently.

## Steps

1. Get the file or a measurement report. Without either, you may plan the checks and the
   numbers you would report, but never say a cutout is good, fixed or produced.
2. Measure the alpha, for example with Pillow or ImageMagick: image mode (must be RGBA or
   LA, not RGB), alpha minimum and maximum, the share of pixels at alpha 0, at 255 and in
   between, and the share of partial-alpha pixels along the subject edge. A binary matte
   (0 and 255 only) is acceptable for a solid object and a failure for glass, smoke, hair,
   fur or a veil.
3. Look for a baked checkerboard: alternating two greys (commonly 204 and 255) in square
   tiles inside pixels whose alpha is 255, or alpha missing so the pattern is the picture.
   Pixels with alpha 0 may hold any colour; only their visibility when alpha is ignored
   matters, so say so and do not fail on them alone.
4. For a translucent subject, name which regions may be partly transparent (glass body,
   liquid, thin neck, shadow, hair tips) and which must stay opaque (cap, label, base). A
   graded matte for those regions is a requirement, not polish. Request a re-run with an
   alpha-matting tool, a trimap or a higher-quality mask, rather than a threshold change.
5. Composite over three test backgrounds: a light one, a dark one and the real target (for
   example the blue gradient). List every defect with its location: fringe or halo in
   pixels along an edge, a lost thin part, label or logo letters with broken strokes, a
   see-through region that shows the old background colour.
6. For a frame sequence, check the frame count against the source, the order and numbering,
   the mask polarity (white subject or black subject, same in every frame) and flicker of the
   subject edge between neighbouring frames, before compositing anything.
7. Decide: accept, accept with listed touch-ups, or reject with the single change the next
   run needs. State what you could not measure. For a reject, write the limit each check
   must meet on the re-run, as numbers or an exact condition, for example partial alpha
   above 0% across the glass body, no checkerboard tile in any pixel with alpha 255, no
   halo wider than 1 px, lettering strokes unbroken at 100 percent.

## Output

A table of measurements (check, measured, limit, pass or fail), the defect list with
locations over each test background, the verdict with the next-run change, and the checks
that were not possible.
