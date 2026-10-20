---
name: datalab-influencer-scan
description: Research Naver influencer channels - find top influencers in a category, read a channel's profile, recent posts, challenges and public stats, and see which figures exist only for the owner's own channel. Use when the user asks who is doing well in a category, to analyse a competitor influencer, which of my influencer topics work, or what keywords are popular in an influencer category. Not for scoring or ranking influencers beyond what the tools return, estimating a channel's views or income, or finding blog data without the linked blogId.
metadata:
  tier: open
  level: L3
  domain: influencer-research
  install: optional
  keywords: [naver influencer, influencer category, competitor channel, keyword challenge, channel stats, datalab]
  requires:
    mcp: [datalab]
---

# Influencer scan

Decide first whose channel is being read. Every channel tool accepts a `urlId` (the part after `in.naver.com/`).
Without it the tool tries to find the logged-in user's own channel and returns `no-url-id` when it cannot. A
`no-url-id` result means no channel was read: ask the user for the `urlId`, do not guess one.

## Own channel versus someone else's

- Own channel (omit `urlId`, or pass the user's own): the only case where Naver gives view counts.
- Another channel (pass its `urlId`): public data only. These fields are `null` for other channels, per the
  descriptions: `influencer_stats` cumulative views (always null), `influencer_my_topics` view counts (topics are then
  sorted by post count instead), and `influencer_challenges` per-challenge `viewCount`. A null is "not provided by
  Naver for this channel", never zero. Do not estimate the missing views from fans, posts or anything else.
- For richer public metrics on another channel (fans and similar), use `influencer_profile`, not `influencer_stats`.

## Finding competitors from a category

1. `influencer_categories` to list categories and get a `categoryId`. Ask which one when several fit.
2. `influencer_category_top` with that id: the top or recommended influencers, 20 at most. It is not the whole
   category and not a ranking the skill can extend; say "the top 20 returned" and no more.
3. `influencer_category_keywords` with the same id: popular keyword challenges with participant counts, 15 at most.
   Treat it as a list of what is popular among those returned, not a complete trend list.
4. Take a `urlId` from step 2 and go deeper: `influencer_profile`, `influencer_posts` (recent content, for content
   patterns), `influencer_challenges` (topics covered; keyword and participation counts stay valid even when views
   are null).
5. `search_influencer` when the user has a name or keyword instead of a category.

## Influencer id versus blog id

`urlId` is not a `blogId`. When a blog tool is needed for an influencer, take the `blogId` from `influencer_profile`
(present only when a Naver blog is linked). If it is absent, say the blog cannot be reached from here instead of
reusing the `urlId`.

## What to report

- Quote each figure as returned, with its unit, and note whether it came from the user's own channel or a public one.
- Compare channels only on fields every compared channel actually has. If one channel has views and another has null,
  the views column is not comparable.
- Describe patterns (topics, posting rhythm, challenge keywords) from the returned posts and say how many were read.
  Do not rate influence, quality or growth, and do not forecast; no tool computes those.
- Keep a short "not available" list: null fields, truncated lists (top 20, top 15), channels without a linked blog.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

All tools here are read tier and run without asking.

- `influencer_categories`: category list; source of `categoryId`.
- `influencer_category_top`: top or recommended influencers of a category (up to 20); entry point when the competitor's
  `urlId` is unknown.
- `influencer_category_keywords`: popular keyword challenges of a category with participant counts (up to 15).
- `influencer_profile`: channel name, field, fans, main topics, and the linked `blogId` when there is one.
- `influencer_stats`: public stats such as subscribers; cumulative views only for the owner's channel.
- `influencer_posts`: recent content list, for content patterns.
- `influencer_challenges`: keyword challenges the influencer joined; `viewCount` only for the owner's channel.
- `influencer_my_topics`: topic cards (title, subject, post count, views); views only for the owner's channel.
- `search_influencer`: Naver influencer search by query, for finding influencers in a field.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
