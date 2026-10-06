---
type: llm
---

Context the reply answers: the road kit parameters are lane_count 1-4 and curve_radius 5-50 m, and the creator tested only a few settings. Not tested by the creator: a four-way junction, the maximum radius and engine import. The reply should show a coverage plan and not claim untested cases pass.

PASS only if the reply does all of these:
1. Lists the untested cases explicitly (four-way junction, the maximum radius or other range ends, engine import) as not tested, and does not claim they pass.
2. Proposes testing the minimum, default and maximum of each parameter and their corner combinations (for example lane_count 1 and 4 against radius 5 and 50), not only the failing corner.
3. Presents the checks in a table or list with the setting or frame, the measured value and pass, fail or not tested.
