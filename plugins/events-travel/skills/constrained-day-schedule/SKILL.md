---
name: constrained-day-schedule
description: Build or re-plan a one-day schedule - a run-of-show, a travel day, a family outing, a tour or visit round, a move or a multi-dish cook - under fixed bookings, durations, travel time, opening hours and protected blocks such as a nap, with a worked timeline, a check of every item against its hours, buffers and backups for what could change. Use when someone asks to plan or re-plan a day or event around fixed times, opening hours, travel between stops, a nap or rest window, a closed venue or a change that hits the plan. Not for multi-week calendars, booking or buying anything, or live availability the user did not supply.
metadata:
  tier: open
  level: L3
  domain: planning
  install: optional
  keywords: [itinerary, run of show, day plan, travel time, opening hours, nap window, replan, backup plan]
  verified-runtimes: [claude-code]
---

# Constrained day schedule

A plausible-looking day plan breaks on arithmetic: a stop that closes before arrival, travel
time left out, a nap overlapped by an activity, a fixed dinner that nothing works back from.
Work from the constraints, not from the activities.

## Steps

1. List the fixed items first, each with a clock time: bookings, the fixed dinner or
   show start, protected blocks (nap, rest, meal), opening hours of each venue, and the
   changed or closed item if this is a re-plan. Mark every fact the user did not give as
   unknown and ask for it; do not assume hours or travel times.
2. Work backward from each fixed time and forward from the start. For each leg write
   travel time and add a buffer (state the size and why). Use only travel times the user
   gave, or label them an estimate to check on a map.
3. Place the remaining activities in the free windows, longest-constrained first. Never
   place an activity across a protected block or outside opening hours; check each item
   against its hours and say so in the table.
4. When something is closed or changed, remove it, keep every fixed item where it is, and
   fill the gap with a labelled alternative that fits the same window and hours. Give a
   backup for the most fragile item (weather, queue, delay).
5. Output a timeline table: start, end, item, travel before it, hours check, buffer. Then
   the totals (gap time, free time left), the backups, and a short list of facts to
   confirm on a map or with the venue before leaving.

## Never

- Output more than one plan. An alternative is allowed only if it passes the same hours
  and arithmetic check in full; otherwise name it as not fitting and say why.
- Place an item whose start plus duration runs past its closing time; recompute every end
  time, including in alternatives and backups.
- Add activities, meals, errands or rows the user did not list; leave a gap as "free time"
  and say what fits it.
- Place two legs or items at overlapping clock times; recompute each end time from the start
  and the stated duration.
- Invent opening hours, prices or availability; state them as given or as unknown.
- Move a fixed item or a protected block to make the plan fit; say it does not fit and offer
  options instead.

Read `references/timeline-check.md` for the worked table and variants (run-of-show, tours,
multi-dish prep, long transit moves).
