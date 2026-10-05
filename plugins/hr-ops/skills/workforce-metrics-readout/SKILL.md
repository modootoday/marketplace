---
name: workforce-metrics-readout
description: Compute aggregate workforce metrics such as 90-day attrition, turnover and labor-hours or payroll pivots from HR rows the user pastes - numerator, denominator, cohort and period defined first, terminations, transfers and rehires handled explicitly, a minimum group size applied, and row counts reconciled to the source. Use when someone needs attrition, turnover or hours and payroll totals by department or group from HR data. Not for ranking, scoring or judging individual employees, predicting who will leave, or defining a product metric (see metric-definition in data-analytics).
metadata:
  tier: open
  level: L3
  domain: hr-ops
  install: optional
  keywords: [attrition, turnover, 90-day attrition, headcount, labor hours, payroll pivot, HR analytics]
---

# Workforce metrics readout

HR rate tables go wrong in three places: the denominator does not match the people who could
have left, edge rows (transfers, rehires, pre-period hires) are silently dropped or double
counted, and small groups expose individuals. Settle those before any number is shown.
This skill reports groups only. It never lists, ranks or scores a person.

## Steps

1. Define before computing, in one block: the metric name, the cohort (who is in the base),
   the numerator (who counts as an event), the period, the as-of date, and the unit of grouping.
   For 90-day attrition: cohort = people hired inside the stated window, numerator = cohort
   members whose exit date is within 90 days of their own hire date. Say whether the window
   needs to have fully elapsed for every cohort member as of the as-of date.
2. Use a denominator that matches the cohort. A hire-window cohort is not divided by period
   average headcount; a period turnover rate (exits over average headcount) is a different
   metric, so state which one the user asked for.
3. Handle the edge rows by a stated rule, one line each:
   - hired before the window: outside the cohort (name how many rows and why);
   - exited after the 90-day mark: in the denominator, not in the numerator;
   - rehired: a new hire record counts as its own cohort entry only if the user says so;
   - transferred between groups: pick the assignment rule (group at hire date, or group at
     exit date). Apply the user's rule, or state your default, and show how the rates change
     under the other rule when a transfer touches a reported group.
4. Apply a minimum group size. Use the user's number; if none is given, propose one (five is
   a common choice, the policy is the user's) and say it is a proposal. Do not report a rate
   or a count of leavers for a group below it. Check the complement: if the totals plus the
   other reported groups let a suppressed cell be back-calculated, either withhold the total
   split or merge the small groups into one combined line, and say which. Never write the
   withheld rate or leaver count, or a figure it follows from (the overall leaver total beside
   the shown groups, a subtraction that yields it), anywhere in the reply, including the
   reconciliation and the reasoning. The size of a small cohort may be stated, since it is the
   reason for suppression and shows no outcome. Reconcile rows (supplied = in cohort +
   excluded, with the cohort size per group) and say the shown leaver counts match the shown groups.
5. Show the pivot: group, cohort size, events, rate, with the rate written as the fraction
   (for example 2/5). Hours and payroll pivots get the same treatment: group by the stated key,
   sum the stated columns, and show the control totals.
6. Reconcile to the source: rows supplied = rows in cohort + rows excluded (each with its
   reason), and event counts add up. A pivot total that differs from the source total is a
   finding to report, not a number to smooth.
7. Close with what could not be verified (data quality of dates, whether records are complete)
   and that HR or finance owns the final figures.

## Output

Definition block, edge-row rules, the pivot with fractions, suppressed groups named as
suppressed (with the group size rule), the reconciliation line, and open questions. No row-level
lists in the result; refer to source rows by count only.
