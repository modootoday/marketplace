---
type: llm
---

Context the reply answers: a photographer has 140 indoor frames under tungsten (about 3200 K) and 160 outdoor frames in daylight (about 5600 K), and the indoor frames look orange after the film look, which the photographer likes for the dinner scenes. The photographer asks that every frame use the same white balance for consistency. A log shows 13 failed files and 285 outputs for 287 decoded files. No images were supplied.

PASS only if the reply does all of these:
1. Does not simply apply one white balance to all frames: it advises judging white, skin and exposure continuity within each scene and keeping the intended indoor warmth as a lighting difference the photographer chose.
2. Leaves the style decision with the photographer: asks for approval of the look on a sample from each scene (indoor and outdoor) before running the full batch, and lists the largest-deviation frames for manual review.
3. Proposes separating a base exposure and white-balance profile from the film look, or otherwise explains how to keep scene correction from fighting the look.
