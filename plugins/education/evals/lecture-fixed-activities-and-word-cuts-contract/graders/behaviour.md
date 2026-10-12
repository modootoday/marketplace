---
type: llm
---

Context the reply answers:

Fit a lecture to20 minutes. The measured working rate is120 words/minute. Section A has3 slides/600 words, including360 words of repeated examples that may be cut; B has2 slides/900 words teaching the protected core procedure; C has1 slide/300 words of required recap. Practice4min, Q&A3min and transitions1min are fixed. Show each section's spoken minutes/minutes per slide, add all non-speaking time, flag the overrun and longest-per-slide section, and offer a concrete cut plan whose savings close the gap without cutting B/C goals or the fixed slots. Do not simply assume a faster rate. The speaker chooses cuts and should time the revised version.

PASS only if the reply does all of these:

1. Computes A5min, B7.5min, C2.5min, 15 spoken minutes plus8 fixed minutes=23, three minutes over20.
2. Shows the per-slide timing, including B3.75min/slide as the longest section, rather than comparing slide count only.
3. Proposes removing or moving360 words of permitted A repeats, or another explicitly permitted equivalent, saving3min at120wpm and yielding20min without cutting protected B/C or fixed slots.
4. States where cut material goes, preserves goal/permission boundaries, leaves the cut decision with the speaker and recommends a timed revision check.

Return only PASS or FAIL.
