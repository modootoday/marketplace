---
type: llm
---

Context the reply answers:

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

PASS only if the reply does all of these:

1. Identifies folder reset to null, repeated m3 accumulation and stale future m3 after a visit to t>=5 followed by t<5; the shared mutable state makes results history-dependent.
2. Preserves required m1,m2/F/D before5 and m1,m2,m3/F/D from5 onward through a viable reconstruction or reversible state scheme. Deduplicating m3 alone does not restore past folder/message state.
3. Plans captures or state checks bracketing5seconds, for example frames149/150 at30FPS, and equivalent repeat/direct/forward/backward visits to a common time. Equivalent precise boundaries are acceptable; draft must be retained.
4. Reports the12-second/360-frame contract and distinguishes text-source deductions from unexecuted browser/capture/export validation; no claim that rendered continuity works.

Return only PASS or FAIL.
