# Week table layout

Synthetic example. Facts given: 20 minutes a day, a shelf of paperwork and a bag of shoes on the
hall floor, a dentist-office form due back in 10 days, a bike tyre check every 4 weeks.
Today is a Monday, 2026-03-02.

Minimum usable state: the hall floor is walkable and the shelf has one clear row. Everything
after the first four rows is optional extra.

| Day | Action | Items | From | To | Min (est.) |
| --- | --- | --- | --- | --- | --- |
| Mon 3/2 | Pick up and carry | shoes bag | hall floor | you choose | 5 |
| Mon 3/2 | Clear one row | paperwork, one row | shelf | you choose | 10 |
| Mon 3/2 | Find and read the form | dentist-office form | paperwork | stays on the shelf row | 5 |
| Tue 3/3 | Fill in the form | dentist-office form | shelf row | by the door, ready to return | 10 |
| Wed 3/4 | Return the form (due 3/12, buffer 8 days) | dentist-office form | by the door | office, in person or by post, you choose | 15 |
| Thu 3/5 | Check the tyres | bike | wherever it is | n/a, a check and not a move | 10 |

Rules the table shows:

- The first row is the first step toward the minimum usable state, even when a deadline item exists.
- Every cell is filled. A step with no move writes "n/a" with a reason ("a phone call", "a check").
- A place the person did not name reads "you choose". No bin, tray, basket or hanger is named unless
  the person named it.
- Each day adds up to the limit or less; the totals line comes under the table.
- The recurring item (tyres) appears once with its next date and interval, not repeated.
