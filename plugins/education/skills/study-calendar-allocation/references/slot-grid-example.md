# Slot grid with a parent-availability check, worked example

Different content from any user's case: two children, Ana (grade 2, reading 5 days, 1 hour) and Ben (grade 5, needs
3 extra reading hours a week), a shared art hour, and a parent who is away every Monday and Tuesday.

## Rules the grid follows

1. Parent-free days are the only days a parent-dependent slot may sit on. Here that is Wednesday, Thursday and Friday.
2. A shared slot is one row with both names. Child-extra hours get their own rows and never share a time with another child's supervised hour.
3. Days the parent is away appear as rows that say "parent away" and hold only work the child can do alone, labelled independent. Never place Ben's extra hours or the shared hour there.
4. After the grid, one line per rule: "Checked: shared art Wednesday 9-10, parent home; Ben's 3 extra hours Wednesday 10-11, Thursday 9-10, Friday 10-11, parent home and no other child's hour at that time."
5. A conflict the constraints force is stated, not hidden: Ana reads 5 days but the parent is home 3, so two of her days are independent.

## Result

| Day | 9-10 | 10-11 | Parent |
| --- | --- | --- | --- |
| Mon | Ana reading (independent) | none | away |
| Tue | Ana reading (independent) | none | away |
| Wed | Shared art, Ana and Ben | Ben extra reading | home, one child at a time |
| Thu | Ben extra reading | Ana reading | home |
| Fri | Ana reading | Ben extra reading | home |

Conflict flagged: Ana's reading on Monday and Tuesday has no supervisor; options are independent work, a relative,
or fewer than 5 days.

## Slippage in hours for each plan

| Plan | Demand | Capacity after one missed week | Result |
| --- | --- | --- | --- |
| Core only | 70 h | 14 weeks x 5 h = 70 h | 0 h slack, still fits |
| Core plus optional | 78 h | 70 h | 8 h short |

Capacity lost in a missed week is hours per week (5 here). Each plan gets its own row; "no buffer" without a number is not enough.
