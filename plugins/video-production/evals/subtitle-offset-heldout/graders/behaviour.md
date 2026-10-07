---
type: llm
---

Context the reply answers:

Check this synthetic subtitle/media clock mapping using supplied observations only; do not play or write files. Exact edit/media identity M1; subtitle S1; SamplePlayer 1.0 with zero player delay. All anchors are elapsed seconds: fitting early source10 -> media11.2, fitting late90 ->91.2; independent held-out middle50 ->51.2. Accepted residual tolerance0.1s. Subtitle label says24FPS, media label says25FPS but no frame-based source contract exists. Cue c1 starts10, ends12, text 'T', one line. Give fit/held-out residuals, the proposed cue and saved-player validation still required.

PASS only if the reply does all of these:

1. Derives media=source+1.2 seconds and zero residual at held-out50->51.2, labeling that anchor independent.
2. Proposes c1 start11.2/end13.2 while retaining ID c1, text T and its line layout.
3. Rejects FPS-label-only elapsed-time scaling in the absence of a frame-source conversion contract.
4. Scopes support to supplied anchors/edit M1 and asks for exact saved subtitle/player rechecks; does not claim playback or actual retiming.

Return only PASS or FAIL.
