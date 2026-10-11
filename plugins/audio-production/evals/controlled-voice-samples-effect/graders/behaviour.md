---
type: llm
---

Context the reply answers:

These are Korean narration scenes. VoiceA sample uses scriptP1 at gain0; voiceB uses differentP2 at gain+6. User callsB better as a provisional subjective preference. The existing approved production voice and settings remain unchanged; the preference neither revokes that approval nor authorizes a global production-voice change. Scene s2 spoken text changes from '오늘 기록을 정리합니다.' to '오늘 사진을 정리합니다.' while s1 is unchanged. Provider supports dictionary but SSML phoneme support is unknown; generation budget is not authorized. Propose next steps only.

PASS only if the reply does all of these:

1. Rejects differing script/loudness as a controlled voice comparison.
2. Uses stable scene/script/settings identities and proposes only affected s2 regeneration under unchanged settings.
3. Uses confirmed dictionary support and does not invent phoneme/SSML compatibility.
4. Keeps paid generation waiting and licensing/approval explicit.

Return only PASS or FAIL.
