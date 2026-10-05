# Timeline check

## Worked table

Fixed: dinner 18:30 at the restaurant, nap 13:00-15:00 at the hotel, hotel to old town 25 min.

| Start | End | Item | Travel before | Hours check | Buffer |
| --- | --- | --- | --- | --- | --- |
| 09:30 | 10:00 | Breakfast at hotel | - | open 07:00-10:30 ok | 15 min |
| 10:15 | 12:15 | Old town walk | 25 min | open space ok | 15 min |
| 12:15 | 12:55 | Back to hotel | 25 min | - | 5 min |
| 13:00 | 15:00 | Nap (protected) | - | - | - |
| 15:30 | 17:30 | Museum | 20 min | open until 17:00, fails: close at 17:00 | - |

A failing row is rewritten, not hidden: move the museum to 15:30-16:50, or replace it.
Dinner is checked last: leave 17:50 for a 30 minute leg and a 10 minute buffer.

## Variants

- Run-of-show: fixed items are doors, set-up and curtain; travel is load-in, change-over and
  walk times; flag overlaps of the same person or room.
- Tours or visits: one row per visit, travel between sites, and a gap rule between
  visits; flag a slot outside the host's stated availability.
- Multi-dish prep: merge repeated prep tasks into one row, put each dish's finish time
  first and work backward, check the oven or burner is not double-booked.
- Long transit moves: put the essentials first (what must be reachable during transit),
  then dated tasks before and after.

## Changes that hit the plan

Record the change, list which rows it touches, keep fixed rows in place, and give one backup
per fragile row with its own hours check.

## Map verification

List what must be checked on a map: each travel leg, the opening hours, and the booking
rules. The plan is a draft until the user has done so.
