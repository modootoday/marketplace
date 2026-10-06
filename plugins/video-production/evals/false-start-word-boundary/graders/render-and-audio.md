---
type: llm
---

Context the reply answers: the same 200-second clip edit, to be uploaded to a platform at -14 LUFS with subtitles needed.

PASS only if the reply:
1. Renders the keep segments in one pass with trim and concat filters (or a concat list), re-encoding so cuts are frame-accurate, and keeps audio and video in sync.
2. Uses a two-pass loudnorm to the -14 LUFS target (measure, then apply with the measured values), possibly after a high-pass for rumble.
3. Re-times the subtitles to the edited video (the original SRT times shift after the cuts).
4. Verifies the output with ffprobe and checks every cut point by watching or listening to it (not only a spot check).
