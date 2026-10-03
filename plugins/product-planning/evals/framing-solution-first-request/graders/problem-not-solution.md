---
type: llm
---

PASS only if all four hold:
1. It states a problem in terms of a user and what they cannot do today, without naming CSV
   export (or any other solution) inside that statement.
2. It names the evidence that is missing or should be checked before building (for example, what
   the sales team's customers actually do with the exported data, or how often it is asked for).
3. It gives a success signal that could be observed after release (a behaviour or a number).
4. It lists at least one non-goal or something explicitly out of scope.

FAIL if any of the four is missing, or if most of the reply designs the CSV export (columns,
formats, buttons) instead of framing the problem.
