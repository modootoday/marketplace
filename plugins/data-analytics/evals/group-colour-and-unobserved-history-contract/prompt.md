---
description: Additional positive bi-measure-context-debug coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bi-measure-context-debug, coverage-20261012]
---

Review a synthetic BI report. Model has Facts(month,group,value) linked many-to-one to CurrentMaster(group,status), with filters from master to Facts. Facts: Jan/A10,Feb/A20,Jan/B100,Feb/B150. CurrentMaster says A=approved,B=pending as of today; no status history/snapshot exists. A chart currently colours values using global minimum10/maximum150, but the owner wants a min/max scale within each group across months. Explain relationships and row/group/total contexts, calculate both groups' endpoints, propose a per-group scale and verification table, and determine whether January historical approval can be reconstructed. Do not invent previous statuses or execute code.
