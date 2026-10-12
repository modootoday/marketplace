---
description: Corrected positive retrieval-ranking-readout coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [retrieval-ranking-readout, coverage-20261012, corrected-fixture]
---

Audit a retrieval rollout packet. Old results used corpusC1 with admin permissions; new usedC2 with user permissions, different labels and duplicate documents. Reported Recall@5 old.8,new.9 is not recomputed. New latency measurement is warm kernel20ms only; old is full request200ms including embedding/network/filter/rerank. Predeclared KO Recall floor.75; the only comparable fixed KO test reportsnew.70. Explain invalid comparisons, a corrected same-input evaluation plan and end-to-end cold/warm timing boundaries, plus rollout decision. Do not invent raw rankings or a corrected score.
