---
type: llm
---

Context the reply answers:

Three scene tracks measure -20,-14,-21LUFS before mixing, destination target is approved-16LUFS/-1dBTP. Track2 has a5ms onset tick; its first consonant begins8ms. Proposed blanket50ms trim would cut it. A shorter edit changes duration10.000->9.995s. No processing allowed; prepare correction plan.

PASS only if the reply does all of these:

1. Addresses scene loudness variation using measured destination target and exported remeasurement.
2. Rejects blanket50ms trim that damages onset speech and proposes inspecting minimum local fade/trim.
3. Tracks0.005s timing change and downstream placement/cue implications.
4. Does not claim audio processed/listened or target met.

Return only PASS or FAIL.
