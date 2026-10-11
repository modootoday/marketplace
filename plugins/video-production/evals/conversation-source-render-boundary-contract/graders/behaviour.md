---
type: llm
---

## Context

Verify the source versus rendered-boundary contract of this synthetic simulated conversation, without editing or executing it. The required state is m1/m2, folder F and draft D before second 5; at or after second 5 exactly one m3 is added, retaining F/D. The animation is 12 seconds at 30 FPS. Pasted source: const initial={messages:["m1","m2"],folder:"F",draft:"D"}; function stateAt(t){const next=structuredClone(initial); if(t>=5){next.messages.push("m3");} return next;} No rendered captures or player observations are supplied. Explain what the provided source supports, what it cannot prove about pixels/playback, and a boundary/direct/backward-seek validation plan using the supplied timing. Do not claim missing code, rendered success or actual execution.

## Criteria

PASS only if all criteria are met. Accept semantic equivalents, not exact wording or a prescribed table.

1. Recognizes provided stateAt reconstructs initial state per call, retains F/D, adds m3 once after threshold and is source-level path independent; does not invent reset/duplicate defects.
2. Distinguishes source-supported findings from unobserved rendered continuity, cursor/pixel and player behavior, withholding rendered approval without declaring pasted code absent.
3. Plans threshold-adjacent sampling and equal-time forward/backward/direct observations grounded in 5 seconds/30 FPS; equivalent before/at/after approaches accepted.
4. Preserves the source-audit task without generating a replacement animation or claiming executed rendering/playback.

Return only PASS or FAIL.
