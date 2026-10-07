---
name: datalab-shopping-demand
description: Analyse Naver Shopping demand - category and keyword click trends, rising keywords, season onset and shopper gender, age and device - without turning relative click indexes into sales. Use when the user asks whether demand for a product is rising, when its season starts, or which shoppers to target on Naver Shopping. Not for sales volume, revenue or buyer-count estimates, or for predicting an individual's purchase.
metadata:
  tier: open
  level: L3
  domain: shopping-analytics
  install: optional
  keywords: [naver shopping, shopping insight, click trend, season onset, rising keywords, product demand, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Shopping demand analysis

Settle the category first, then check change timing and shopper composition only as far as needed.

## Procedure

1. Confirm the product or keyword and its category. Without a category id, find it with `shopping_categories`; never
   pick a category arbitrarily.
2. Whole category: `shopping_category_click`, `shopping_category_rank`, `shopping_category_keywords` for scale changes
   and popular queries.
3. One keyword: `shopping_keyword_click`, `shopping_keyword_risers`, `shopping_season_onset` for recent change and
   season position.
4. Only for a target or channel decision: the keyword or category gender, age and device tools.
5. Write four sections: **Observed demand**, **Season position**, **Target and channel implications**, **To check
   next**.

## Rules

- Click indexes are relative (scaled within the query). Never convert them into units sold, buyers or revenue. When
  asked "how many will sell" or "what revenue", say the data cannot answer and name what could (the store's own sales
  history).
- A keyword dropping out of a risers list outside its query window is not demand disappearing.
- The season onset is the tool's stated heuristic, not an official Naver determination; say so with the rule it used.
- Gender, age and device shares describe clicking shoppers in aggregate; never infer an individual's purchase intent or
  future sales from them.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `shopping_categories`: find the category id; first when none is given.
- `shopping_category_click`: category click index over time.
- `shopping_category_rank`: popular keywords ranked within the category.
- `shopping_category_keywords`: keywords in the category.
- `shopping_keyword_click`: one keyword's click index over time.
- `shopping_keyword_risers`: keywords rising in the window; read the window.
- `shopping_season_onset`: when the season starts by the tool's heuristic.
- `shopping_keyword_gender`, `shopping_keyword_age`, `shopping_keyword_device`: shopper split for a keyword.
- `shopping_category_gender`, `shopping_category_age`, `shopping_category_device`: shopper split for a category.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
