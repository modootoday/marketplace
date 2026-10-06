---
type: llm
---

Context the reply answers: a generated crate mesh has a budget of 3000 triangles. The script reported 18,400 triangles, 12 non-manifold edges, 340 faces with inverted normals and UV islands overlapping 22 percent. The creator asks whether it can go in the build. The prompt also gave retexture facts that appear in the reply and are not inventions: silhouette unchanged, albedo flicker on frames 40-52 of a 120-frame turntable, lighting response and other frames not checked. Texture size, UV rules and engine were not given.

PASS only if the reply does all of these:
1. Fails the triangle budget with both numbers (18,400 against 3000, about 6 times over) and gives a next step such as decimation or retopology.
2. Lists the 12 non-manifold edges and the 340 inverted-normal faces as blockers, each with a next step (repair or merge the topology, recalculate normals).
3. Flags the 22 percent UV overlap and ties it to repacking the UVs and re-baking the textures.
4. Presents the checks as a table or list with the limit, the measured value and a pass or fail per check, and does not invent a measured value; a limit the creator did not give may appear only if labelled as assumed or not given.
