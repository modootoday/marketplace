---
name: naver-trend-analysis
description: Read Naver search and shopping trend data correctly - Data Lab ratios are relative to the peak inside one request, not search volumes; absolute monthly volumes come from the search ad keyword tool; compare keywords only within one request and say which filters were used. Use when analysing Korean search interest, comparing keywords on Naver, or turning Naver Data Lab or keyword-tool numbers into a recommendation. Not for Google Trends or web analytics.
metadata:
  tier: open
  level: L2
  domain: data-analytics
  install: optional
  keywords: [Naver Data Lab, search trend, keyword volume, Korean search, shopping insight]
  locales: [ko]
---

# Naver trend data

The most common mistake is reading a Data Lab ratio as a count. The second is
comparing ratios from two separate requests. Both produce confident and wrong
recommendations.

## What each source measures

| Source | Number | Meaning |
| --- | --- | --- |
| Data Lab search trend | ratio 0-100 per period | relative to the highest point among the keyword groups in that one request |
| Data Lab shopping insight | ratio 0-100 per period | click share relative to the peak in that request, by category or keyword |
| Search ad keyword tool | monthly searches (PC, mobile) | absolute estimate for the last month; small volumes are shown as a floor value |

So: 100 is "the busiest period of the busiest group in this request", not 100
searches. Adding a keyword to the request can change every other keyword's
numbers.

## Compare correctly

- Put keywords you want to compare in the same request (as separate groups), with
  the same period, device, gender and age filters.
- To anchor ratios to volume, pair one keyword's ratio series with its absolute
  volume from the keyword tool for the same month, and scale; say that the result
  is an estimate.
- Group synonyms and spellings into one keyword group when the question is about
  the topic, not the spelling.

## Read the shape

Seasonality (repeat the same period from earlier years), one-off spikes (news or
a broadcast; check the date), and slow trends need different conclusions. A
spike is not a trend.

## Report

The request (keywords and groups, period, unit, filters), the numbers with their
meaning, and the recommendation with its uncertainty. Korean query examples are
in `references/query-examples.ko.md`.
