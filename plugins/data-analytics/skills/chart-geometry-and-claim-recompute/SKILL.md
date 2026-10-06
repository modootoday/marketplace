---
name: chart-geometry-and-claim-recompute
description: Check, build or caption charts by recomputing every number from the source data instead of reading the picture - bar totals and stacked sums against printed labels, axis origin and scale, bar length ratio against value ratio, legend to series match, correlation coefficients with sample size and missing values - and test label overflow, tooltips and missing categories across widths and many charts. Use when a user asks an AI to verify, caption or compare charts or scatter plots, to say which bars do not match their labels, to judge a correlation from a plot, or when long axis labels clip in generated charts. Not for choosing chart colours or style, or for statistics with no chart.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [charts, bar chart, axis, correlation, scatter plot, labels, recompute, data visualization]
  verified-runtimes: [claude-code]
---

# Chart geometry and claim recompute

A model reading an image misses bars whose height contradicts the printed number and guesses
a correlation from a point cloud. Treat the picture as a claim and the data as the test.

## Steps

1. Ask for the data behind each chart if it is missing. Without the data, say that image
   reading alone cannot confirm accuracy and give only what the picture plainly shows,
   labelled as unverified.
2. Recompute from the data: each bar value and total, stacked parts against the printed
   total, sample size, missing values, and any statistic quoted (mean, share, coefficient).
3. Check the geometry: axis origin (does a bar start at zero), scale type (linear or log),
   bar length ratio against value ratio, legend to series mapping, and tick spacing.
4. For a correlation question compute both coefficients from the data with n and the
   missing values, and state that the visual impression of spread or slope is not the
   coefficient. Never state a coefficient or trend from a picture alone.
5. For many charts, test a matrix: shortest and longest labels, narrow and wide widths,
   missing categories, empty series. List the chart ids with clipped, overlapping or missing
   text, tooltip text that differs from the data, and expected against printed values.
6. Always say it plainly in the reply, as its own sentence: "Reading the chart images
   alone cannot confirm they are accurate; every check above is recomputed from the data."
   Also say which charts were not recomputed because no data was given.
7. Output: a table of chart id, expected, printed, verdict; the computed statistics with
   n; layout failures by chart id and width; and the raw data still needed.

Read `references/chart-checks.md` for the recompute table layout and the label test matrix.
