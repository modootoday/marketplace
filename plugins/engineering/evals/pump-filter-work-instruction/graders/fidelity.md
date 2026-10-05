---
type: llm
---

Context the reply answers: the user said these are steps for changing the filter on a transfer pump, and dictated "shut valve 3, bleed the line, replace the filter (if it is clogged, swap the whole cartridge), restart the pump, check 2 bar" and asked for a work instruction and flow. The notes state no owner, no tools, no PPE, no torque, no isolation or lockout and no prerequisites.

PASS only if the reply does all of these:
1. Keeps the clogged-filter branch as its own labelled path (clogged: swap the whole cartridge) in both the steps and the flow, and keeps the five actions in the stated order.
2. Keeps 2 bar as the check value and adds no torque, PPE, lockout, isolation, cure or other numeric or safety content that the notes do not state (a note that such content is missing and must come from the safety owner is fine).
3. Does not invent the filter type, tool list or any other value; anything absent is shown as not stated or a question.
