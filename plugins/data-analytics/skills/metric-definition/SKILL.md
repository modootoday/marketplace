---
name: metric-definition
description: Define a product or business metric so two people computing it get the same number - the entity counted, the event that counts, the time window and timezone, inclusions and exclusions, the source table, the query, and the guardrail metric that catches gaming. Use when the user introduces or questions a KPI such as active users, retention, conversion or churn, or when two dashboards disagree. Not for choosing which metric matters most.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [metric definition, KPI, active users, retention, conversion, dashboard mismatch]
  verified-runtimes: [codex-cli]
---

# Defining a metric

Two dashboards that disagree usually compute different things under one name.
A metric is defined when its definition leaves nothing to the person writing
the query.

## The definition card

| Field | Answer it precisely |
| --- | --- |
| Name and one-line meaning | what decision it informs |
| Entity | users, accounts, stores, orders; how test, internal and deleted ones are treated |
| Qualifying event | which event or state counts, with its exact name in the data |
| Window | day, week (which day starts it), month; rolling or calendar |
| Timezone | the one the boundaries use, stated (UTC or the business's zone) |
| Numerator and denominator | for rates, both, and who is in the denominator |
| Exclusions | bots, refunds, trials, duplicates |
| Source | table or event stream and its freshness |
| Query | the reference query, kept with the card |
| Guardrail | the metric that would expose gaming this one (for example retention next to sign-ups) |

## Checks before adopting it

- Compute it two ways (two queries or two tools) for one period and reconcile any
  difference before publishing.
- Check the edges: a user active at 23:59 and 00:01, a refunded order, a merged
  account.
- Make sure it can move: if a feature cannot change it within the review period,
  it is a report, not a target.

## When two dashboards disagree

Write the card for each, find the first field that differs, and decide which is
right for the decision at hand; rename the other.
