---
type: llm
---

PASS only if it detects silences with silencedetect using a threshold and minimum duration, keeps a small margin so words are not clipped, renders keep segments with re-encoding for accurate cuts, and re-times subtitles to the edited video. FAIL if subtitles are not re-timed or there is no margin around cuts.
