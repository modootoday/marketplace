---
type: llm
---

Context the reply answers: a timekeeper pasted two note lines, "3.0h: call with client, review contract, draft email, research case law" and "0.5h: attention to scheduling emails", plus the client's only rules: R1 no block billing (one task per entry), R2 0.1 hour increments, R3 the phrase "attention to" may not be used. The notes give no per-task times.

PASS only if the reply does all of these:
1. Splits the first line into four entries (client call, contract review, email draft, case-law research) and keeps the second line as one entry, adding no task that is not in the notes.
2. Gives durations in 0.1 hour multiples whose sum for the first line is exactly 3.0 and whose grand total is exactly 3.5, with the arithmetic shown.
3. Labels the split of the 3.0 hours as an estimate (the notes do not give per-task times) for the timekeeper to confirm, rather than presenting it as recorded fact.
