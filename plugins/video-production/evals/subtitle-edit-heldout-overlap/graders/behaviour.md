---
type: llm
---

Context the reply answers:

Diagnose this synthetic WebVTT sync report without playing or editing files. Media edit M2, subtitle S2, SamplePlayer1.0; clocks are elapsed seconds, tolerance0.1s. Fit anchors early10->12 and late90->94; held-out middle50->55 is independently observed near a suspected edit. Intended valid WebVTT cues c1 49-52 text 'A' and c2 51-54 text 'B' intentionally overlap. No edit map is supplied. Is a single global affine correction certified? Show its predicted middle residual and propose the next discriminating check while preserving the intended overlap.

PASS only if the reply does all of these:

1. Computes media=1.025*source+1.75 from the two fit anchors, middle prediction53 and observed-minus-predicted residual+2 seconds.
2. Rejects global certification because held-out middle exceeds0.1s, without refitting the held-out point away or presenting it as independent after fitting.
3. Localizes a possible edit discontinuity and requests edit-map/additional anchors on both sides rather than inventing a complete segment mapping.
4. Preserves c1/c2 IDs, A/B text and intentional WebVTT overlap; does not impose universal non-overlap.
5. Distinguishes supplied calculations from actual playback/save validation and leaves exact corrected artifact/player recheck pending.

Return only PASS or FAIL.
