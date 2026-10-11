---
description: sfx-design effect synthetic workflow case
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [sfx-design, video-workflow-20261010]
---

Event e1 clicks at project2s. Seek from5s to1s then normal playback crosses2s again. Existing handler fires once during seek and twice on playback. Sound source says 'free download' only; no use terms. Required behavior: scrubbing is silent; normal playback after rewinding replays e1 exactly once at its crossing. Plan fixes and silent-seek, single-crossing, repeated-callback and rewind/replay validation, without executing playback.
