---
type: llm
---

Context the reply answers: the same Remotion composition request for a 1920x1080, 30 fps, 15.5-second video of three scenes.

PASS only if the reply:
1. Writes or describes a render manifest (composition id, props, version, output path, duration).
2. Says to verify the rendered file with ffprobe against the brief: resolution 1920x1080, 30 fps, and duration about 15.5 s (465 frames).
3. Says to watch the render once end to end, and does not claim it rendered or verified anything itself.
