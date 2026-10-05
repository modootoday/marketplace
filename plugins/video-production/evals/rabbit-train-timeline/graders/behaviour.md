---
type: llm
---

Context the reply answers: the user requested a 12-second HTML animation: a rabbit boards a train, the train passes through a tunnel, the rabbit gets off; autoplay, deterministic time axis, no text, one file. The delivered code defines scenes board 0-3, ride 3-6, tunnel 5-8, leave 8-10 seconds, reads time from performance.now() at load, ends the loop at t < 10, draws the text "Choo choo" with fillText, and the rabbit position is 400 at the end of boarding and rides until 8 at x = 600, then restarts at x = 120 when getting off. The assistant can only read the code and cannot run it.

PASS only if the reply does all of these:
1. Reports the total duration in the code as 10 seconds against the requested 12 seconds.
2. Reports that the tunnel event (5-8) overlaps the ride scene (3-6) instead of following it, or otherwise places each of the three required events on the timeline with its time range.
3. Flags the position jump at the cut to the leave scene (rabbit at x = 600 jumps to x = 120) as a continuity failure.
4. Flags the "Choo choo" text as violating the no-text requirement, and flags the time axis as based on the wall clock from performance.now() rather than a fixed clock or frame counter.
5. Does not say the animation is accepted or works from reading the code alone: it states which checks stay unverified and gives frames or times to sample.
