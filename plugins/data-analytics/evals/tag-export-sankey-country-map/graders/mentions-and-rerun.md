---
type: llm
---

Context the reply answers: 40 handwritten visitor notes were typed in, 6 were unreadable, and Gallery B is mentioned 9 times; the user wants to label Gallery B as 9 visitors. The reply should correct the measurement claim and make the figures reproducible.

PASS only if the reply does all of these:
1. Says the heatmap counts mentions in notes, not visitors or visits, and refuses the label "9 visitors" (suggesting a label like 9 mentions), since one note can mention a gallery more than once or a visitor can write several notes.
2. States the denominator as 40 notes with 6 unreadable (34 readable) and says the unreadable ones are reported, not dropped silently.
3. Proposes code that reruns on changed data, with separate parse, join and draw steps and fixed style rules, which prints the totals check and the unmatched key list on every run.
4. States what it could not verify, such as the original files or the real boundary list.
