---
name: ai-photo-retouch-qc
description: Review the output of AI photo edits - object or distraction removal, denoise, subject masking, upscaling, generated backdrops, set extension, colorway or label changes - against the original before delivery or print, at 100 percent and at print size, and write a defect list with locations and a fix or re-run for each, leaving approval to the photographer. Use when a photo has been edited with AI removal, noise reduction, masks, upscaling or compositing and needs a quality check, or when an explanatory image must not change the facts of its source. Not for generating images, batch resizing or choosing a style.
metadata:
  tier: open
  level: L3
  domain: asset-image
  install: optional
  keywords: [AI retouch, photo QC, denoise, masking, upscale, compositing, print check, inpainting artifacts]
  output-license: the user's own photos; the review adds no third-party content
  verified-runtimes: [claude-code]
---

# AI photo retouch QC

AI edits look right at fit-to-screen and fail when someone looks closely: a repeated tile where a
power line was removed, a veil with its lace smoothed away, a green halo around hair. The
review is done by inspecting, listing and handing the decision back, not by saying "looks
good".

## Inputs

The original and the edited file (or the notes and crops the user supplies), what was done to
which region, and the destination (screen, or print size and the source resolution). If only
notes are available, review the notes and say which checks need the actual file.

## Steps

1. **Inspect at 100 percent.** Crop each edited region at 100 percent, and the whole frame at
   the print size when printing. Look for seams, repeated or tiled patterns, smeared or
   plastic texture, and changed subject details (fingers, text, jewellery, eyes).
2. **Compare with the original, outside the edit too.** Anything that changed outside the region
   the user asked to change is a defect, however nice it looks. Record which regions were
   touched and which were not.
3. **Removal and set extension.** Check fill texture for repetition, edges and lines that no
   longer continue, perspective, and light and grain that match the surroundings.
4. **Denoise.** Compare with the original on skin, fabric, hair and fine texture. Propose a
   strength per region (stronger on flat sky or background, weaker on skin and patterned
   fabric) instead of one global value, and name the detail that was lost.
5. **Masks.** Check hair, translucent areas (veils, glass), fine edges and contact shadows
   against the new background. Look for halos of the old background colour.
6. **Composites and backdrops.** Compare light direction, shadow direction and softness,
   perspective and horizon, edge colour and grain between subject and backdrop.
7. **Upscale and print.** Compute the print resolution (pixels divided by inches). Mark where
   detail is invented rather than recovered: textures, lettering, faces, repeating structures.
   Ask for a test print of a critical area, or the photographer's sign-off, before a large run.
8. **Products, labels and explanatory images.** When a colour or design change must keep the
   product shape and shooting conditions, compare angle, light, background and size with the
   reference, and compare label text and container outline with the original. When one element
   was edited, check that the rest was not regenerated. An image that illustrates a fact must
   not add, remove or alter anything the source shows; list every change against the source,
   mark added emphasis as emphasis, and do not call a changed image evidence of the original
   scene.

## Output

A defect list: location (region and coordinates or description), type, severity (blocks
delivery, fix before print, note), and a fix or re-run suggestion (lower strength, redo the
mask, re-composite with matching light, regenerate a smaller region). End with what could not
be judged from the material given and the checks that need the real file or a print. The
photographer approves; do not declare the image finished.
