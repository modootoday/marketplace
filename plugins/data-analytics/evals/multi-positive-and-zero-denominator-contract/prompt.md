---
description: Additional positive retrieval-ranking-readout coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [retrieval-ranking-readout, coverage-20261012]
---

Read a synthetic retrieval test with same corpus/permissions, deduplicated top3 and binary labels. EN q1 relevant{a,b},results[a,x,b]; EN q2 relevant{c},results[x,y,c]; KO q3 relevant{d},results[d,x,y]; KO q4 relevant{},results[x,y,z]. Define per-query Recall@3 and reciprocal rank truncated@3, then macro report EN/KO with denominators and the no-positive query separate. Provide overall eligible-query values, warn about tiny N and distinguish this truncated metric from an untruncated MRR. No live benchmark.
