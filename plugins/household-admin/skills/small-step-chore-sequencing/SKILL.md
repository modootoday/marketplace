---
name: small-step-chore-sequencing
description: Turn a cluttered space, a seasonal changeover or recurring home and vehicle upkeep into a short sequence of physical actions that fits the time the person has, starting with the smallest set of actions that makes the space usable, each action with the items it needs, the place they move to and a time estimate the person can correct, and dated so every deadline they stated is met. Use when someone asks what to do first, how to start, or how to spread chores over days or weeks. Not for scheduling a single day by the hour (constrained-day-schedule), for health, mental-health or safety advice, or for judging how the person lives.
metadata:
  tier: open
  level: L2
  domain: household-admin
  install: optional
  keywords: [declutter, chore plan, seasonal storage, home maintenance, first step, weekly plan]
  verified-runtimes: [claude-code]
---

# Small-step chore sequencing

This plans physical actions from the facts the person gave. It does not judge the state of
their home, does not give health or safety advice, and cannot know their space.

## Steps

1. Echo the inputs in the person's own words: the items or areas, the minutes available per
   day or per weekend, each deadline with its date, and the recurring tasks with their
   interval. Convert relative deadlines ("in 2 weeks") to dates only against a today date the
   person gave; if none was given, ask once, together with any other missing constraint,
   and until answered label dates as relative ("day 14").
2. Minimum usable state first. Name it in one line (for example a clear path and one clear
   surface), then list only the actions that reach it. Anything beyond it is an optional
   second list, never mixed into the first.
3. Split every larger job into physical actions: pick up, carry, sort, wash, hang. Each action
   names the items, what it needs (bag, box, hanger) and the exact place the items move to. If
   a destination is unknown, ask or write "destination: you choose" instead of inventing one. A
   place, container or tool the person did not mention (a bin, tray, basket, hamper, hangers, a
   corner of the desk) is not assumed: name it only as "you choose", or list it under assumptions.
4. Time. Give a minute estimate per action, marked as an estimate the person can correct, and
   add up each day. No day exceeds the stated minutes; an action that would not fit is split
   or moved to the next day, not squeezed in.
5. Dates. Place each deadline item on a date before its deadline with a buffer, and say what
   the buffer is. Booking or phone steps (an appointment) go early because they depend on
   someone else, but the very first row of the table is still the first action toward the minimum
   usable state; a booking step goes second on day 1 or on day 2. Recurring upkeep is spread by its interval over the weeks asked, one small
   slot per item, without dropping any item from the person's list.
6. Add nothing the person did not list. Suggestions go in a clearly labelled "optional" line, and
   no item or chore is invented. Do not comment on how much stuff there is.
7. Read `references/week-table-example.md` before writing the table. Output a table: day, action,
   items, from, to, minutes, with no blank cell (write "n/a" with the reason, such as a phone call
   or a check, and "you choose" for an unnamed place). Then the day totals, the open
   questions and the assumptions. End by asking the person to correct any estimate or place
   that is wrong.

## Output

Minimum usable state, a dated table of actions with minutes, day totals against the limit,
assumptions, and the questions asked once.
