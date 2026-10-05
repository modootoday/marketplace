---
type: llm
---

Context the reply answers: the plan is a modular corridor kit where every segment is 4 m x 3 m x 3 m with open and closed door states, and a web target under 5 MB at 60 fps on a mid-range laptop. Measured: segment A is 4 x 3 x 3, segment B is 4 x 3.1 x 3, the closed door mesh intersects the frame by 2 cm, the GLB is 8.2 MB, and the scene runs at 38 fps on the creator's laptop. Load time was not measured and the render was not compared with the reference image.

PASS only if the reply does all of these:
1. Flags segment B's 3.1 versus 3 dimension as a mismatch that affects the connection with the neighboring segment, with a fix.
2. Flags the 2 cm door and frame intersection in the closed state, with a fix.
3. Flags the 8.2 MB GLB against the 5 MB limit and the 38 fps against the 60 fps target, with a separate next step for each (for example texture compression, decimation, fewer draw calls).
4. Lists what passes, such as segment A's dimensions.
5. Lists load time and the reference comparison as not measured and does not claim those checks passed.
6. Gives one row per check in a table, each row showing the planned value, the measured value and pass, fail or not measured, and the rows include the open door state as not measured as well as segment A, segment B, the closed door, the GLB size, the frame rate, load time and the reference comparison.
