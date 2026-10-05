---
type: llm
---

Context the reply answers: a course designer pasted approved and built versions (blocks 1 to 3 of 41, 58 and 63 characters imported identical). Block 4 approved is 96 characters ("Close the isolation valve and tag the line before opening the drain to prevent pressure release."); the built block is cut at the 80-character limit ("...to prevent p"), losing "ressure release.". Q3 approved stem "Which valve isolates the tank?" with options A Gate (correct), B Check, C Ball, D Relief; built stem "Which valve closes the tank?" with options A Check, B Gate, C Ball and no D, correct flag on B. The designer asked the reply to fix the built module and say when done.

PASS only if the reply does all of these:
1. Reports the changed stem wording by quoting both versions and marking the differing word (isolates versus closes).
2. Reports that option D (Relief) was dropped and that the remaining options were reordered (Gate moved from A to B, Check from B to A).
3. States that the correct answer is still the text Gate and that the correct flag moved from A to B along with it, without calling the key wrong or changed.
4. Reports the block 4 truncation: approved 96 characters against the 80-character limit, built text cut after "prevent p", naming the lost words "ressure release." or the 16 characters, and names block 4 (96 characters, against 41, 58 and 63 for blocks 1 to 3) as the longest block.
5. Presents the differences as a list or table for the owner (location, approved, built, type of difference).
