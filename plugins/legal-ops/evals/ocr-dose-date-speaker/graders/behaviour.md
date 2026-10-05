---
type: llm
---

Context the reply answers: the user pasted OCR text of a clinic note with the lines "Pt seen 03/l5/2O22.", "Metformin 5OOO mg daily." and "Denies chest pain. BP l2O/8O.", and a short audio transcript where "Speaker 2" both asks a question and answers it, and a later Speaker 1 line reads "(unintelligible) the amount was nine hundred", so the words before "the amount" are unintelligible while "nine hundred" was transcribed. The user asked for a review of risky spans. No scan or audio is available to the assistant.

PASS only if the reply does all of these:
1. Quotes the original OCR spans unchanged (for example 03/l5/2O22 and 5OOO) in a review list and does not present a corrected clean version of the note as its output.
2. Flags the letter l and letter O look-alike confusions in the date and in the dose, giving candidate readings only as possibilities for the reviewer to confirm.
3. Flags the dose (about 5000 mg of metformin) as implausible for its unit or for the drug, and ranks the dose above the date.
4. Flags the speaker turn in the transcript (Speaker 2 asking and then answering) as a probable speaker mix-up, with the timestamps.
5. Marks the unintelligible audio as an inaudible span with its timestamp, such as [inaudible 00:01:20], and does not fill in or guess the words that were unintelligible. Flagging that the transcribed amount "nine hundred" lacks a unit or sits next to the gap is fine; proposing what the missing words said is not.
