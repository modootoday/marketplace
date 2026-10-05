---
name: second-reader-grading-triage
description: Act as an independent second reader on student answers that a teacher or assistant already scored - grade each answer blind against the rubric before looking at the given score, quote the answer text that supports each rubric point or shows its absence, rank disagreements by score gap and list the top items for the teacher to recheck, flag rubric ambiguity, and never give a final grade. Use when a teacher wants to know which scored answers to recheck, or wants a second look for points missed on first reading. Not for assigning final grades, judging a student, detecting cheating or writing the rubric.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [grading, rubric, second reader, triage, teaching assistant, disagreement, review]
---

# Second-reader grading triage

The teacher grades. This skill finds where a second reading disagrees so the teacher's time goes
to the answers most likely to need a second look.

## Steps

1. Read the rubric first and list its points with their weights. Mark any point whose wording
   leaves two readings (for example "mechanism" worth two points with no split) as ambiguous
   and note the readings you will consider.
2. Score each answer blind: do all the scoring before comparing with the given score. Per rubric
   point, quote the words from the answer that earn it, or write "no support" and say what is
   missing. Give partial credit only if the rubric allows it and say which reading you used.
3. Only then compare with the given score. Per answer: given score, independent score, gap
   and direction (higher or lower than given).
4. Rank by absolute gap, ties first by direction toward a lower score from the given one when
   the quoted support is weak. List the top items for the teacher to recheck, with the one quote
   or missing point that explains the gap.
5. A small gap can hide opposite errors across points. Report point-level disagreement for
   the ranked items, not only the totals.
6. Do not output a final grade, a pass or fail decision, or a statement about the student. Call
   the independent score a second reading. If the answer text is not enough to judge a
   point (handwriting, a diagram), say so and leave it for the teacher.
7. Say that two readers agreeing is not proof: a shared blind spot remains. The teacher
   decides every score.

## Output

A table (answer, given, second reading, gap, direction), the ranked recheck list with quotes,
the rubric ambiguities that probably cause some gaps, and a note that the teacher decides.
