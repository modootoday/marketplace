---
name: cohort-retention
description: Build and read cohort retention - users grouped by the period they started, the share still active in each later period, with the activity definition, the timezone and the incomplete latest periods stated - so retention is compared like for like instead of from a single blended number. Use when the user asks whether users come back, how retention changed after a release, or wants a retention query or chart. Not for revenue forecasting.
metadata:
  tier: open
  level: L3
  domain: data-analysis
  install: optional
  keywords: [cohort analysis, retention curve, churn, SQL cohort query, user retention]
  verified-runtimes: [claude-code, codex-cli, grok-cli]
---

# Cohort retention

A headline retention rate can mix cohorts and move when the mix moves. Confirm
the rate's denominator, cohort weights and maturity rule before diagnosing it.
A mature day-30 metric must not count users who have not reached day 30 as failures.

## Define first

- **Cohort**: the period of the user's first qualifying event (sign-up, first
  purchase), weekly or monthly.
- **Active**: the event that counts as coming back, and that it is different from
  the event that put them in the cohort.
- **Period**: calendar weeks or days since start; the timezone of the boundary.
- **Exclusions**: test accounts, bots, staff.

## Query shape

1. One row per user with their cohort period.
2. One row per user per period they were active.
3. Join, compute the period offset, count distinct users per cohort and offset,
   divide by the cohort size.

Keep the actual user start date for exact elapsed-day offsets; grouping starts
by calendar month does not move every user's day zero to the first of that month.
Do not interchange day-30 retention and next-calendar-month retention. Without
the schema or cohort data, give the required table layout and inputs, not invented
observed rates or a query presented as ready to run.

Keep the cohort size beside every row. Mark cells whose period has not finished
yet; an incomplete last week looks like a drop.

## Read it

- Compare the same offset across cohorts (week 4 of March vs week 4 of April).
- Look for where curves flatten; that level is the retained core.
- Tie a change between cohorts to what changed for them (release, channel, price)
  and say that it is a correlation unless it was tested.
- Small cohorts swing; show the size and do not over-read them.

Treat mix shift, acquisition quality and immature windows as hypotheses until
the actual cohort rates, weights and eligibility rule distinguish them. A stable
old cohort does not rule out a regression affecting only new users. Compare
similarly exposed cohorts and channels at the same completed offsets; do not
attribute the observed drop to the campaign without those observations.

## Output

The definitions, the query, the triangle table or curve, and three sentences of
reading with the caveats.
