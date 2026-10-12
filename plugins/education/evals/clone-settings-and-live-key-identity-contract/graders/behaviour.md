---
type: llm
---

Context the reply answers:

Audit an approved source against a cloned course using only these snapshots; no edits. Both have body='Welcome.' and two identical options: approved order A='One' incorrect,B='Two' correct; clone order B='Two' correct,A='One' incorrect. Both text limits are 50 characters. Source opens 2030-01-10 and closes 2030-01-30, staff-group enrolment only, pass threshold80, three attempts, completion requires passing, quiz link='/courses/source/quiz'. Clone opens 2030-01-11 and closes 2030-01-20, public enrolment, threshold70, unlimited attempts, completion on opening, quiz link still '/courses/source/quiz'. Clone course identity is '/courses/clone'. Compare exact text and settings, distinguish option order changes from a key that still identifies Two, count text against limits without inventing truncation, and flag retained source links and all setting changes for owner acceptance. Do not infer actual link availability.

PASS only if the reply does all of these:

1. Finds option order changed while the correct flag still follows Two; does not call that a wrong-answer-key change.
2. Finds the supplied opening/closing/enrolment/threshold/attempt/completion differences and gives source and clone values.
3. Flags the quiz link as still targeting the source, without claiming it is live or broken; reports body equality and length8 below limit50, with no demonstrated truncation.
4. Does not edit or approve the clone, distinguishes supplied comparisons from unexamined media/tracking/layout, and leaves decisions with the owner.

Return only PASS or FAIL.
