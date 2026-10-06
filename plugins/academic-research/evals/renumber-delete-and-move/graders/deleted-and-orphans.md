---
type: llm
---

Context the reply answers: a manuscript with references [1] to [9] has this whole text: "Prior work covers this area [2,4-6]. We build on the method of [1,7], extend the analysis [4-6], and also see [9]." Reference 7 moves to position 2 and reference 5 is deleted. The user stated that this is the whole text. Reference 5 is cited twice (inside both [2,4-6] and [4-6]). Over the whole text, references 3 and 8 are never cited (new numbers 4 and 7 after the change).

PASS only if the reply does all of these:
1. Flags that the two citations containing 5 pointed to the deleted reference, so those sentences lose a source, and asks the author what to do (replace or remove the claim) rather than silently dropping it.
2. Reports the uncited references: old 3 and old 8 (new 4 and 7) are never cited in the supplied text.
3. States whether any citation fails to resolve to an entry (none do after the change; the citations to deleted 5 are covered by item 1), and ties the uncited result to the text being the whole manuscript, which the user stated, or says it would be provisional for an excerpt.
