---
description: Corrected positive site-content-grounding-check coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [site-content-grounding-check, coverage-20261012, corrected-fixture]
---

Audit a synthetic explorer from raw rows {id:1,group:A,value:10}, {id:2,group:A,value:20}, {id:3,group:B,value:30}. Page summary shows count4,total70,mean17.5. TabA shows exactly IDs1 and2; tabB shows ID2; search'z' shows ID1 instead of empty. Page claims source-backed values with an outline citation. Download href is /data.csv; build presence is unknown. Recompute count/total/mean, compare both tabs and search, give a claim/link grounding ledger and limits, prioritize actual defects, propose filtering/summary fixes and exact future retests. Ask for missing build evidence before asserting file availability. No live UI clicks or file execution.
