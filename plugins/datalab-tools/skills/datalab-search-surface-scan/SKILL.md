---
name: datalab-search-surface-scan
description: Read what Naver search shows for a query beyond blog posts - the integrated results page, cafe, Knowledge iN, video, image and Powerlink ad results - and check where a blog post ranks or what the top posts cover. Use when the user asks what shows up for a keyword, what people ask or say about it, who is advertising on it, whether my post appears for a keyword, or how the top posts are structured. Not for guaranteeing a rank, tracking rank over time, or inventing positions that no tool returned.
metadata:
  tier: open
  level: L3
  domain: search-research
  install: optional
  keywords: [naver search, integrated search, cafe, knowledge iN, powerlink, rank check, serp, datalab]
  requires:
    mcp: [datalab]
---

# Search surface scan

Pick the surface that answers the question, call only that one, and report it as a snapshot of one query at one time.
All tools here are read tier and run without asking.

## Which tool for which question

- What does the results page look like and what is the search intent: `search_total` (integrated results; the layout
  and composition of the page). Start here for an unfamiliar keyword.
- Which blog posts are on the Blog tab: `search_blog` (blog tab only, not the integrated page). Other skills use it
  for titles and competing posts. `search_web` is web documents, used elsewhere for research; neither shows how the
  integrated page is composed.
- Community reaction and reviews: `search_cafe`.
- What users ask and need: `search_kin`.
- Video or image presence: `search_video`, `search_image`. Image results carry a usable `imageUrl` and a `licence`
  filter (all, ccl, commercial, derivative). A found image is not cleared for reuse: pick the licence option for the
  intended use and keep the attribution it requires.
- Who advertises and how crowded it is: `search_ad` (Powerlink results). It shows advertisers present at the call,
  not their budget, bids or conversions.
- Does my post appear: `serp_my_rank_check`.
- How are the top posts built and what do they leave out: `serp_pattern_analyze`.

## Parameters worth knowing

- `from` and `to` (YYYYMMDD) only apply together. `sort` is relevance or recent. `exact` searches the query as one
  phrase. `search_total`, `search_ad` and `search_kin` have no paging; `search_cafe` pages 1 to 3, `search_image` 1 to 4.
  A higher page gives lower positions and the numbering continues.
- Not every tool takes every parameter: `search_video` has no `exact` or `page`; `search_ad` has only `exact`.

## What a rank check proves

`serp_my_rank_check` looks at the Blog tab and the top of the integrated results for a keyword and reports where the
user's blog (or the `blogId` given) appears. Without `blogId` it uses the user's own blog, so say which blog was
checked.

- It proves: at the time of the call, for that exact keyword, the post was or was not seen at that position.
- It does not prove: the same position for other users, devices or later days; that the keyword brings visits; or why
  it ranks. "Not found" means not found in the part of the results the tool checked, not that it is unindexed or
  penalised. Rank can move; do not state it as a standing position, and do not promise to improve it.
- Report the keyword, the blog, the tab or section where it appeared, and the position as returned.

## Pattern analysis

`serp_pattern_analyze` actually reads the bodies of the top posts (`sampleCount` default 3, max 5) and can take tens of
seconds. It returns common section structure, `coverageGaps`, and title and freshness patterns. It describes the
sample read, not all results. Gaps are candidates for an angle, not proof of demand; say how many posts were read.

## Reporting

Quote counts, positions and titles as returned. Separate observations (what appeared) from suggestions (what the user
might do). Do not turn a count of results or ads into a competition score. When two surfaces were read, name each; do
not blend them into one ranking.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `search_total`: integrated results; search intent and page composition.
- `search_cafe`: cafe results; community reaction and reviews.
- `search_kin`: Knowledge iN results; user questions and needs.
- `search_video`: video results.
- `search_image`: image results with `imageUrl` and the `licence` filter.
- `search_ad`: Powerlink ad results; advertisers present.
- `serp_my_rank_check`: where the user's blog (or a given `blogId`) appears for a keyword.
- `serp_pattern_analyze`: reads the top posts' bodies for structure, `coverageGaps` and title and freshness patterns.
- `search_blog`, `search_web`: used by other skills; named here only for the comparison above.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
