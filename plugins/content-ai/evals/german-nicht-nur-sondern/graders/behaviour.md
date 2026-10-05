---
type: llm
---

Context the reply answers: the user pasted five German paragraphs and asked to remove the habit "nicht nur X, sondern auch Y" while keeping the two contrasts that say something real. The true counts of the frame are: paragraph 1 has one "nicht nur ... sondern auch"; paragraph 2 has two; paragraph 3 has one "nicht ... sondern" contrast (it states what the study measured and what it did not, and the follow-up sentence relies on it); paragraph 4 has one; paragraph 5 has one "nicht ... sondern" contrast (the report recommends renovation, not demolition, because of the heritage listing). Paragraphs 3 and 5 are the two real contrasts. The facts in the draft are: the station is a traffic hub and a meeting place for the whole city with about 120,000 daily users; the new tram line is faster and quieter and saves four minutes and two transfers; the study measures per capita, not per household, so it is not comparable with 2019; the riverside park is green and hosts concerts in summer, with three events planned per month; the report recommends renovation, not demolition, because of the heritage listing, at an estimated 4.2 million euros. Statements of these facts, including "in summer" and the two transfers, are not new claims. The sandbox has no files, only the pasted text.

PASS only if the reply does all of these:
1. Counts the frame per paragraph before rewriting, with counts matching the context (1, 2, 1, 1, 1 or equivalent) or a total of six.
2. Keeps the contrasts in paragraphs 3 and 5 and says why they are real claims, while rewriting the instances in paragraphs 1, 2 and 4.
3. Writes the rewritten paragraphs in natural German with its own clause structure, and none of the rewritten paragraphs 1, 2 or 4 still contains "nicht nur ... sondern auch" or a close twin such as "nicht bloss ... sondern".
4. Keeps every fact and number from the draft and adds no new claim, praise or fact.
5. Re-counts the frame in the rewritten text and reports the remaining instances (the two kept ones).
