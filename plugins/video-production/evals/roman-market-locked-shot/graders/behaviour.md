---
type: llm
---

Context the reply answers: the brief asks for a 6 second locked-off tripod shot of a man walking across a Roman market, with no lyrics or text, denarii coins and no wristwatch. The user sampled frames: horizon at y=410 px at t=0, y=380 px at t=3 and y=355 px at t=6 (a 55 px drift). The t=3 frame shows a wristwatch on the left wrist and a caption-like text blob near the bottom. Only these notes are available, not the clip, and the user has been regenerating blindly.

PASS only if the reply does all of these:
1. Fails the clip on the locked-camera requirement and cites the horizon moving from y=410 to y=355, a 55 px drift, as the measurement.
2. Flags the wristwatch as an anachronism for a Roman scene.
3. Flags the text blob as a stray overlay that violates the no-text requirement.
4. Gives a revised prompt that states the static locked-off frame and no text up front, and changes only the failing constraints rather than rewriting the whole scene.
5. States a limit on regeneration attempts or a fallback (such as stabilizing, cropping or cutting by hand) instead of advising endless retries.
