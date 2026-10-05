# Chart checks

## Recompute table

| Chart id | Series | Expected from data | Printed | Axis origin | Verdict |
| --- | --- | --- | --- | --- | --- |
| c01 | North total | 412 | 412 | 0 | ok |
| c02 | East total | 350 | 530 | 0 | mismatch: digits swapped |

Stacked chart: sum the parts, then compare with the printed total and with the bar height.
A bar that starts above zero makes the length ratio differ from the value ratio: report
both ratios.

## Correlation from data

Pearson r = covariance(x, y) / (sd(x) x sd(y)). Report r with n, the number of missing pairs
dropped, and the axis ranges of each plot. Two plots can show the same r with different
axis ranges, so the visual slope differs. Say which plot has the larger r only after
computing both. If only images are given, say that no coefficient can be stated.

## Label test matrix

| Case | Widths to test | Look for |
| --- | --- | --- |
| Longest category name | 320, 768, 1280 px | clipped or overlapping axis text |
| Shortest and empty names | same | collapsed ticks |
| Missing category | same | gap or wrong order |
| Tooltip | one per chart | text matches the data row |

List failures by chart id and width. Fix by rotating, wrapping, truncating with a full
tooltip, or switching to horizontal bars, and retest the same matrix.
