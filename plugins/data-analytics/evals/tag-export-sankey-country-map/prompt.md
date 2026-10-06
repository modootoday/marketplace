---
description: A Sankey from time-tracking tag exports and a country award map have totals and key mismatches. The reply must check totals first, list unmatched keys, separate mentions from visits and give rerunnable code.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [figure-source-key-join-and-total-check]
---

I need three figures for a report: a Sankey of hours from tag to project, a heatmap of galleries mentioned in handwritten visitor notes, and a world map of award counts. Tell me how you would build them and what to check first. You cannot see my files; here is what I know.

Sankey: my time tracker exported one PDF per tag. The export footer says the grand total is 120.0 hours. I parsed the tables and my rows add up to 112.5 hours.

Heatmap: I typed 40 handwritten notes into a sheet, 6 were unreadable. Gallery B is mentioned 9 times, so I want to label it as 9 visitors.

Map: the award table has country names such as "USA", "Czechia", "Turkey" and "South Korea". My boundary file uses "United States of America", "Czech Republic", "Turkiye" and "Republic of Korea". The table is per country but I also have region totals for the EU.
