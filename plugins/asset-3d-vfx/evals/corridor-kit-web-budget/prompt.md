---
description: A modular corridor kit has a height mismatch, a door intersection and a web budget miss. The reply must flag each with a next step, list the passing items and not claim unmeasured checks.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [blender-scene-build-and-reference-check]
---

I built a modular corridor kit in Blender for a web scene. Check it against my plan and tell me what to fix.

Plan: every segment is 4 m x 3 m x 3 m (length x width x height). Each segment has two door states, open and closed. The web target is under 5 MB with 60 fps on a mid-range laptop.

Measured: segment A is 4 x 3 x 3. Segment B is 4 x 3.1 x 3. In the closed state the door mesh intersects the frame by 2 cm. The exported GLB is 8.2 MB. It runs at 38 fps on my laptop. I did not measure load time and I have not compared the render to the reference image.
