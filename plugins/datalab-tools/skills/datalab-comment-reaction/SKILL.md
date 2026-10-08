---
name: datalab-comment-reaction
description: Check how Naver News comments moved - comment volume, number of commenters, hour of day, gender and age, device, country and news section spread - from the comment statistics the datalab.tools extension reads. Use when the user asks whether comment reaction grew, who comments and when, or which news sections a reaction spread to. Not for public opinion, sentiment or stance, which comment counts cannot show.
metadata:
  tier: open
  level: L2
  domain: news-analytics
  install: optional
  keywords: [naver news, news comments, comment trend, commenters, public reaction, demographics, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# News comment reaction check

Report activity and its limits together: compute comment growth, commenter growth, and comments per commenter for
each date. When comment growth greatly exceeds headcount growth, report the increase in aggregate comments per daily
commenter without attributing it to individual behavior, participant composition or a cause. This is an aggregate repeat-activity finding;
the counts do not track individual identities. Explicitly say the comments' content, stance, and sentiment were
not read before declining public-opinion claims.

Look at comment volume and commenter count first; add breakdowns only as far as the question needs.

## Procedure

1. Confirm the reference date and news section. If none, say you use all sections over the latest available period.
2. `comment_trend` and `comment_user_trend`: did comment volume and the number of commenters move together? Compute
   both changes and comments per commenter. Comments rising much faster than commenters indicates increased aggregate comments per daily
   commenter. Do not claim the exact same individuals were tracked.
3. Activity time questions: `comment_hourly`. Composition questions: `comment_genderage`.
4. Only when access environment or spread matters: `comment_device`, `comment_country`, `comment_category_spread`.
5. Write three sections: **Activity** (volumes and their changes), **Who takes part** (composition as reported),
   **Limits of interpretation**, with the dates and section applied.

## Rules

- Commenter statistics describe commenters only. Never generalise them to the public, to all readers or to "most
  people"; say how small and self-selected that group is relative to readers.
- The comment text was not read: say so explicitly in the answer ("the comments' content, stance and sentiment were
  not read"). Do not state for or against, sentiment, anger or the content of arguments; if asked,
  say these tools cannot show it and what could (reading the comments themselves).
- Comment growth and commenter growth are different things; report them separately.
- Missing or unprovided values are never 0.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `comment_trend`: comment volume over time for the date and section.
- `comment_user_trend`: number of distinct commenters over time; always read with comment_trend.
- `comment_hourly`: comments by hour of day; for when people comment.
- `comment_genderage`: commenter gender and age shares; for who comments.
- `comment_device`: PC versus mobile; only when access environment matters.
- `comment_country`: commenter country; only when location matters.
- `comment_category_spread`: which news sections the activity spread across.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
