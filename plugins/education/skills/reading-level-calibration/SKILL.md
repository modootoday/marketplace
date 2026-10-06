---
name: reading-level-calibration
description: Write or adapt a reading passage, warm-up or practice text to a stated grade level by computing a readability formula and revising until the measured level is within one grade of the target, while keeping facts accurate and building on the learner's interest. Use when a teacher or tutor asks for a passage at a grade level, to simplify a text for a grade, or for fluency material on a student's interest. Not for diagnosing a student or writing assessments for placement.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [reading level, readability, Flesch-Kincaid, grade level, passage, differentiation]
  verified-runtimes: [claude-code]
---

# Reading level calibration

Teachers report that a passage requested at grade 6 measures between grades 4 and 9. A model
asserting "this is grade 3" is not a measurement.

## Steps

1. Fix the inputs: target grade, word count, topic, learner interest, standard or question to
   cover. Ask for what is missing; assume nothing silently.
2. Draft, then measure with a named formula. Flesch-Kincaid grade level:
   `0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59`. Show words, sentences,
   syllables and the result. If a tool can count, use it and say so. Otherwise count by hand
   per sentence, write the word count of each sentence in the check block so the total can be
   audited, and re-add them before reporting; hand totals drift by a few words.
3. If the result is more than one grade from the target, shorten sentences and swap long words,
   then measure again. Report each round's number and stop within one grade.
4. Keep content accurate. When simplifying a source, list each claim removed or softened. Do
   not add facts the source does not support.
5. Use the learner's interest by name as the frame or examples (a soccer fan gets soccer words
   and comparisons in the text itself), with the grade, standard and facts held constant.
6. State the final word count against the requested range.

## Output

The passage, then a short check block: formula, counts, measured grade, target, word count,
claims dropped or softened. Say that the measure is a formula estimate, and that a teacher
should check fit for the student and the answers to any questions.
