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
5. Branch by what the question is about, and call only that branch (details under "Pick the branch" below).
6. Write three sections: **Observed** (measured changes with periods and units), **Possible explanations** (each one
   worded as a possibility, with the metric that supports it), **To check next** (what would confirm or rule it out).
   For every possibility, including a seasonal or demand-side one and a ranking-side one, write one line: the metric or
   tool to look at and the result that would confirm it and the result that would rule it out.

## Pick the branch

Branches are alternatives: take the one the question names, and add another only when the first result calls for it.

- **Ad clicks on the blog's own ads** ("how are clicks doing", "which post earns"): `my_impression_click` for the
  click trend, `my_impression_ranks` for the posts with the most ad clicks. These are clicks on ads shown in the blog,
  which is the revenue side. They are not impressions or clicks from search results, and not search ranking.
- **Revenue** ("which post earns", "which post is worth more per view"): `my_revenue` for the AdPost revenue trend
  (`period` and `compare` for a month-on-month or year-on-year change). `my_revenue_ranks` lists the top content by
  ad revenue in won, as of the most recent settlement date. `my_revenue_efficiency` gives each post's RPM, revenue per
  1,000 views in won. Absolute revenue and RPM answer different questions: a high-traffic post can have low RPM and a
  low-traffic post a high one. Quote each figure with its unit and the date the tool reported; a post missing from a
  list has no figure, which is not zero. All three read the user's own account. If another tool needs `blogId`, take
  it from `my_channels`: the id of the `naver_blog` channel is the `blogId`.
- **One post** ("why did this post move", "who read it", "what brings people to it"): `my_content_detail` for its daily
  views, time on page and likes, `my_content_inflow` for the search terms that lead into that post,
  `my_content_audience` for who read it. Take `contentId` from `my_top_content` or `my_soaring`.
- **Publishing rhythm** ("how often should I post", "was there a gap", "do visits rise after I post"):
  `my_publish_calendar` sets publish dates against visits. It shows what happened together, not what a posting
  frequency would cause.
- **Clips**: `my_moments` lists the blog's clips with plays, likes and comments, for "which clip does well compared
  with posts". It reports those counts; it says nothing about reach beyond them.
- **Region and competition** ("this area vs that one", "who competes for this keyword"): codes first from
  `local_regions` and `local_job_categories`; `local_region_trend` compares one business type across regions and
  `local_area_category_rank` compares business types within one region. For search competition, `blog_rank_profile`
  (how fresh and how titled the top posts are) and `content_volume` (how many documents exist). `ad_competition_density`
  needs the user's search-ad credentials and may be unavailable.

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
- `my_inflow`: the search terms that bring readers in, ranked, with their share; call when inflow moved.
- `my_inflow_domain`: the route readers arrive by (search, social, direct and other domains); call to see which route moved.
- `my_audience`: reader gender and age as reported; only if the question is about who reads.
- `my_device`: PC versus mobile share.
- `my_dwell`: time on page.
- `my_revisit`: returning-reader rate.
- `my_revenue`: ad revenue; only for revenue questions.
- `my_revenue_ranks`: top content by ad revenue (won), as of the latest settlement date.
- `my_revenue_efficiency`: per-post RPM (revenue per 1,000 views, won); not absolute revenue.
- `my_channels`: the channels the user owns or can access; the `naver_blog` channel id is the `blogId` other tools take.
- `my_content_info`: find a post by title or URL.
- `my_content_detail`: one post's recent daily views and engagement; `contentId` is a URL and `days` defaults to 14.
  It does not accept arbitrary start/end dates; use the returned window and date context rather than assuming the requested period.

Only when discovery cannot find the required tools, work only from the output the user pasted, say which tool each figure came from,
and do not invent the rest.
