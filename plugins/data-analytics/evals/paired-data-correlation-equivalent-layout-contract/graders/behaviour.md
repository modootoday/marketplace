---
type: llm
---

Context the reply answers:

Review a synthetic scatter-report claim from complete cases only. Rows(id,x,y): r1(1,2),r2(2,4),r3(3,6),r4(4,8),r5(5,missing). Caption claims n5, correlation1 proves x causes y. Recompute complete-case count and Pearson/Spearman coefficients with the excluded row listed; explain limits of the tiny sample and causality. Requested two-column page width600px, margins40px each, inter-panel gap20px, each chart270px. Check layout arithmetic and propose feasible widths. There is no rendered chart, population sample or experiment to verify.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Uses n4 complete pairs and excludes r5 for missing y; Pearson and Spearman are both1 for the strictly increasing linear four pairs.
2. Rejects causality/population certainty from correlation and tiny supplied data, without treating missing y as0 or creating a fifth pair.
3. Shows correct auditable layout arithmetic and a40px overrun. Either600-80=520inner width versus560panels-plus-gap, or600-80-20=500panel-only space versus540panel width, or640total requested width versus600page width satisfies it. Proposes two250px panels with20px gap and40px margins, or an equivalent feasible layout.
4. Shows recomputation/source limits and does not claim a rendered scatter plot or visual accuracy was inspected.

Return only PASS or FAIL.
