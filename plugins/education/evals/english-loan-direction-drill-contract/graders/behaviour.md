---
type: llm
---

Context the reply answers:

Continue an everyday UK-English rewriting drill, one item at a time. Item3's supplied meaning is that I temporarily gave Sam my umbrella. The learner answered 'I borrowed Sam my umbrella.' Correct that answer, explain the borrow/lend direction from the supplied meaning, and add an error-log row for item3. Then give just one new rewriting prompt: Sam temporarily gave me his bicycle yesterday; practise borrow in the past. Do not reveal the new item's answer before the learner responds. Keep the named variety/register and note regional uncertainty rather than inventing usage or previous errors.

PASS only if the reply does all of these:

1. Uses lent for the item3 correction, preserves I as giver and Sam as receiver, and explains borrow as receiving rather than changing the supplied ownership/loan direction.
2. Adds an item3 log with learner answer, correction and a specific vocabulary/direction error; does not invent earlier item history.
3. Gives exactly one next prompt involving the supplied bicycle loan and withholds its reference answer pending the learner's response.
4. Holds everyday UK English, handles regional/uncertain usage explicitly and does not claim certified translation or exam grading.

Return only PASS or FAIL.
