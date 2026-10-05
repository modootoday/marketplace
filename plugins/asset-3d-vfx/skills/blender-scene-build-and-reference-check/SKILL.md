---
name: blender-scene-build-and-reference-check
description: Plan and verify a Blender scene with measurable checks - write down dimensions, units, camera path and the delivery budget first, compare a render to the reference image for composition, shape, material and lighting with the view used, check modular parts for matching dimensions, connections, collisions in every state and collection structure, and for web delivery compare file size, texture count, load time and frame rate to the target. Use when a creator builds a scene from a reference photo, a camera previz, a modular kit with door or object states, or a web-ready asset, and wants to know what passes. Not for generating 3D meshes or textures, rendering, or sculpting.
metadata:
  tier: open
  level: L3
  domain: asset-3d-vfx
  install: optional
  keywords: [blender, scene check, modular kit, camera previz, glb, web 3d, reference comparison]
  output-license: the user's own scene and reference; the skill adds no third-party content
---

# Blender scene build and reference check

Creators build Blender scenes from a reference photo, a camera path, a modular corridor kit
with open and closed door states, or a web target, and report that dimensions drift, parts
intersect in one state, and web performance is tuned only afterwards. Write the numbers down
first, then check against them. This skill plans and verifies; it does not generate meshes,
textures or renders. Generated-asset checks belong to a different skill.

## Steps

1. Before the build, record the spec: units and scale, each module's dimensions, the camera
   path and shot length, the states each part has, and the delivery budget (file size,
   texture count, target frame rate and device). Reuse these numbers as the checks.
2. Reference comparison: compare the render with the reference for composition, shape,
   material and lighting. Name the camera or view used for each difference, and list the
   differences rather than saying it looks close.
3. Modular parts: compare each module's measured dimensions with the spec and with its
   neighbor at the connection, check intersections in every state (a closed door against its
   frame), and check the collection structure (parts, states and props grouped as planned).
4. Camera previz: check the path against obstacles and the framing at start, middle and end.
5. Web delivery: compare the measured file size, texture count, load time and frame rate to
   the budget, and give one next step per miss (decimate, compress textures, merge
   materials, reduce draw calls).
6. List passing checks too. List every check that was not measured as not measured, and do
   not state a value that was not given.

## Output

One table with a row for every check in the plan, including each state of each part and
each budget item: columns check, planned value, measured value, and pass, fail or not
measured. A check nobody measured gets its own row marked not measured. Then a next step
per failure and the passing list. The creator decides what to rebuild.
