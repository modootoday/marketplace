---
description: A generated locked-off clip drifts and shows a watch and stray text. The reply must measure the drift, flag both defects and rewrite the prompt with a retry cap.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [generated-video-clip-spec-check]
---

Decide whether this AI-generated clip passes and tell me how to fix it. I have been regenerating it blindly.

Brief: a 6 second locked-off tripod shot of a man walking across a Roman market. No lyrics or text on screen. Coins in the scene must be denarii. No wristwatch.

I sampled frames at 0, 3 and 6 seconds. At t=0 the horizon line is at y=410 px. At t=3 the horizon is at y=380 px, the man's left wrist shows a wristwatch, and there is a caption-like text blob near the bottom of the frame. At t=6 the horizon is at y=355 px. The clip itself is not available to you, only these notes.
