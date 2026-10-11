---
description: scripted-code-animation-verification prospective state-contract comparison
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [scripted-code-animation-verification, video-workflow-20261010]
---

Audit the following existing synthetic animation source and provide a verification plan, not a new animation. Total duration is12 seconds at30FPS; event time is5 seconds. Required opening state is messages m1,m2, folder F, draft D; t<5 retains that state, t>=5 adds exactly one m3 while retaining F/D. Repeated evaluation and direct/forward/backward visits to the same time must agree. Source:

```js
const initial = { messages: ["m1", "m2"], folder: "F", draft: "D" };
let state = structuredClone(initial);
function stateAt(t) {
  if (t >= 5) {
    state.folder = null;
    state.messages.push("m3");
  }
  return structuredClone(state);
}
```

The source is supplied in text only. No browser execution, screenshots or exported media exist. Report source-supported reset, repetition and backward-seek findings, propose viable state handling and boundary/equal-time checks, and leave rendered continuity pending.
