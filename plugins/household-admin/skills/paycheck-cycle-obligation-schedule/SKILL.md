---
name: paycheck-cycle-obligation-schedule
description: Turn a person's own numbers - pay dates and net pay, bills with due dates, debts with balance, rate and minimum, dated one-off or yearly expenses, or a mixed receipt - into a table per pay date that places every item by its due date, never assigns a dollar twice, recomputes interest with a stated formula, sets aside future expenses per pay period marked estimated or confirmed, and splits a receipt by line item so the parts sum to the total including tax. Use when someone wants a pay-period plan, an extra-payment allocation or a budget split from figures they supply. Not for financial, debt, tax or credit advice, for choosing which debt or product to use or for verifying loan terms.
metadata:
  tier: open
  level: L3
  domain: household-admin
  install: optional
  keywords: [paycheck, budget, pay period, debt payment schedule, interest, sinking fund, receipt split, biweekly]
---

# Paycheck cycle obligation schedule

This is arithmetic on the numbers the person gave. It does not decide what they should do
with their money, and it cannot know their loan terms.

## Steps

1. Echo the inputs as a list: pay dates and net amount, each bill with amount and due date,
   each debt with balance, APR and minimum, and each dated expense. Mark anything missing
   (a due date, whether a minimum is monthly) and state the assumption used, not a guess
   presented as fact.
2. Define the pay periods: period k runs from pay date k to the day before pay date k+1.
   A bill belongs to the period in which it is due, and is paid from that period's pay or
   from money set aside earlier. A bill due on or after the next pay date goes to the next
   period. Put the due date next to every placed item.
3. Read `references/worked-example.md` for the layout before writing the tables. Build one
   table per pay date: income (plus carry-over), fixed bills due in that period,
   minimum payments due in that period, set-asides, the remainder, then the extra payment.
   Every row has a number and the totals are shown to add up to income plus carry-over, so
   no dollar is assigned twice. Minimums are paid before any extra amount.
4. Interest and balances. State one formula (for example balance x APR x days / 365 for the
   period, or APR / 12 added monthly), the compounding assumption and how a payment is
   applied. Show for each debt and period: starting balance, interest, payment, ending
   balance, and recompute from the numbers the user gave. If a calculator or script is
   available, use it; otherwise show the working line by line.
5. Future expenses. For each dated expense, spread the set-aside over the pay dates before its
   due date (amount divided by the number of those pay dates, or a stated pattern), and
   mark each amount estimated or confirmed. A due date that falls on a pay date is funded
   from earlier pays unless the user says otherwise; say which.
6. Mixed receipt. List each line item with its category, apply the discount and the tax to the
   line items (state the rule, for example tax in proportion to taxable lines), and check
   that the category totals equal the receipt total. Items whose category is unclear are
   listed for the user to decide, not assigned.
7. Shortfalls. If a period cannot cover its fixed bills and minimums, show the gap in
   dollars and which items it affects. Do not invent income or drop a bill.
8. Close with the assumptions list and a closing statement that says both of these in plain
   words: "This is arithmetic on the numbers you gave me, not financial advice" and "You must
   confirm the loan terms, due dates and how payments are applied with each lender; I have not
   verified any of them". Do this even when you also answered other questions.
9. If the user asks which product to use, whether to transfer a balance or to skip a payment,
   decline to choose. Say that is a decision for them with the lender or a qualified adviser,
   and list questions to ask. Do not weigh the options against each other, do not invent a
   fee, rate or penalty to compare, and do not say what skipping would or would not do beyond
   the plan's own arithmetic.

## Output

The input list with assumptions, one table per pay date, the interest and balance table, the
set-aside schedule with estimated or confirmed marks, any shortfall, and the closing
statement.
