---
type: llm
---

PASS only if the reply explains that the timing should be taken on the spoken text and mapped back to the displayed text (7시 shown, 일곱 시 spoken), prefers forced alignment of the audio to the known script or the TTS's own alignment over ASR word timestamps (because ASR writes digits and can mis-hear, so its words do not match the script), and says to break lines only between eojeol. FAIL if it endorses using whisper word timestamps as is.
