---
description: remotion-explainer frame-derived motion contract
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [remotion-explainer, video-workflow-20261010]
---

Give a verification and repair contract for this existing Remotion composition, without editing or rendering. It is 8 seconds at 30 FPS. The title should appear at second 2 and the logo should move consistently from its initial position during seconds 2–4. Current source reveals the title with a setTimeout callback and moves the logo with CSS wall-clock keyframes. Exported title frames are missing and the logo freezes. Explain the cause, propose frame-derived title/motion behavior with timing calculations, and specify same-frame seeking and preview/export checks still needed. Accept the existing Remotion stack; no particular API name is required and no rendered files are supplied.
