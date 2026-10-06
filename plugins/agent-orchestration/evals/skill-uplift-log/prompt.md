---
description: What eval-comparison-hygiene should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [eval-comparison-hygiene]
---

I wrote a guidance document that is meant to make an assistant write better changelogs. I measured it with an LLM judge and I want to put "0% to 100%" in a slide. Here is my log. I have USD 6 left for this; one run of one arm costs about USD 0.40 on the larger model and USD 0.10 on the smaller one.

Log:
1. Baseline, subject model-s, judge model-xs, 1 run: the judge marked it as not meeting the rubric, with the explanation "reply is fine but misses item 3".
2. With guidance, subject model-l, judge model-xs, 1 run: met the rubric.
3. With guidance, rerun on model-l, judge model-xs: did not meet the rubric, no explanation given. I then edited rubric item 2 from "lists every breaking change" to "mentions breaking changes", reran: met the rubric.
4. The guidance has a worked example: "v2.3.0, 4 breaking changes, 2 fixes, release on a Tuesday". The test prompt is also: "write the changelog for v2.3.0 with 4 breaking changes and 2 fixes".
5. I did not look at any of the replies, only the judge's verdicts.

Can I report 0% to 100%? If not, what exactly do I do next with my USD 6?
