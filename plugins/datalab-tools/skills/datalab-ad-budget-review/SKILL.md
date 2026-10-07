---
name: datalab-ad-budget-review
description: Review a Naver search ad account from its balance, actual spend and keyword spend, then compare bid alternatives as estimates kept apart from actual results. Use when the user asks where the ad money is leaking, how many days the budget will last, or what bid to set on Naver search ads. Not for changing bids, campaigns or budgets, and not for promising estimated clicks as results.
metadata:
  tier: open
  level: L3
  domain: search-ads
  install: optional
  keywords: [naver search ads, ad budget, bizmoney, keyword spend, bid estimate, cpc, campaign stats, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Search ad budget review

Look at what already ran first. Bid estimates come second, as a separate set of alternatives.

## Procedure

1. Confirm the review period, campaign and goal. If only the period is missing, use the last 7 days and say so.
2. Read the balance, actual spend, impressions and clicks (`ad_bizmoney`, `ad_campaign_stats`, `ad_keyword_spend`).
   Days of budget left = balance divided by average daily actual spend over the stated period. The balance is one
   account-wide pool, so divide by the actual spend of all devices together (the one place a combined actual figure
   is right), show the division and give a single number of days, then show the per-device split beside it.
3. Only when new keywords are being considered, look at demand, competition and the exposure floor
   (`ad_keyword_stats`, `ad_competition_density`, `ad_min_exposure_bid`).
4. Compare bid alternatives with `ad_performance_balance` or `ad_estimate_bulk`. Use `ad_average_position_bid` only
   when the user has a specific rank target.
5. Write the result in three sections: **Actual spend** (what ran), **Estimated scenarios** (what the estimators say
   might happen), **Next check** (what to look at again and when). Name the period and the device behind every number.

## Rules

- No search ad credentials connected: explain that setup is needed and invent no figures.
- Estimated impressions, clicks and cost are never written as actual results or as a guarantee. Label them estimates.
- Keep PC and mobile apart: report each device on its own line and never blend their rates or apply a one-device
  estimate to the other. The only combined figure is the actual-spend total used for days left.
- A keyword with spend and no conversions is a fact to report with its period, not proof the keyword is bad; say what
  else would need checking (landing page, conversion tracking, match type).
- The tools only read and estimate. Never say a bid, campaign or budget was changed. When the user asks for a change,
  give the value to enter and say they make the change in the ad console themselves.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `ad_bizmoney`: current prepaid balance; call first for days-left questions.
- `ad_campaign_stats`: actual spend, impressions and clicks per campaign for a period.
- `ad_keyword_spend`: actual spend and clicks per keyword; find where money goes.
- `ad_keyword_stats`: search volume for candidate keywords before adding them.
- `ad_competition_density`: how crowded a candidate keyword is.
- `ad_min_exposure_bid`: lowest bid that gets a keyword shown at all.
- `ad_estimate_bid`: estimated bid for a target outcome on one keyword.
- `ad_estimate_performance`: estimated clicks and cost at a given bid.
- `ad_performance_balance`: compare several bid levels as estimated scenarios.
- `ad_average_position_bid`: bid estimate for a specific average rank target only.
- `ad_estimate_bulk`: estimates for many keywords at once.

Only when discovery cannot find the required tools, work only from the tool output the user pasted, name
the tool each number came from, and do not invent the missing output.
