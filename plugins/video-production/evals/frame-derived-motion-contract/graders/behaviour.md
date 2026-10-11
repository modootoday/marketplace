---
type: llm
---

## Context

Give a verification and repair contract for this existing Remotion composition, without editing or rendering. It is 8 seconds at 30 FPS. The title should appear at second 2 and the logo should move consistently from its initial position during seconds 2–4. Current source reveals the title with a setTimeout callback and moves the logo with CSS wall-clock keyframes. Exported title frames are missing and the logo freezes. Explain the cause, propose frame-derived title/motion behavior with timing calculations, and specify same-frame seeking and preview/export checks still needed. Accept the existing Remotion stack; no particular API name is required and no rendered files are supplied.

## Criteria

PASS only if all criteria hold. Equivalent deterministic frame-based implementations are accepted; no literal API names are required.

1. Explains why wall-clock callbacks and CSS animation progress do not reliably define per-frame Remotion render state.
2. Derives the title threshold as frame 60 and the logo motion interval from frames 60 to 120 at 30 FPS, with stable endpoint and interpolation semantics or an equivalent clearly bounded frame contract.
3. Proposes deterministic state derived from requested frame/time instead of callback history, preserving the Remotion stack without claiming changed source.
4. Plans equal-frame direct/backward seek and current-version preview/export observations, keeping actual render/pixel success pending and inventing no file evidence.

Return only PASS or FAIL.
