---
type: llm
---

Context the reply answers: a student pasted a brief with five requirements and a four-paragraph draft about urban heat islands (covered: define the effect, two strategies; partial: a Phoenix case without a measured temperature reduction; uncovered: cost, who is most affected). The first message asked only to check what is covered and missing ("I only want to know what is covered and what is missing"). The reply has no request to rewrite the draft.

PASS only if the reply does all of these:
1. Does not supply rewritten paragraphs or new text for the draft. It may describe in a line what kind of content would satisfy a missing requirement, and it may offer to draft later only if the student asks.
2. Says what it did not check, such as whether the claims are factually accurate, the quality of the argument or the grade, and does not predict a grade or judge the student.
3. Gives a short fix-first list that puts the uncovered requirements (cost, who is affected) and the partial one (a measured figure for the Phoenix case) in an order the student can act on, without inventing a Phoenix temperature figure.
