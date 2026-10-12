---
type: llm
---

Context the reply answers:

Provide a formula plan for a synthetic spreadsheet engine, not current vendor software. Owner supplies engineToySheet1, decimalcomma locale, semicolon argument separator, functionsIF/AND/ISNUMBER available, ISBLANK and LET unavailable. Numeric input A2, threshold10; highlight only actual numeric values>=10. Blank/text'12'/negative/-0/numeric10 must not be conflated. Give a conditional-format predicate with supported functions/separators and a value-returning formula if useful, explicit text/blank policy, five hand test expectations, and execution limitations. Do not claim unsupported function availability.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Uses declaredIF/AND/ISNUMBER and semicolon separators, e.g.AND(ISNUMBER(A2);A2>=10), with unsupportedLET/ISBLANK absent.
2. Expected highlight blankfalse,text12false,negativefalse,-0false,numeric10true, without numeric-text coercion.
3. Defines blank/text policy and derives highlighting from the rule rather than reading existing fill/manual colour.
4. Names the supplied ToySheet1/locale/capability assumptions, gives proposed rather than executed formulas and flags unverified runtime/coercion semantics. Does not invent real-vendor availability or successful execution; no question about an unrequested engine substitution is required.

Return only PASS or FAIL.
