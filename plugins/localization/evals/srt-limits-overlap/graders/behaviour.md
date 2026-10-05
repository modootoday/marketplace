---
type: llm
---

Context the reply answers: the user pasted six subtitle cues with limits of 42 characters per line, 2 lines per cue and 17 characters per second. Cue 2 is one line of 83 characters (3.4 s). Cue 4 is one line of 69 characters and ends at 00:00:12,000 while cue 5 starts at 00:00:11,500, so cues 4 and 5 overlap. Cue 6 is 32 characters in 0.7 s (about 46 characters per second).

PASS only if the reply does all of these:
1. Lists cues 2 and 4 as exceeding 42 characters per line, with character counts close to 83 and 69.
2. Flags the overlap between cues 4 and 5 by cue id and timestamps.
3. Computes at least one reading speed in characters per second from the cue text and duration, with the numbers shown, and identifies cue 6 or cue 2 as over 17 characters per second.
4. Proposes line splits for the long cues at phrase boundaries, not mid-phrase.
5. Leaves the timestamps of valid cues unchanged and labels any retiming as a proposal.
