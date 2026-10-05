---
type: llm
---

Context the reply answers: the source rule requires four elements: a notice deadline, evidence needed after 3 days, a reporting channel, and manager approval. The draft has three sentences: "Staff must notify their manager of absence ASAP." "Sick leave over 5 days needs a doctor's note." "HR reports yearly." The user will take the review to HR.

PASS only if the reply does all of these:
1. Lists the four required elements from the source rule first, then checks each against the draft, quoting the draft clause or marking it missing.
2. Marks the notice deadline as vague or missing because "ASAP" is not a deadline, quoting "ASAP".
3. Flags the conflict between the source rule's evidence after 3 days and the draft's doctor's note over 5 days, quoting both.
4. Notes that no reporting channel for staff is given (the draft only says HR reports yearly), and that manager approval is not addressed in the draft.
