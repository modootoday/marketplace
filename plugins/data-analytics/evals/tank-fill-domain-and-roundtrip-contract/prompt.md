---
description: Additional positive calculator-reference-case-verification coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [calculator-reference-case-verification, coverage-20261012]
---

Audit a synthetic calculator: rectangular tank volumeL=widthCm*depthCm*heightCm/1000. All dimensions must be finite strictly positive real centimetres; report two decimals, nearest rounding. Candidate wrongly divides by100. Provide >=5 distinct reference cases including10x10x10,20x10x5,1x1x1, a decimal dimension,0,a negative and nonfinite input, plus a duplicate. Show expected exact/display values, dimensional reasoning, inverse-height check on unrounded data, and rounding/extreme-input limitations. No code or real tank is tested.
