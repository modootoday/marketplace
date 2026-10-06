---
description: A generated crate mesh fails budget and topology checks and its retexture flickers in a frame range. The reply must report fails with numbers and leave acceptance to the artist.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [generated-3d-asset-qc]
---

An AI generated a crate for my game and then retextured it. Can it go in the build? Report pass or fail and next steps.

Budget: 3000 triangles. Stats from my mesh script on the generated crate: 18,400 triangles, 12 non-manifold edges, 340 faces with inverted normals, UV islands overlapping 22 percent.

Retextured version: the silhouette is unchanged from the source, but in the turntable sequence (frames 1-120) the albedo flickers on frames 40-52. I did not check the lighting response or the other frames closely.
