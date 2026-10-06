---
name: generated-3d-asset-qc
description: Check an AI-generated mesh, a retextured asset or a generated VFX element against numbers before it enters a scene or composite - triangle count against the budget, non-manifold edges, inverted normals, UV overlap, retexture silhouette and per-frame flicker, and plate match for color space, light direction, focus and motion - with a pass or fail row per check and frame ids. Use when a generated asset arrives with script stats or a sequence and the creator asks whether it can go in. Not for generating or retopologizing the asset, rendering, or the final acceptance decision, which is the artist's.
metadata:
  tier: open
  level: L3
  domain: asset-3d-vfx
  install: optional
  keywords: [generated mesh, triangle budget, non-manifold, normals, uv overlap, retexture, flicker, plate match]
  output-license: the user's own asset and check results; the skill adds no third-party content
  verified-runtimes: [claude-code]
---

# Generated 3D asset QC

Generated meshes tend to arrive over budget, with broken topology, and retextures can look
fine in one frame and flicker across a sequence. Judge the asset with measured numbers and
frame ids, not by the look of one view. This skill checks; it does not generate or repair.

## Steps

1. Write the budget first: triangle limit, texture size, UV rules, target engine, frame
   range. If a budget is missing, say so and mark that check not measured.
2. Mesh checks, each a row with the measured value, the limit and pass or fail: triangle
   count, non-manifold edges, faces with inverted normals, UV overlap percent, and any
   loose geometry or scale problem that was reported. Give the ratio for a budget miss
   (for example 6 times over). When no limit was given for a check, write the limit as an
   assumed convention (zero non-manifold edges, zero inverted faces, no UV overlap for a
   unique bake) labelled "assumed", so the row is never a pass or fail against a blank
   limit. Take numbers from a script or the tool output the creator
   gives; if none were supplied, name the check and say how to measure it. Do not estimate.
3. Classify each failure: blocker (non-manifold, inverted normals, budget miss) or
   fix-before-bake (UV overlap before a texture re-bake). Give one next step per failure
   (decimate or retopologize, recalculate normals, repack UVs and re-bake).
4. Retextured asset: compare silhouette, UV islands and lighting response with the source,
   and check the sequence frame by frame. Report flicker as a frame range (first and last
   frame), not as a general impression. A silhouette match does not clear temporal
   stability.
5. Generated element in a composite: compare color space, light direction, focus and
   motion with the plate across all frames, and list the frames or elements that differ.
6. List passes too, and every check that was not measured as not measured. Final
   acceptance is the artist's; say so.

## Output

A table with a row per check: check, limit, measured, pass, fail or not measured, frame or
element ids. Then the blockers, the next step per failure, and the not-measured list.

Neighbor: for a hand-built scene against a reference, use blender-scene-build-and-reference-check.
