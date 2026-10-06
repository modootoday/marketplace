---
name: cohort-retention
description: Build and read cohort retention - users grouped by the period they started, the share still active in each later period, with the activity definition, the timezone and the incomplete latest periods stated - so retention is compared like for like instead of from a single blended number. Use when the user asks whether users come back, how retention changed after a release, or wants a retention query or chart. Not for revenue forecasting.
metadata:
  tier: open
  level: L3
  domain: data-analysis
  install: optional
  keywords: [cohort analysis, retention curve, churn, SQL cohort query, user retention]
  verified-runtimes: [claude-code]
---

# Cohort retention

A blended "30-day retention" mixes old loyal users with this week's sign-ups and
moves when the mix moves. Cohorts keep starts apart.

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

Keep the cohort size beside every row. Mark cells whose period has not finished
yet; an incomplete last week looks like a drop.

## Read it

- Compare the same offset across cohorts (week 4 of March vs week 4 of April).
- Look for where curves flatten; that level is the retained core.
- Tie a change between cohorts to what changed for them (release, channel, price)
  and say that it is a correlation unless it was tested.
- Small cohorts swing; show the size and do not over-read them.

## Output

The definitions, the query, the triangle table or curve, and three sentences of
reading with the caveats.
