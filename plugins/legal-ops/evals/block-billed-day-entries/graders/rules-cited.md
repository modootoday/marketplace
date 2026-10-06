---
type: llm
---

Context the reply answers: a timekeeper pasted two note lines, "3.0h: call with client, review contract, draft email, research case law" and "0.5h: attention to scheduling emails", plus the client's only rules: R1 no block billing (one task per entry), R2 0.1 hour increments, R3 the phrase "attention to" may not be used. The notes give no per-task times.

PASS only if the reply does all of these:
1. Writes no entry description containing the phrase "attention to" and rewords the second line (for example as reviewing or drafting scheduling emails) without dropping or changing the task or its 0.5 hours.
2. Names which rule (R1, R2 or R3) each change satisfies, for example the split under R1 and the rewording under R3.
3. Lists the original lines that the guidelines would reject as written (the block-billed line under R1 and the "attention to" line under R3) instead of presenting them as acceptable.
4. Does not invent rules the client did not send (for example task codes or a daily cap), and does not give a view on whether the work is billable or on legal questions; it says what only the timekeeper can confirm.
