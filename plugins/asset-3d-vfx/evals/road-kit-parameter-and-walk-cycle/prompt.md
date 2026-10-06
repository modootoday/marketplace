---
description: A geometry-node road kit overlaps at one parameter corner, has a pedestrian path gap at a junction and a rig foot slide. The reply must classify each, tie fixes to retests and list untested cases.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [blender-procedural-and-rig-asset-verification]
---

I made a geometry-node road kit with a walking character on it. Check my test results and tell me what to fix.

Exposed parameters: lane_count 1-4 and curve_radius 5-50 (meters). I tested only a few settings. With lane_count 4 and curve_radius 5 the lanes overlap in the curve. The T junction has a 0.3 m gap on the pedestrian path. In the walk cycle the planted foot slides 4 cm at frame 12. I have not tested a four-way junction, the maximum radius, or importing the kit into the game engine.
