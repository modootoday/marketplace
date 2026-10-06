---
type: llm
---

Context the reply answers: a policyholder pastes a bill (Clinic A, service 2026-03-04, invoice 7781, billed 420.00), an EOB (claim C-55, same date, allowed 300.00, plan paid 240.00, patient owes 60.00, payment sent to Clinic A) and a proof of payment (patient paid Clinic A 420.00 on 2026-03-20 for invoice 7781), and asks to reconcile and what to ask. Arithmetic: billed minus allowed is 120; patient paid minus owed per EOB is 360; Clinic A received 240 plus 420, which is 660, against 420 billed.

PASS only if the reply does all of these:

1. Matches the bill, EOB and payment by service date and by invoice 7781 or claim C-55, and says which key links which pair.
2. Shows billed 420, allowed 300, plan paid 240, owed 60 and patient paid 420, and computes that the patient paid 360 more than the EOB's 60 owed, and that the 120 between billed and allowed is a question.
3. States that the plan paid 240 to Clinic A (no insurer payment reached the patient) and that Clinic A holds 660 in total against 420 billed, as an observation to question.
4. Phrases the gaps as questions for the clinic and the insurer (for example why 420 was collected), not as a conclusion that anyone is wrong or owes a refund.
