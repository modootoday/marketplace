---
type: llm
---

Context the reply answers: a QA of slide 3 of a 7-slide Instagram carousel from readings. Facts: render 1080x1080 while the brand sheet requires 1080x1350; headline broken between 최 and 대; headline font fell back to Noto Sans CJK KR instead of Pretendard Bold; body text #8FA89B on #F4EBD9 (contrast about 2:1 by estimate); the swipe arrow covers x 1000 to 1080 while the first headline line ends at x 1034; logo 44 px wide with a 64 px minimum; a stock photo of a smiling person with unknown origin where the brand forbids faces; the headline claims 70% while the terms page says up to 50%.

PASS only if the reply flags all of these:
1. The size/ratio mismatch (1080x1080 versus 1080x1350).
2. The headline broken mid-word between 최 and 대, and the headline running into the swipe arrow zone.
3. The font fallback from the brand's Pretendard Bold, and the low contrast of the body text with a ratio (computed or estimated) below 3:1.
4. The logo below its 64 px minimum, the face in the photo as a forbidden pattern, and the 70% claim contradicting the 50% terms.
