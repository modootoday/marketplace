---
name: equipment-manual-to-pm-schedule
description: Turn a manufacturer manual excerpt and nameplate into an asset register entry and a preventive maintenance schedule where every interval and trigger is copied from the manual with its page, hours-based and calendar-based triggers stay separate, missing fields are listed for site capture and no interval is inferred. Use when a facilities or maintenance person pastes manual pages and nameplate data for new equipment. Not for choosing intervals the manual does not give, for finding which standard applies (see standards-clause-locator), or for approving the plan, which a qualified technician does.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [asset register, preventive maintenance, manual, nameplate, interval, maintenance schedule]
---

# Equipment manual to PM schedule

The manufacturer's manual governs the intervals. This skill copies and structures them; it does not
improve, shorten or fill them.

## Steps

1. Build the asset register entry from the manual and nameplate only: make, model, serial, ratings
   (voltage, phase, power, capacity as printed), location, install date and manual title with
   revision. Write each value as printed and cite the page. A field with no source is "missing, capture
   on site"; serial number and install date are typical gaps.
2. Build one PM task per maintenance statement in the manual: task, interval and trigger exactly as
   worded, and the page. Keep triggers by type in separate columns: calendar ("every 3 months"),
   running hours ("every 2,000 operating hours"), condition ("when pressure drop exceeds ..." only if the
   manual states it) and event. Do not convert hours into calendar time; if a calendar view is wanted,
   ask for the operating hours per week and show the conversion as an assumption.
3. Do not infer an interval the manual does not give. For a component the manual mentions without an
   interval write "interval not in the supplied pages" and name where to look (the full manual, the
   maker). Do not borrow intervals from similar equipment or general practice.
4. Note any manual caution that precedes a task (isolation, stopped machine, qualified person) by quoting
   it with its page. Add none of your own.
5. If the user gives an install date, compute first-due dates for calendar tasks and label them
   as derived; for hours-based tasks show the hour-meter reading to watch for, not a date.
6. Close with Missing fields, Intervals not found and Needs review by a qualified technician before the
   schedule is loaded into a maintenance system.

## Output

The register entry, the PM task table (task, interval, trigger type, page), and the three closing lists.
