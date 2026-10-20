---
name: datalab-competitor-blog-benchmark
description: Benchmark another public Naver blog or the top blog posts for a keyword - profile, recent posts, popular posts, categories, visitor trend, top-post freshness and title patterns, and content gaps - from what the datalab.tools extension reads. Use when the user names a blog id to study, asks how a competitor blog is doing, or asks what the top posts for a keyword look like. Not for choosing the next topic, for the user's own blog statistics, or for predicting rank.
metadata:
  tier: open
  level: L3
  domain: competitor-analysis
  install: optional
  keywords: [competitor blog, benchmark, blog profile, popular posts, visitor trend, top posts, content gap, naver blog, datalab]
  requires:
    mcp: [datalab]
---

# Competitor blog benchmark

Two different jobs; pick the one the user asked for and do not blend them.

- **A named blog** (a blog id, or a `blog.naver.com/<blogId>` link): study that blog.
- **A keyword's top results**: study what ranks for the term.

This is benchmarking, not topic choice. For "what should I write next", use the topic suggestion skill.

## Public data about someone else

All eight tools here are `read` tier and read public data about another blog or about search results. None reads
the user's own account, and none changes anything. They run without asking. Say that the figures are what the public
side shows; the blog owner's private statistics are not available, so the user's own blog numbers and the
competitor's must not be compared as if they came from one source.

## A named blog

Take `blogId` from the `blog.naver.com/<blogId>` form. Ask if the user gave only a display name; do not guess an id.

1. `blog_profile`: name, introduction, neighbor count as returned.
2. `blog_posts`: latest posts, for publishing pattern and subjects. Default 10, at most 30 per call; older posts via
   `page` (1 is newest, up to 10). State how many posts and which pages you read; a pattern from 10 posts is a
   pattern of those 10.
3. `blog_popular`: the blog's popular posts, for what does well. It does not say by what measure or over what period
   unless the result does; do not supply one.
4. `blog_categories`: category structure, for how the blog is organized.
5. `blog_visit_series` for the daily visitor trend, `blog_today_visitor` for today's count, only if the user asks
   about size or growth.

### Visitor figures

The description of `blog_visit_series` says it rests on the blog's public widget. Treat that as a limit:

- It shows only what the widget exposes. If the widget is hidden, partial or missing days, the series has gaps;
  name them and never fill them with zero or interpolate.
- Do not compute a growth rate or label a trend from fewer points than the result actually has, and do not forecast.
- `blog_today_visitor` is a count for today so far and today is not finished; do not compare it with a full day in
  the series without saying so. If it comes back empty or unsupported, report that, not 0.
- Describe the trend in the returned dates and units only. These are one blog's visitors, not its search rank.

## A keyword's top results

1. `blog_rank_profile` with `query`: the top posts of the blog tab plus how fresh they are (days since publication),
   title length and how many titles contain the keyword. Report these as returned for that query and moment.
2. `benchmark_gap` with `keyword`: what top posts commonly cover, what none covers, a differentiating angle and an
   outline. It returns a prompt to run (`delegate.system`, `delegate.user`), not a finished answer. Run that prompt
   yourself and produce the analysis; do not present the prompt as the result, and do not call the tool again to
   get a "real" one. Its description says passing the `patterns` from `serp_pattern_analyze` (commonSections and
   coverageGaps, which reads the body of the top posts, takes tens of seconds) grounds it in measured structure.
   Without `patterns`, label the gaps as the model's judgment, not a measurement of the posts.
3. Report what you read: how many top posts, the query, and that rankings change over time.

## Rules

- Freshness and title statistics describe the posts that appear now. They do not prove that a fresh post or a
  keyword in the title causes a high position.
- A differentiating angle is a suggestion. No tool here predicts that an article will outrank another.
- Quote figures as returned with unit and date. Missing is not zero. A found tool that returned nothing is
  reported as nothing.
- Do not copy a competitor's posts. Benchmarking is for structure, cadence and gaps.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `blog_profile`: name, introduction, neighbor count of a public blog by `blogId`.
- `blog_posts`: latest posts; `limit` up to 30, `page` up to 10.
- `blog_popular`: the blog's popular posts.
- `blog_categories`: category structure.
- `blog_visit_series`: daily visitor trend from the public widget.
- `blog_today_visitor`: today's visitor count.
- `blog_rank_profile`: top blog-tab posts for a query with freshness, title length and keyword-in-title rate.
- `benchmark_gap`: shared coverage, gaps, angle and outline for a keyword; returns a prompt to run; optional `patterns`.

Only when discovery cannot find the required tools, work only from the output the user pasted, say which tool each
figure came from, and do not invent the rest.
