---
name: datalab-material-suggestion
description: Suggest the next blog topics for a Naver blog, each backed by search volume, trend and competing posts the datalab.tools extension checked, with varied angles and series ideas but no invented scores. Use when the user asks for topic ideas, the next thing to write, a series plan, or whether a topic can compete. Not for writing the post itself, for scheduling, or for definitive investment, medical or legal advice topics.
metadata:
  tier: open
  level: L3
  domain: content-planning
  install: default
  keywords: [blog topics, content ideas, naver blog, keyword research, search volume, series planning, datalab]
  requires:
    mcp: [datalab]
---

# Topic suggestions

If recommendation scores or difficulty stars are requested, explicitly say no measured basis computes them and giving them would invent scores. Omit the scores entirely, including subjective or illustrative ratings, and use checked facts to explain the choices.

Help decide what to write next. Output: a list of candidate topics and the evidence for each. No manuscript.

## Start

1. Platform and category known (for example "Naver blog, parenting"): go straight to research.
2. Not known: ask platform, then category (both required); audience and goal help but are optional. Question order:
   references/discovery.md.
3. After research, shortlist and output in the format below.

## Other platforms

YouTube, Instagram, Brunch or Tistory requests are fine, but every tool here reads Naver data. For other platforms use
general knowledge only and never say search volume or competition was checked; mark each such topic "general pattern,
not measured".

## Research (Naver blog)

1. **Need**: `search_keywords`, `autocomplete_keywords` for real queries; `kin_question_demand` for unanswered
   questions.
2. **Timing**: `daily_trend`, `my_soaring` for what is rising now; `keyword_trend`, `keyword_yoy` for seasonality.
3. **Competition**: `search_blog` for top posts; `blog_profile`, `blog_posts` for competing blogs. What top posts do not
   cover is the gap.
4. **Own strength**: if the user asked about their direction, `my_top_content` for posts that already worked.

One call per round. Research once and draw several candidates from it; do not re-query per candidate.

## Angles and series

Mix angles across candidates: how-to, list, comparison, experience, problem-solution, myth-busting, audience-specific,
deep dive. All "guides" means no variety. Mark series potential: deepening (beginner to advanced), expansion (by area),
period (day N), cases.

## No invented scores

No "recommendation 95%", "search potential 20/25", star ratings or difficulty grades: nothing computed them.

- Countable things (search volume a tool returned, actual ranks, number of top posts) are quoted as the tool gave them.
- Uncountable things (differentiation, expected response, competitiveness) get one line of why, citing a checked fact,
  for example "8 of the top 10 posts are older than 15 months". When asked for a score, say why there is none.
- The type label (trend, evergreen, niche, recycle) is a category, not a score, and stays.

## Output

```
Topic suggestions
Target: {platform} / {category}{, audience}

1. {topic}: {type}
   Angle: {one sentence}
   Evidence: {checked fact: query volume, rank, top-post count}
   Gap: {what top posts miss, if any}
...
(3 to 7 topics, at least 3 different angles)

Series (if any): {topic} -> {direction}
```

## Not done here

No manuscripts (the user asks for a draft separately), no calendar entries. Investment, medical and legal topics only
as informational topics, with no definitive advice or promised returns.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `search_keywords`: search volume for candidate queries.
- `autocomplete_keywords`: how people complete a query.
- `kin_question_demand`: count of related questions on Naver KnowledgeiN.
- `keyword_trend`: a query's trend over time; seasonality.
- `keyword_yoy`: this year against last year; confirm a seasonal pattern.
- `keyword_opportunity`: demand against competition for a query, as reported.
- `daily_trend`: queries rising today.
- `my_soaring`: the user's own posts or queries rising now.
- `my_top_content`: the user's best posts; only when their direction matters.
- `search_blog`: top blog posts for a query; age and coverage of competitors.
- `blog_profile`, `blog_posts`: a competing blog and its posts.
- `benchmark_gap`: what a competitor covers that the user does not.

Only when discovery cannot find the required tools, use only pasted tool output and say what was not measured.
