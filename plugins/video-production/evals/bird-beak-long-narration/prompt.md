---
description: A cartoon bird narration of 4 minutes where face lip sync fails and the render dies on long audio. The reply must plan a viseme timeline with a length check, a closed-beak mapping, a segment table and sampled-frame verification without claiming the sync is good.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [lipsync-viseme-timeline-check]
---

I have a 4 minute narration WAV (240.0 seconds, 24 fps) and a cartoon bird character with a beak. Face-based lip sync does not detect the bird at all, and my viseme render script dies on the full audio but works on 10 second clips. The script has three beak drawings: closed, half open, open. Plan the mouth animation and tell me how to check it before I render. You only have this message, no files, and cannot run anything.
