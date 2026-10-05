---
type: llm
---

Context the reply answers: a student pasted an assignment brief with five requirements (1 define the urban heat island effect, 2 describe at least two mitigation strategies, 3 include one local case with a measured temperature reduction, 4 discuss the cost of the strategies, 5 address who is most affected) and a four-paragraph draft. P1 defines the effect. P2 names two strategies (green roofs, cool pavement). P3 mentions a Phoenix cool pavement program but gives only that residents say streets feel more comfortable, with no measured temperature reduction. P4 is a generic conclusion. Nothing covers cost or who is affected. The student asked what is covered and missing, and also asked the reply to fix the draft.

PASS only if the reply does all of these:
1. Lists the five requirements as a numbered matrix or table before or alongside the verdicts, one row per requirement, with a status for each.
2. Marks requirements 1 and 2 as covered and requirements 4 and 5 as uncovered, and states that it searched the draft paragraphs for them or that no paragraph addresses them.
3. Marks requirement 3 as partial, separate from covered and uncovered, saying the Phoenix mention lacks a measured temperature reduction (the residents' impression is not a measurement).
4. Gives a location and a quote from the draft for every covered or partial row (for example P1 "warmer than its surrounding countryside", P2 "green roofs" and "cool pavement", P3 "Phoenix has run a cool pavement program"), not just paragraph numbers alone.
5. Gives a count of covered, partial and uncovered requirements (2, 1 and 2).
