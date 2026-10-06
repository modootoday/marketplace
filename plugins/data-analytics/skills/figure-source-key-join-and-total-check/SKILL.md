---
name: figure-source-key-join-and-total-check
description: Build a Sankey, country map, heatmap or publication figure from parsed exports, handwritten records or country statistics without silent mismatches - parse the source into a table and check group totals against the export totals before drawing, join statistic keys to the real boundary or zone list and list unmatched and renamed entries with the aggregation unit, state that text-derived counts measure mentions not visits, and give rerunnable code. Use when a figure is made from tag exports, PDF tables, visitor notes or per-country figures. Not for checking an existing chart's labels or ratios, or generic plotting style.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [sankey, choropleth, heatmap, join keys, totals check, country names, rerunnable figure]
  verified-runtimes: [claude-code]
---

# Figure source, key join and total check

Figures built from parsed exports and country statistics go wrong before the drawing: a
row lost in parsing, a country name that matches no boundary, or a count of mentions
presented as a count of visits. Check the table, then draw. If the figure already exists
and its labels or ratios are in question, use chart-geometry-and-claim-recompute.

## Steps

1. Parse the source into a flat table (one row per record, with source file or page) and
   keep the original text beside parsed values. Compare each group total with the total
   printed in the export. A mismatch is stated with the difference and the likely cause,
   and the figure waits until it is explained or labelled.
2. For a Sankey, list every link as source, target, value and check that the values into
   and out of each node balance, or say where the flow is created or lost.
3. For a map or zone figure: join the statistic keys to the actual boundary or zone list
   used by the drawing. Report matched count, unmatched statistic keys, boundary entries
   with no data, and renamed or merged entries (for example a different official name).
   State the aggregation unit (country, region, district) and what a missing key will
   draw as, so a gap is not read as zero.
4. For counts derived from text or handwriting: say they measure mentions in the records,
   not actual visits or people (one person can write several notes, one note can mention a
   place twice), and give the denominator (records read, records unreadable). Propose the
   label as "N mentions" (for example "9 mentions in 34 readable notes"), never visitors.
5. Make the figure from code that reruns on changed data. Write the actual code skeleton
   (not only a description) with three separate functions, parse, join and draw, a
   STYLE constant holding palette, order and label rules that every figure reads, and
   the total check and the unmatched key list printed on every run before drawing.
6. List what was not verified (original files, unreadable records).

## Output

The totals check table, the unmatched and renamed key lists, the unit and measurement
statement, then the rerunnable code outline.

Neighbors: chart-geometry-and-claim-recompute (finished charts), survey-recount-and-anonymize (tallies).
