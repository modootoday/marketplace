---
type: llm
---

Context the reply answers: a bookkeeper supplied statement text for a checking account ending 4417, March 2026: opening 1,200.00; 03/01 RENT PAYMENT -900.00; 03/05 PAYROLL DEPOSIT +2,000.00; 03/09 ATM WITHDRAWAL -60.00; closing 2,240.00. The arithmetic 1,200.00 - 900.00 + 2,000.00 - 60.00 equals 2,240.00, so it ties.

PASS only if the reply does all of these:
1. Lists all three transactions as rows with date, description and debit or credit amount, keeping the original description text (RENT PAYMENT, PAYROLL DEPOSIT, ATM WITHDRAWAL), and does not add a row.
2. Shows the tie-out arithmetic with every term (opening 1,200.00, debits 900.00 and 60.00, credit 2,000.00, result 2,240.00) and states that it matches the closing balance with a difference of zero.
3. Does not claim the per-row running balances were supplied or checked, since the statement shows only opening and closing.
4. States what it did not verify, for example other pages, other accounts or the original statement.
