---
type: llm
---

Context the reply answers:

For Korean narrated subtitles, one spoken pair has no aligned interval and an extra display pair has no spoken source. Produce a repair plan, no invented timestamps.

PASS only if the reply does all of these:

1. Reports both missing mapping and unsupported display pair.
2. Requires exact audio/script identities and alignment repair.
3. Does not invent synchronized cue times.

Return only PASS or FAIL.
