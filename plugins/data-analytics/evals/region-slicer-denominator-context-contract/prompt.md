---
description: Additional positive bi-measure-context-debug coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bi-measure-context-debug, coverage-20261012]
---

Audit a synthetic BI measure without running a workbook. Sales rows: North/A30, North/B70, South/A20, South/B80. A North slicer is active. Each row is a product, the subtotal is regionNorth, and the grand total respects the slicer. Current percent=visible sales divided by sales after removing ALL Sales filters; removing all filters gives200. Desired denominator clears only Product and retains Region. Explain filter paths/context, calculate current and desired A/B/subtotal/grand-total values by hand, propose pseudocode with precisely scoped filter removal, and give verification cases with/without the slicer. No engine-specific syntax is required or executed.
