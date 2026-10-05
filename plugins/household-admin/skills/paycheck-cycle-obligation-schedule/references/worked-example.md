# Worked example: layout and checks

Inputs: net pay 1,000 every second Friday (Jan 2, Jan 16, Jan 30). Rent 400 due the 1st, one
card with balance 5,000, APR 24 percent, minimum 25 due on the 20th, a 90 expense due Jan 30
(amount confirmed by the user).

## Periods

- P1 Jan 2 to Jan 15: no bill due, the card minimum falls on Jan 20 so it is in P2.
- P2 Jan 16 to Jan 29: the card minimum (Jan 20) is due here.
- P3 Jan 30 to Feb 12: rent due Feb 1 is here, so P3 pays it. The 90 due Jan 30 is funded
  from P1 and P2 (45 each), since it is due on the pay date itself.

## Table layout, one per pay date

| Line | P1 | P2 |
| --- | --- | --- |
| Income (plus carry-over) | 1,000.00 | 1,000.00 |
| Fixed bills due in the period | 0.00 | 0.00 |
| Minimums due in the period (paid first) | 0.00 | 25.00 |
| Set-aside for the 90 (confirmed) | 45.00 | 45.00 |
| Remainder after the lines above | 955.00 | 930.00 |
| Extra payment to the card | 955.00 | 930.00 |
| Total assigned (must equal income) | 1,000.00 | 1,000.00 |

Rule used for every table: the minimums that fall due in that period are listed and paid
before the extra line. A minimum due in a later period is not prepaid unless the user says so;
it appears in its own period's table. Say this once before the tables.

## Interest line

Stated formula: balance x APR x 14 / 365 on the starting balance of each period, added before
that period's payments. P1: 5,000 x 0.24 x 14 / 365 = 46.03, so the balance after P1 is
5,000 + 46.03 - 955 = 4,091.03. If a payment would exceed balance plus interest, the table
shows the true payoff amount and carries the unused remainder to the next period.

## Closing wording

"This is arithmetic on the numbers you gave me, not financial advice. You must confirm the loan
terms, due dates and how payments are applied with each lender; I have not verified any of
them." If the user asked whether to transfer a balance or skip a payment: say that is their
decision with the lender or a qualified adviser and list questions to ask, without a
comparison.
