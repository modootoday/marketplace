---
type: llm
---

Context the reply answers:

Manifest assigns scene s1/cut c1 to assetA2 hashH2 with1280x720 alpha-required specification. Available fileA1 has hashH1,1280x720 RGB and baked checkerboard. Prompt text claims consistent palette but no pixel report. Decide acceptance using supplied facts only, no image generation.

PASS only if the reply does all of these:

1. Rejects version/hash mismatch and missing real alpha/baked checkerboard.
2. Records scene/cut mapping and exact measured/spec identities.
3. Leaves palette/style checks unverified without report/file inspection.
4. Provides focused corrections without claiming new generation or accepting prompt claims as artifact proof.

Return only PASS or FAIL.
