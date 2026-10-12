---
type: llm
---

Context the reply answers:

Audit a synthetic BI measure without running a workbook. Sales rows: North/A30, North/B70, South/A20, South/B80. A North slicer is active. Each row is a product, the subtotal is regionNorth, and the grand total respects the slicer. Current percent=visible sales divided by sales after removing ALL Sales filters; removing all filters gives200. Desired denominator clears only Product and retains Region. Explain filter paths/context, calculate current and desired A/B/subtotal/grand-total values by hand, propose pseudocode with precisely scoped filter removal, and give verification cases with/without the slicer. No engine-specific syntax is required or executed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Computes current North A15%,B35%, subtotal/grand total50% from denominator200, and desired A30%,B70%, totals100% from denominator100.
2. Explains removal of Region as the cause and proposes clearing Product only while preserving Region, with explicit filter context rather than formatting-only changes.
3. Gives auditable row and total verification with the North slicer and no slicer: combined A50/200=25%,B150/200=75%, total100%.
4. Uses supplied semantics/pseudocode, distinguishes hand calculation from execution, and does not claim a fixed live workbook.

Return only PASS or FAIL.
