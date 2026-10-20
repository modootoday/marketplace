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

### Comparing several candidates

- **Trend side by side**: for up to 5 candidate keywords, `keyword_trend_batch` compares their current interest in one
  call; `keyword_trend_compare` lines the whole trend of up to 5 keywords on one time axis, which is the one to use for
  crossovers, reversals and seasonality. A batch call is one round for all candidates, not one call each.
- **Public supply**: `content_volume` gives the total number of blog and cafe documents for a keyword, a supply count
  and not a quality measure. `keyword_opportunity` sets monthly search demand against the last 30 days of blog
  publishing and reports the figure as the tool computed it; it needs a search-ad account and may be unavailable.
  Quote the demand and the supply numbers; do not turn them into a recommendation score.
- **Body patterns of the top posts**: `serp_pattern_analyze` reads the bodies of the top blog results and reports
  common section structure, `coverageGaps` and title and freshness patterns. It can take tens of seconds, so run it
  for the one or two leading candidates, not all of them. `search_blog` alone shows titles, not bodies.
- Tools that return a prompt to run (`outline_suggest`, `benchmark_gap`, `content_calendar`) give instructions
  in `delegate`, not a finished answer. The result exists only after you run that prompt yourself; do not present the
  returned prompt as the suggestion. This skill does not write the manuscript.

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
- `benchmark_gap`: what a competitor covers that the user does not; returns a prompt to run.
- `keyword_trend_batch`, `keyword_trend_compare`: up to 5 candidates, current interest or the whole trend.
- `content_volume`, `keyword_opportunity`: public blog and cafe supply; demand against recent supply.
- `serp_pattern_analyze`: body structure and gaps of the top blog posts; slow, use sparingly.

Only when discovery cannot find the required tools, use only pasted tool output and say what was not measured.
