---
type: llm
---

Context the reply answers:

Adapt this fictional text for target grade0 and16-20 words: 'The red ball rolls. Sam can stop it. A big dog runs. The dog is wet.' For this controlled exercise each source word is one syllable. First audit the source using Flesch-Kincaid grade=0.39*(words/sentences)+11.8*(syllables/words)-15.59; then revise and remeasure until within one grade of0, preserving all four supplied story facts. You may change sentence boundaries; do not invent why the dog is wet or any new event. Show word counts per sentence and totals for each round, final word range, changes made and the formula-estimate limitation. Use the learner's dog interest as the frame, not a diagnosis.

PASS only if the reply does all of these:

1. Audits the initial16words/4sentences/16syllables and computes approximately-2.23, outside the specified one-grade tolerance for0.
2. Produces a16-20-word revision and supplies auditable new counts/calculation within-1 to1; merely renaming the original as grade0 does not satisfy revision.
3. Preserves rolling red ball, Sam's ability to stop it, a running big dog and the dog's wet state; does not add a cause or new event.
4. Reports revisions and the word-range check, labels readability as a formula estimate and retains teacher judgement instead of diagnosing or guaranteeing fit.

Return only PASS or FAIL.
