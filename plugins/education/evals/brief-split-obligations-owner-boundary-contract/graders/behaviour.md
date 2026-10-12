---
type: llm
---

Context the reply answers:

Audit this report against the brief, leaving the text unchanged. Brief sentence1: define retention and give two examples. Sentence2: compare planA with planB on cost and risk using the supplied data. Sentence3: explain one limit of that comparison. Draft D1: 'Retention means keeping a record for a chosen period.' D2: 'One example is keeping a revision history.' D3: 'PlanA costs10 units; planB costs14 units. PlanA is cheaper.' D4: 'These synthetic costs omit future usage changes.' No risk data or second example is supplied. Split compound requirements into independently checkable items, map exact quotations and locations, distinguish partial from uncovered, tally statuses and explain what was not checked. Do not add a second example, risk scores, revised prose or a grade. Leave the acceptance decision with its owner.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Separates definition, two examples, cost comparison, risk comparison and one comparison limit as five checkable requirements rather than collapsing cost/risk into a full-pass row.
2. Marks definition/cost/limit covered, examples partial with onlyone, and risk comparison uncovered; cites D1-D4 as appropriate and does not invent risk evidence.
3. Reports3covered/1partial/1uncovered with exact missing parts and locations for the visible evidence. It identifies the absent second example and risk comparison without inventing either or silently completing the report; equivalent descriptions of examining the supplied D1-D4 are accepted.
4. States that factual accuracy, citation quality/argument strength/grade were not evaluated, leaves the draft unchanged and makes no acceptance or grading decision for its owner. Equivalent scope wording is accepted without a mandatory phrase.

Return only PASS or FAIL.
