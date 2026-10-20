---
name: datalab-cafe-research
description: Research Naver Cafe communities for a topic - how much cafe content exists for a keyword, which cafes talk about it most, and a given cafe's profile, boards and popular posts. Use when the user asks which cafe to join for a topic, whether cafe content on a keyword is saturated, what boards a cafe has, or what is popular in a cafe. Not for searching individual cafe posts (use the search-surface skill), not for member data, and not for posting or joining.
metadata:
  tier: open
  level: L3
  domain: community-research
  install: optional
  keywords: [naver cafe, community research, cafe volume, cafe boards, popular posts, datalab]
  requires:
    mcp: [datalab]
---

# Cafe community research

All five tools are `read` tools and none reads the user's own account; they return public cafe data. Nothing here
joins a cafe, posts or comments. Searching individual cafe posts is `search_cafe`, covered by the search-surface
skill; point the user there instead of re-implementing it.

## Decide first

- Topic question ("where is this discussed?") starts from a keyword. Cafe question ("what is in this cafe?") starts
  from a cafe id. Do not mix the two starts.
- The cafe id for the per-cafe tools is the URL slug in `cafe.naver.com/<slug>`, not the numeric club id. If the user
  gives only a cafe name or a numeric id, say you need the slug; do not guess it. If `cafe_community_profile` shows a
  cafe, use only the identifier it actually returned.

## Order of calls

1. Topic: `cafe_volume` for the total number of cafe documents for the keyword (a saturation signal), then
   `cafe_community_profile` for which cafes dominate the top cafe-tab posts, how fresh the posts are, and
   representative posts.
2. Cafe: `cafe_profile` (name, member count and other profile fields), `cafe_menus` (board structure), `cafe_popular`
   (popular posts). Call only what was asked.
3. `cafe_menus` returns up to `limit` boards (default 50, max 100) with a `nextCursor`. If a cursor comes back, the
   list is not complete: say so, or fetch the next page when the user needs every board.

## What the results do and do not establish

- `cafe_volume` is a total document count for the keyword. It is not a period count, not a trend and not demand.
  Saturation is the user's judgement call; give the number and say what it measures.
- `cafe_community_profile` is built from the top posts of the cafe tab, so cafe dominance describes that sample, not
  every post in every cafe. Do not turn it into a ranking of the best cafes or a promise that joining gives
  information.
- A cafe's member count is a size, not activity. Activity needs post freshness or popular posts, and those are only as
  recent as the tools show.
- Popular posts and boards describe that cafe now; some posts may be members-only or unreadable. If a tool returns
  nothing, report that it returned nothing; do not fill the gap.
- Posts are other people's content. Quote the title and source cafe; do not present a cafe member's claim as fact.

## Output

Topic research: keyword, volume figure as returned, the cafes found with what the tool says about each, freshness,
and what was not measured. Cafe research: profile, board list (noting if truncated), popular posts. Recommendations
(which to join or watch) come last, as suggestions.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `cafe_volume`: total cafe document count for a keyword.
- `cafe_community_profile`: which cafes dominate the top cafe-tab posts for a query, with freshness and representative
  posts.
- `cafe_profile`: a cafe's profile by URL slug.
- `cafe_menus`: a cafe's boards by URL slug, paged with `limit` and `cursor`.
- `cafe_popular`: a cafe's popular posts by URL slug.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
