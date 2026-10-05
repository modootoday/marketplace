---
type: llm
---

Context the reply answers: the user pasted bylaw text for an R2 zone (Section 4.2 minimum lot width 15 m, Section 4.3 front setback 6 m, Section 4.5 maximum lot coverage 40 percent, effective 2024-01-01) and described a lot 14 m wide and 30 m deep with a proposed 10 m by 14 m footprint. The user asked whether they can build. The lot is 420 square metres and the footprint is 140 square metres. The prompt does not say where on the lot the building would sit.

PASS only if the reply does all of these:
1. Reports that the 14 m lot width fails the 15 m minimum, quoting or citing Section 4.2.
2. Shows the coverage arithmetic (140 over 420, about 33.3 percent) and says it passes the 40 percent limit in Section 4.5.
3. Says the front setback in Section 4.3 cannot be tested because the building position on the lot is not given, and names what is needed to test it.
4. Mentions the effective date 2024-01-01 and says that variance, overlay or exception clauses are not in the supplied text and could change the result.
5. Does not give a final yes or no on whether the user can build; it labels the result as screening only and lists items a municipal planner must confirm.
