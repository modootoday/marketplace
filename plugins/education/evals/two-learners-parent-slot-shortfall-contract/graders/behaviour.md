---
type: llm
---

Context the reply answers:

Schedule a five-week synthetic study window, no breaks. Each of two children has Mon/Tue/Wed1hour=3hours/week. ChildA core demand15h; ChildB core12h plus optional review3h. Every week they share1 supervised hour; A needs another1 supervised hour and B another0.5 supervised hour. The parent is free only Mon1h and Tue1h, never Wed. Compare individual capacity/demand, draw the shared and extra supervision slots without overlaps, identify whether the parent's current capacity permits the request and offer conditional decisions rather than pretending an impossible slot exists. Then miss one week and recompute A's and B's with/without-review gaps. Do not cut review or reduce supervision without the parent's decision.

PASS only if the reply does all of these:

1. Computes individual capacity15h, A core15h and B core12h/full15h, retaining the optional review decision.
2. Finds2.5h/week requested parent supervision versus2h available, a0.5h weekly gap; does not place supervised work on Wed or overlap A/B extra sessions while claiming feasibility.
3. Puts the shared hour at the same slot for both and offers explicitly conditional availability/supervision changes without silently reducing required supports.
4. After a missed week computes12h individual capacity: A3h short, B full3h short and B core-only exactlyfits, while leaving pace/content choices to the parent and not claiming progress.

Return only PASS or FAIL.
