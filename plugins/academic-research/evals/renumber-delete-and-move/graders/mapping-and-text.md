---
type: llm
---

Context the reply answers: a manuscript with references [1] to [9] has this whole text: "Prior work covers this area [2,4-6]. We build on the method of [1,7], extend the analysis [4-6], and also see [9]." Reference 7 moves to position 2 and reference 5 is deleted; the rest keep their relative order. The correct new order is old 1, 7, 2, 3, 4, 6, 8, 9, so the mapping is 1->1, 7->2, 2->3, 3->4, 4->5, 5->deleted, 6->6, 8->7, 9->8. The correct rewritten citations are: [2,4-6] -> [3,5,6]; [1,7] -> [1,2]; [4-6] -> [5,6]; [9] -> [8].

PASS only if the reply does all of these:
1. Shows the explicit old-to-new mapping (with 5 marked deleted) before or with the rewritten text, and the mapping matches the one in the context.
2. Rewrites all four citations correctly: [3,5,6] for the first, [1,2] for [1,7], [5,6] for the second [4-6], and [8] for [9]. A range such as 5-6 for two numbers or equivalent notation is acceptable only if the numbers are the same.
3. Does not renumber [2,4-6] or [4-6] by simply subtracting one: it expands ranges and groups to single numbers first.
