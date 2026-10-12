---
type: llm
---

Context the reply answers:

Audit this supplied synthetic chart specification, no image is available. Data A40,B60,C100. Bars start at axis30 and have displayed heights10,30,70 with scale1unit/pixel. Caption says 'B is three times A.' Stacked totals shown: A components15+25 with label45; B20+40 with label60. Recompute sums and data ratios, compare height ratios and nonzero-axis distortion, propose corrected labels/axis/disclosure, and report what geometry cannot be inspected without a render. Plot area width300px has three40px bars and four30px gaps; check fit. No causal claim or image verification.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Reports actual B/A=1.5 versus visible height30/10=3 because baseline30, rejecting caption as a data-ratio claim.
2. Reconciles A components40 versus incorrect label45, B60 correct, and preserves actual data rather than altering them to match labels.
3. Computes120+120=240px within300 with60px remaining and gives an appropriate zero-axis or explicit nonzero-baseline correction.
4. Distinguishes recomputation of supplied numeric geometry from uninspected rendered geometry/readability. It does not claim an image was verified or make a causal inference. No mention of colour or special disclaimer phrase is required.

Return only PASS or FAIL.
