---
type: llm
---

Context the reply answers:

Design an unexecuted spreadsheet check. Engine/version/locale/function support are all unknown. User wants to count manually green cells and classify dates in columnB. Supplied rows: r1manually green,date text'01/02/2030';r2no fill,actual serial/dateD2;r3manually green,blank. No date-interpretation locale or colour-reading API is supplied. Explain why ordinary formulas should use explicit helper labels for manual fill, propose original-preserving helper columns and tests, and leave ambiguous text dates unresolved rather than guessing Jan2/Feb1. Ask for environment facts before an executable formula.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Explains manual fill is not a reliable ordinary-formula condition absent colour API; proposes explicit helper labels and counts2green only from supplied manual labels.
2. Keeps original cells, separates blank/realdate/ambiguoustextdate and leaves01/02unparsedpendinglocale.
3. Requests engine/version/locale/separators/functions/date representation and proposes boundary tests without invented availability.
4. Does not claim live execution, infer all unknown coercion rules or turn manual fill into a value predicate silently.

Return only PASS or FAIL.
