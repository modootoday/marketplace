# Worked example: 4 directions, shield on the right arm

Plan: up, right, down, left, shield on the right arm in every direction. The report says: up
shield R; right shield L; down shield R; left identical to right.

| Direction | Expected | Delivered | Result | Reason |
| --- | --- | --- | --- | --- |
| up | shield R | shield R | pass by report | none |
| right | shield R | shield L | fail | wrong arm |
| down | shield R | shield R | pass by report | none |
| left | own art, shield R | identical to right | fail | duplicate of right, so left is missing |

## Mirror pairs to write out

- right and left: a left frame made by mirroring right inverts the shield arm, so a correct
  right-arm frame becomes a left-arm frame. Left must be drawn as its own art or the prop
  redrawn on the other arm.
- Because left duplicates right, left coverage is missing and needs its own art.
- Up and down are not a mirror pair; each needs its own art, and a reuse of one for the other
  is a duplicate to flag.

Always give both parts in the same answer: the table with one row per direction, and the
mirror-pair warning with the resulting arm for each pair.

## Tests before acceptance

Overlay test of the equipment layer over the base frames for each phase, and a rig import
check of pivots against the existing coordinates. State that neither was run.
