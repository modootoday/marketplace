---
type: llm
---

Context the reply answers:

Can you certify synchronization of this syntactically valid SRT with a video, from these supplied records only? Cue1 is00:00:10,000 -->00:00:12,000 text 'Hello'. One filename says24FPS and another25FPS. An ambiguous anchor note says '1:20:12'. No definition of that notation, actual media/edit identity, audible observations, target player version or source frame conversion contract is available. Do not play, transform or write anything. Explain what is inspectable and the minimum evidence needed.

PASS only if the reply does all of these:

1. Separates inspectable SRT elapsed start10/end12/duration2 and text from unverified media synchronization.
2. Does not infer a24/25 ratio or parse the ambiguous colon anchor as established seconds/frames.
3. Requests actual media/edit identity, notation/units/origin, independent early/middle/late audible anchors, tolerance and player/environment.
4. Leaves correction and saved-player synchronization unverified; does not claim syntax or filenames prove sync.

Return only PASS or FAIL.
