---
name: assessment-rubric-and-item-check
description: Verify a teacher's draft test before it goes out - solve every multiple-choice item independently and compare with the answer key, test each option so exactly one is correct and every distractor is wrong for a named reason, and check that a scoring rubric has distinct observable level descriptors and weights that sum to the stated total; report every mismatch before anything is delivered and leave the teacher to decide changes. Use when a teacher asks to write, check or finalise assessment items, an answer key or a scoring rubric. Not for grading student work, assigning final grades, judging students or writing a whole course.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [answer key, multiple choice, distractor, rubric weights, test verification, item check, calculus, assessment]
  verified-runtimes: [claude-code]
---

# Assessment rubric and item check

An answer key that nobody solved independently is the most common test error. Solve first, compare second,
report before delivering.

## Steps

1. List the items, the options and the key as given. If asked to write items, write them first, but
   do not look at your own key while verifying.
2. Solve each item from the stem alone, showing the working, and write your answer before comparing
   with the key. For calculus or algebra, check by a second route (differentiate back, substitute,
   evaluate at a point).
3. Test every option, not only the keyed one. For each distractor give the specific error that
   produces it (dropped chain-rule factor, sign slip, forgotten constant) or, if no error produces
   it, say it is arbitrary. If a distractor is also correct (an equivalent form, a different but
   valid expression), flag the item as having two correct options and name both.
4. Compare with the key. Report mismatches as: item, key says, independent solution says, why.
   A flagged item is not fixed silently; offer the smallest repair (change the option, change the
   stem) and let the teacher choose.
5. For a scoring rubric: check that each level descriptor within a criterion is observable (something
   a grader can see in the answer) and distinct from its neighbours, and that criterion weights sum to
   the stated total (add them and show the sum). If they do not sum, say by how much and list the
   ways to repair it without choosing for the teacher.
6. Deliver the verification report before the final test. Mark each item verified, mismatched or
   ambiguous. Do not present a key as verified for an item you did not solve.
7. Say what you did not check: curriculum fit, difficulty level, fairness for particular students.
   The teacher decides the final items, key and weights.

## Output

A per-item table (item, your answer, key, match, option notes), the list of problems with repair
options, the rubric sum check, and a line saying the teacher decides.
