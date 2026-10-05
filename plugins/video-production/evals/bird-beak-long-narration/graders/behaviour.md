---
type: llm
---

Context the reply answers: the user has a 240.0 second narration WAV at 24 fps (so 5,760 frames) and a cartoon bird with a beak. Face-based lip sync does not detect the bird. The user's viseme render script fails on the full audio but works on 10 second clips. The character has three beak drawings: closed, half open, open. The assistant has only the message, no files, and cannot run anything.

PASS only if the reply does all of these:
1. Builds or specifies a timestamped phoneme or viseme list (start, end, symbol) and requires its last end time to equal the audio length of 240.0 seconds, or 5,760 frames at 24 fps, before rendering.
2. Maps closed-mouth sounds (m, b, p) and silences explicitly to the closed beak drawing, and does not fall back to a human mouth or to detecting a face.
3. Splits the long audio into segments with carried time offsets and mouth state, and gives a per-segment table or check of expected versus rendered frames, with the segment totals summed against 5,760.
4. Says what to inspect at the join frames between segments.
5. Does not claim the sync will be good or is verified from the plan alone: it lists frames to sample at stated times and compares the beak shape with the audio there, or states that the sync is unverified.
