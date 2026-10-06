---
name: search-query-regex-filter
description: Write a regular expression that segments search queries in a search analytics tool, after naming the tool's regex dialect, and test it against a table of at least ten sample queries with expected include and exclude outcomes plus the false-positive and false-negative risks. Use when asked for a query filter regex for Search Console or a similar report, such as a brand versus non-brand split. Not for page-level URL rewrites or server redirect rules.
metadata:
  tier: open
  level: L2
  domain: growth
  install: optional
  keywords: [regex, RE2, search console, query filter, brand queries, segmentation, lookahead]
  verified-runtimes: [claude-code]
---

# Regex filters for search queries

A filter that looks right on three queries often mislabels hundreds of others. This skill rests
on a single practitioner report, so keep to what the user's tool and sample show.

## 1. Name the dialect first

Before writing, state which regex engine the tool uses and what that rules out. Many analytics
filters use RE2 (Search Console's "custom (regex)" filter is documented that way): no lookahead,
lookbehind or backreferences. If the user does not say which tool, ask, or write the RE2-safe
subset and say that you assumed it. Do not claim a syntax works in a tool you have not seen
documented; the user's pasted examples win.

## 2. Turn the request into include and exclude lists

Write the user's rules as two lists of example queries before any pattern: must match, must not
match. Ask for missing examples rather than guessing; the sample the user gives is the only
test set you have.

## 3. Write the pattern within the dialect

- A tool that filters on one regex at a time cannot do "match A but not B" with lookahead. Use a
  second filter set to "doesn't match regex", or an alternation that lists the allowed forms.
- Anchor deliberately. Unanchored `acme` also matches `pacme`; `(^|\s)acme(\s|$)` matches the
  word only. State whether each end is anchored and why.
- Allow expected variants the user listed (misspellings, plural, a suffix) as explicit
  alternatives, not a loose wildcard.
- Escape literal dots and hyphens; keep case in mind (analytics tools often lowercase queries,
  check that before relying on capital letters).

## 4. Test table

Give a table of at least 10 queries: query | expected | pattern result | reason. Include every
example the user gave, plus near misses you add: a substring hit, a word-order change, a query
with the term in the middle, and one with extra characters. Evaluate each row by reading the
pattern, and mark any row where the pattern disagrees with the expectation; fix the pattern
or flag the row. If you can run a regex engine, run it, and say which; if not, say the table
was traced by hand.

## 5. Risks

List false positives (matches that should not) and false negatives (misses) that the sample
cannot expose: substring hits inside longer words, other brands containing the string, word
order, spelling variants not in the sample, queries in other scripts. Say the filter should be
rechecked against a real export of top queries before it is used for reporting.

## 6. Deliver

The pattern or the ordered pair of filters (with the include or exclude setting for each), the
test table, the risks, and the dialect you assumed.
