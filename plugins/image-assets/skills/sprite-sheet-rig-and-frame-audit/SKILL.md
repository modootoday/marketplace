---
name: sprite-sheet-rig-and-frame-audit
description: Audit a generated 2D character sprite sheet, direction atlas, equipment overlay or animation sheet against its frame plan and rig - write the frame manifest (action, phase, direction, hand) first, then check each frame for missing or duplicated directions, repeated poses, a held prop on the wrong hand, part pivots and sizes against the rig coordinates, and equipment position and timing over base frames, and return one fail-reason row per frame. Use when generated character parts, an 8-direction atlas, a weapon or equipment layer or an animation sheet must fit an existing rig or frame plan, and the user gives a frame list, a text report or measurements. Not for 3D assets, creating the art, or judging style.
metadata:
  tier: open
  level: L3
  domain: image-assets
  install: optional
  keywords: [sprite sheet, direction atlas, handedness, animation frames, rig pivot]
---

# Sprite sheet rig and frame audit

Generated sheets often get most frames right and repeat a pose, drop a direction or move a
held prop to the other hand. A mirrored east frame used for west flips a left-hand sword into
the right hand. This skill checks a sheet against the plan. It does not draw frames; for a
single generated asset against a numeric spec use `generated-asset-delivery-spec-check`.

## Steps

1. Write the frame manifest before judging anything: one row per expected frame with action,
   phase or frame index, direction and which hand holds each asymmetric prop, plus the grid
   (columns, rows, cell size in pixels). Derive it from the user's plan, not from the image.
2. Compare each delivered frame with its manifest row, using the user's per-frame report,
   measurements or description. State that you cannot see images when only text is given; do not
   pass a frame you have no information on, mark it "not checked".
3. Directions: list every direction against what was delivered. Flag a missing direction, a
   frame identical to another direction (a duplicate, which also means a direction is missing),
   and a frame with the wrong held-prop hand. Note that deriving a direction by mirroring its
   opposite inverts handedness (a mirrored east frame gives a west frame with the prop in the
   other hand), so asymmetric props need their own art or a deliberate fix. Read
   `references/direction-table-example.md` for the table and warning shapes. Always write this
   warning out for the mirror pairs E/W, NE/NW and SE/SW, saying for each which frame a
   shortcut would mirror from and what hand the prop would end up in, and name the missing
   or duplicated direction (for example NW and its pair NE) in the same list.
4. Phases: for animation sheets check that each declared phase appears once and in order, with no
   run of repeated poses after the first few frames and no phase skipped.
5. Rig parts: compare each part's pivot and size with the existing rig coordinates and the
   template's cell size; report the offset in pixels, not "looks off".
6. Equipment layers: ask for an overlay test, equipment frames composited over the base frames
   for every phase, to check position, edge alignment and timing. Do not accept a layer from
   frame stills alone.
7. Do not claim a frame passes unless it was checked, and do not claim the overlay or rig test
   was run.

## Output

A per-frame table (frame, expected, delivered, result, fail reason), a verdict per direction or
phase, the fixes needed, and the tests still required before acceptance (overlay test on the base
animation, rig import).
