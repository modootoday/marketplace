---
name: blender-procedural-and-rig-asset-verification
description: Verify a procedural Blender asset or a rig with parameter, connectivity and motion checks - list each exposed parameter with its range and test minimum, default and maximum for broken geometry, check road or path connectivity at junctions and the separation of vehicle and pedestrian paths, check rig weights, foot contact and mesh collision across the walk cycle, and report engine import and asset update behavior - each fix tied to a retest. Use when a creator builds a geometry-node road kit, procedural set or character rig and reports glitches at some settings or frames. Not for generating meshes, scene layout against a reference photo, or animation authoring.
metadata:
  tier: open
  level: L3
  domain: asset-3d-vfx
  install: optional
  keywords: [geometry nodes, procedural, road network, rig, weight painting, foot slide, parameter range]
  output-license: the user's own asset and test results; the skill adds no third-party content
---

# Blender procedural and rig asset verification

A procedural asset that works at its default setting often breaks at an end of a range,
and a rig that looks right at rest slides or intersects mid-cycle. Test the ends, name the
failing setting or frame, and tie each fix to a retest. This skill verifies; it does not
build or animate.

## Steps

1. Parameter table: every exposed parameter with its range and default. For each, the plan
   is minimum, default and maximum, and for two or more interacting parameters the corner
   combinations. Mark which were tested and which were not; an untested cell is listed,
   not assumed fine.
2. Report a break as a parameter-range issue with the exact setting (for example lane
   count 4 with radius 5), what it shows (overlap, self-intersection, gap) and the likely
   limit to enforce: a clamp, a minimum derived from the other parameter, or a changed
   formula.
3. Connectivity: at each junction, check that paths join without a gap, with the gap in
   meters, and that vehicle and pedestrian paths stay separated where intended. A gap is a
   connectivity failure, not a cosmetic one. Untested junction types are listed.
4. Rig: check weight painting at the deforming joints, foot contact per frame (slide in cm
   at the frame, planted foot should not move), and mesh collision between limbs and body
   over the walk cycle. Name the frame and the check.
5. Engine: report whether the asset was imported into the target engine and whether an
   update to the asset keeps references. If not tested, say not tested.
6. For every fix, write the retest that proves it (same setting or frame, expected
   value). A fix without a retest is not closed. The expected value is the limit itself
   (zero gap, zero slide, no overlap); do not introduce a looser tolerance the creator did
   not give.

Before writing the reply, read `references/worked-example.md` and fill its fix-and-retest
rows and coverage table for the creator's own numbers. Each failure needs a class, an
enforced limit, and a retest at the same setting or frame with the limit as expected value.

## Output

A table: check, setting or frame, measured, limit, pass, fail or not tested. Then fixes
with their retests, then the not-tested list. The creator decides what to rebuild.

Neighbor: for a scene against a reference or web budget, use blender-scene-build-and-reference-check.
