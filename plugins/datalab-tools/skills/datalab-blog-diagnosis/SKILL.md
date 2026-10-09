---
name: datalab-blog-diagnosis
description: Diagnose changes in the user's own Naver blog - visits, views, inflow sources, readers, dwell time, revisits and revenue - from the real statistics the datalab.tools extension reads. Use when the user asks why blog traffic or inflow dropped, wants last month's blog performance analysed, or asks which post is the problem. Not for forecasting future traffic, for blogs the user does not own, or for choosing the next topic.
metadata:
  tier: open
  level: L3
  domain: blog-analytics
  install: default
  keywords: [naver blog, blog analytics, traffic drop, inflow, visitors, dwell time, revisit, blog revenue, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Blog performance diagnosis

Measure what changed first. Then narrow the possible explanations with metrics from the same period.

## Procedure

1. Fix the period and the comparison baseline. If none is given, compare the latest period with the previous period
   of the same length, and say so with both date ranges.
2. Locate where and how much it changed with returned period evidence from `my_traffic_series` and `my_top_content`.
   `my_daily_brief` and `my_blog_summary` are headline checks, not substitutes for requested-period totals.
3. Only when a change is actually visible, add the fewest metrics that can explain it: `my_inflow`,
   `my_inflow_domain`, `my_audience`, `my_device`, `my_dwell`, `my_revisit`, `my_revenue`.
4. Check whether a specific post contributed with `my_content_info` and `my_content_detail`.
5. Write three sections: **Observed** (measured changes with periods and units), **Possible explanations** (each one
   worded as a possibility, with the metric that supports it), **To check next** (what would confirm or rule it out).
   For every possibility, including a seasonal or demand-side one and a ranking-side one, write one line: the metric or
   tool to look at and the result that would confirm it and the result that would rule it out.

## Rules

For mismatched definitions, report windows, missing days or incompatible totals, read [metric reconciliation](references/metric-reconciliation.md) before interpreting the change.

- Compare like with like: same period length, same unit, same metric definition.
- Missing, unsupported or partially aggregated values are never turned into 0. Name the gap, leave the day or metric
  out of totals and averages, and say the comparison excludes it.
- Moving together is not a cause. Do not write "X caused the drop" because X fell in the same weeks; write that X
  fell at the same time and what would test the link.
- No forecasts. Do not predict next month's visitors or revenue; nothing measured supports it. Say so when asked.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `my_daily_brief`: today's or yesterday's headline numbers; a quick first look.
- `my_blog_summary`: settled yesterday's date, views, visits and unique visitors; accepts no period arguments.
- `my_traffic_series`: daily series; find when the change started and spot missing days.
- `my_top_content`: posts ranked by views; see whether a few posts carry the change.
- `my_inflow`: inflow by source type (search, social, direct); call when inflow moved.
- `my_inflow_domain`: inflow by referring domain; call when one source type moved.
- `my_audience`: reader gender and age as reported; only if the question is about who reads.
- `my_device`: PC versus mobile share.
- `my_dwell`: time on page.
- `my_revisit`: returning-reader rate.
- `my_revenue`: ad revenue; only for revenue questions.
- `my_content_info`: find a post by title or URL.
- `my_content_detail`: one post's recent daily views and engagement; `contentId` is a URL and `days` defaults to 14.
  It does not accept arbitrary start/end dates; use the returned window and date context rather than assuming the requested period.

Only when discovery cannot find the required tools, work only from the output the user pasted, say which tool each figure came from,
and do not invent the rest.
