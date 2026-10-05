---
name: survey-recount-and-anonymize
description: Before recording survey or interview results someone hands you, recount every tally from the per-row table instead of trusting the summary, name the bucket definitions each count uses, report where the summary and the recount differ, replace company or respondent names with numbers in anything shared, keep identifying data out of the repository (aggregates only), and search for the names before committing. Use when a survey summary, interview tally or research table is about to be written into a plan, deck, document or repository. Not for designing the survey or for statistical significance testing.
metadata:
  tier: open
  level: L2
  domain: data-analytics
  install: optional
  keywords: [survey recount, tally check, interview results, anonymize, respondent privacy, aggregate only, research summary]
---

# Survey recount and anonymize

A survey summary is a second-hand number. Whoever wrote it counted once, by
hand, often with buckets that shifted while counting ("conditional yes" in
yes, then not). Summaries drift from their own tables more often than not. And
the per-company table that makes a recount possible is exactly what must not
be copied into a shared document or repository.

## 1. Recount from the rows

- Get the per-row table (one row per respondent). Without it, record the
  summary as "reported, not recounted" and say so wherever it is cited.
- Recount every number the summary states, directly from the rows: per
  hypothesis or question, per answer bucket, and the totals.
- Check that bucket counts add up to the number of rows. A remainder means a
  row fits no bucket or two; list those rows.

## 2. Name the buckets

Write the definition each count uses, next to the count:

| Bucket | Definition used | Count (recounted) | Count (summary) |
| --- | --- | --- | --- |
| strong | a concrete instance in the last two months | | |
| agreed to paid pilot | said yes without conditions | | |
| conditional | yes after a named condition (security, budget, scope) | | |

If the summary's definition is unclear, state the definition you used and
count the ambiguous rows separately rather than choosing silently.

## 3. Report the differences

When the recount differs from the summary, use the recount and keep the
summary figure beside it once, for example "recounted from the table: 14
(summary said 15)". Do not average, and do not adjust the rows to match the
summary.

## 4. Anonymize what is shared

- Replace company and respondent names with numbers (01, 02, ...) in every
  shared table and quote. Quotes lose details that identify the speaker
  (product names, cities, headcount when unusual).
- Keep the key (number to name) only where the raw data already lives, with
  the same access as the raw data.
- Small cells identify: a segment of one or two respondents is reported as a
  range or merged.

## 5. Aggregates only in the repository

A plan, spec or commit gets counts, bucket definitions and anonymized
examples. The per-row table stays in the access-controlled place it came from,
linked, not copied.

Before committing, search the changed files for every name in the key
(case-insensitive, also without spaces and in other scripts the names are
written in). Zero hits is the bar.

## Output

1. The recounted table with bucket definitions and the summary figure beside
   each count that differed.
2. Rows that fit no bucket or two.
3. The shareable version: numbered respondents, aggregates, anonymized quotes.
4. The name search command and its result.
