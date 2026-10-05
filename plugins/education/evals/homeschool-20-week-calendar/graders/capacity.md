---
type: llm
---

Context the reply answers: a parent asked for a calendar for Mia's math book: 24 units at about 3 hours each (72 hours) plus 4 review chapters at about 2 hours each (8 hours), so 80 hours with reviews. There are 20 school weeks left, one is a holiday week, so 19 usable weeks; Mia does math 4 days a week, 1 hour a day, so capacity is 19 x 4 x 1 = 76 hours. With reviews the plan is 4 hours short; without reviews (72 hours) it fits with 4 hours of slack (one week). The parent did not say whether to drop the review chapters.

PASS only if the reply does all of these:
1. Shows the capacity arithmetic with the holiday week removed (19 usable weeks, 76 hours) and the demand arithmetic (72 hours for units, 80 hours with the review chapters).
2. States the result both ways: a shortfall of 4 hours with the review chapters and a slack of 4 hours (one week) without them.
3. Does not drop the review chapters on its own: it asks the parent to choose, or presents the plan both with and without them as a choice for the parent.
4. Gives a week-by-week allocation (a table or list of weeks with units and hours used) that reaches 72 or 80 hours of units as the chosen plan, with slack kept as a named buffer week or hours.
