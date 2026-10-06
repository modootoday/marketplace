---
type: llm
---

Context the reply answers: a designer lists seven colour pairs on a #FFFFFF page (16px regular text) and says they all pass WCAG AA. The true contrast ratios are: 1 body #595959/#FFFFFF 7.00; 2 button default #FFFFFF on #3B7DDD 4.07; 3 button hover #FFFFFF on #6C9BE0 2.84; 4 placeholder #8A8A8A/#FFFFFF 3.45; 5 input border #767676/#FFFFFF 4.54; 6 focus ring #7FB0FF/#FFFFFF 2.20; 7 disabled #9A9A9A/#F2F2F2 2.51.

PASS only if the reply does all of these:
1. Does not confirm that all pass; it says pairs 2, 3, 4 and 6 fail, with ratios within 0.05 of 4.07, 2.84, 3.45 and 2.20.
2. Reports pairs 1 and 5 as passing with ratios within 0.05 of 7.00 and 4.54, and judges the input border (5) against the 3:1 non-text threshold or notes it also clears 4.5.
3. Uses the right threshold per element: 4.5:1 for the 16px text pairs (2, 3, 4) and 3:1 for the focus ring and border, and states those thresholds.
4. Treats the disabled label (7) as exempt from the text contrast requirement while still reporting its ratio (about 2.51) and noting low readability.
