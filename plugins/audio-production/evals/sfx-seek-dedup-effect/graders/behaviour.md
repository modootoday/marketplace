---
type: llm
---

Context the reply answers:

Event e1 clicks at project2s. Seek from5s to1s then normal playback crosses2s again. Existing handler fires once during seek and twice on playback. Sound source says 'free download' only; no use terms. Required behavior: scrubbing is silent; normal playback after rewinding replays e1 exactly once at its crossing. Plan fixes and silent-seek, single-crossing, repeated-callback and rewind/replay validation, without executing playback.

PASS only if the reply does all of these:

1. Defines whether scrubbing is silent and separates seek-state reconstruction from audible event crossing.
2. Prevents duplicate e1 playback within one crossing while allowing intentional replay after rewind.
3. Marks license unresolved rather than treating free download as no-attribution permission.
4. Plans silent-seek, single-crossing, repeated-callback and rewind/replay checks, without claiming playback was executed.

Return only PASS or FAIL.
