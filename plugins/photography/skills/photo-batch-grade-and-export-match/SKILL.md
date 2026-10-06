---
name: photo-batch-grade-and-export-match
description: Plan and verify a batch grade, film look or RAW-development tool from the settings and logs the photographer supplies - white, skin and exposure continuity compared per scene with intended lighting differences kept, preview checked against export for colour space, clipping and resolution, input files mapped one to one to outputs with unopened files listed, and style approval left to the photographer on a sample. Use when a look is applied to a batch, a tool is built for non-standard RAW or DNG files, or preview and export differ. Not for culling and not for generating images.
metadata:
  tier: open
  level: L3
  domain: photography
  install: optional
  keywords: [batch grading, white balance, DNG, RAW export, film look, preview versus export]
---

# Photo batch grade and export match

Two photographers report a style trained on finished photos fighting scene lighting, and a
home-built tool for non-standard RAW files whose result worked on one machine only. This skill
plans and checks; it does not edit or generate images, and it works from the numbers, logs and
file lists the user supplies.

## Steps

1. Group the files by scene and lighting (indoor tungsten, daylight, mixed). Continuity is
   judged inside a scene: white, skin tone and exposure should agree there. Do not force one
   white balance across scenes whose light differs on purpose; list those differences as kept.
2. Prefer a base profile that carries only exposure and white balance, with the look applied
   after it, so a scene correction does not fight the style. Ask which adjustments are the look.
3. Preview versus export: compare the preview and the exported file on colour space and profile,
   clipped highlight and shadow share, resolution and bit depth. Any mismatch is reported with
   both values; "looks the same" is not a check.
4. File mapping: list input count, decoded count, output count. Name every file that failed to
   open or has no output, and say the batch is incomplete until each is accounted for. Never
   report the full input count as processed when the log shows fewer.
5. A tool that runs on the user's machine is not shown to run on another. Say which
   environment was verified and which was not.
6. The photographer approves the look on a sample of each scene before the full batch. List the
   frames with the largest deviation for manual review.

## Output

A scene table (scene, files, white and skin note, exposure note, kept difference), a
preview-versus-export table, the input-to-output mapping with the unopened and missing files,
the sample the photographer must approve, and what was not verified.
