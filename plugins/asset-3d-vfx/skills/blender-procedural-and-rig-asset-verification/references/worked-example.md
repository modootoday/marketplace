# Worked example: fence kit and idle loop

Synthetic report: post_spacing 0.5-3 m, height 1-2.5 m. Spacing 3 with height 2.5 leaves rails
sagging through the ground. The corner post has a 0.2 m gap to the rail. The hand drifts 6 cm at
frame 24 of the idle loop. Not tested: gate variant, minimum spacing, engine import.

## Fix and retest rows

Every failure gets one row with all four columns filled. A failure that has only a
description is incomplete.

| Failure | Class | Fix to enforce | Retest (same setting or frame) | Expected |
| --- | --- | --- | --- | --- |
| Rails sag through the ground at spacing 3, height 2.5 | parameter-range issue at a corner of two parameters | clamp spacing to a maximum that shrinks as height grows, or add a mid-span support | spacing 3 with height 2.5 (and the clamped value) | no ground intersection |
| 0.2 m gap between corner post and rail | connectivity failure, not cosmetic | snap the rail end to the post anchor | corner post to rail joint | gap 0 m |
| 6 cm drift of the hand at frame 24 | contact failure | pin the hand to the prop while held (constraint) | hand position over the held frames, frame 24 first | drift 0 cm, hand does not move while held |

## Coverage plan

For each parameter test minimum, default and maximum, then the corner combinations:
spacing 0.5 and 3 against height 1 and 2.5. Do not test only the failing corner.

| Check | Setting or frame | Measured | Limit | Result |
| --- | --- | --- | --- | --- |
| Ground intersection | spacing 3, height 2.5 | intersects | none | fail |
| Ground intersection | spacing 0.5, height 1 | not measured | none | not tested |
| Ground intersection | spacing 3, height 1 | not measured | none | not tested |
| Ground intersection | spacing 0.5, height 2.5 | not measured | none | not tested |
| Rail to post join | corner post | 0.2 m gap | 0 m | fail |
| Rail to post join | gate variant | not measured | 0 m | not tested |
| Held-prop contact | frame 24 | 6 cm drift | 0 cm | fail |
| Engine import | target engine | not measured | imports, references kept | not tested |

Close with an explicit not-tested list: gate variant, minimum spacing, engine import.
State that none of them is claimed to pass.

## Checklist before sending

- Each failure names its exact setting or frame and has an enforced limit, not only a symptom.
- Each fix has a retest that repeats the same setting or frame with the limit as expected value.
- The contact row names the contact check (the held part does not move while in contact).
- The coverage plan lists min, default, max and corner combinations, and every untested
  cell is marked not tested.
