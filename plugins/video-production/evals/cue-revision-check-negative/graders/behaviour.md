---
type: llm
---

Context the reply answers:

Transcribe unknown speech with no known script or pairs.

PASS only if the reply does all of these:

1. Addresses the neighbouring request without invoking the evaluated skill tts-subtitle-sync or imposing that skill's unrelated workflow. Appropriate neighbouring skills are permitted (for example talking-head-edit for recorded interviews). If required material is absent, asking for the minimum missing input is an appropriate answer; no invented finished artifact is required. Do not treat invocation of a different appropriate skill as invocation of tts-subtitle-sync.

Return only PASS or FAIL.
