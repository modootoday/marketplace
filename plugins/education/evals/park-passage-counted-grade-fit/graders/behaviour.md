---
type: llm
---

Context the reply answers:

Check whether this fictional warm-up fits grade3 and28-35 words for a learner interested in park ball games. Retain its words if it already fits. Text: 'At the park, Sam kicks the red ball past a small tree near the gate. Then Sam and a friend pick it up and walk back to the green bench.' Use Flesch-Kincaid grade=0.39*(words/sentences)+11.8*(syllables/words)-15.59. For this exercise every word in the supplied text has one syllable. Show each sentence's word count, total words/sentences/syllables, arithmetic and fit within one grade; distinguish formula estimate from actual learner fit. Do not invent new story facts or diagnose the learner.

PASS only if the reply does all of these:

1. Counts15 words in each sentence, totals30words/2sentences/30syllables, and does not substitute an unsupported guessed count.
2. Computes grade approximately2.06 with the supplied formula, within one grade of3, and recognises30 words is within28-35.
3. Keeps the supported fictional park/ball story and retains wording already within the requested range rather than adding unrelated or unsupported facts.
4. Labels the score a formula estimate and leaves actual student fit to the teacher; no diagnosis or guaranteed learning claim is added.

Return only PASS or FAIL.
