---
name: deck-qa-review
description: Check a finished deck before it is presented or sent - numbers that disagree between slides, charts that do not match their labels or data, totals that do not add up, dates and weekdays that do not match, text overflow, inconsistent fonts and terms, and claims without a source. Use when the user asks to review, proofread or QA a slide deck or a pptx or PDF presentation. Not for restructuring the storyline.
metadata:
  tier: open
  level: L3
  domain: presentation
  install: optional
  keywords: [deck review, presentation QA, proofreading slides, chart check, number consistency]
---

# Deck QA

The errors that embarrass a presenter are small and checkable: a revenue figure
that is different on slide 3 and slide 9, a pie chart that sums to 104%, a
"Monday, 10 October" that is a Friday.

## Pass 1: numbers

List every number with its slide, label and unit. Flag the same metric with
different values, totals that do not equal their parts, percentages that do not
add up, growth rates that do not match the values shown, and units or periods
that change silently.

## Pass 2: charts

For each chart: axis labels and units present, the scale starts where it should
(or is marked when it does not), legend matches series, the plotted values match
the numbers in the text, and the title's claim matches what the chart shows.

## Pass 3: dates and names

Weekday matches the date, the same event has one date everywhere, names and
titles of people and products spelled the same throughout.

## Pass 4: layout and language

Text inside its box, one font family per role, consistent terms (do not switch
between "customers" and "users" for the same thing), and spelling.

## Pass 5: claims

Superlatives and market figures need a source on the slide or in the notes; flag
each one that has none.

## Output

A table: slide, issue, evidence (both values when they disagree), severity, fix.
Do not change the content's meaning; propose.
