---
name: shift-overtime-calculation
description: Split long or overnight shifts into clock intervals and count paid, overtime and premium hours under the rule the user pastes - unpaid breaks removed, each interval tagged once, overlaps shown explicitly, and the rule restated as applied. Use when someone has a shift schedule that crosses midnight or runs long and wants overtime and premium (night, weekend) hours calculated from a stated rule. Not for deciding what the law requires, setting pay rates or computing wages beyond hours, or approving payroll.
metadata:
  tier: open
  level: L3
  domain: hr-ops
  install: optional
  keywords: [overtime, night premium, shift hours, overnight shift, premium hours, timesheet]
---

# Shift overtime calculation

Hour counts go wrong when a shift crosses midnight, a break sits inside a premium window, or
an hour that is both overtime and night time gets counted twice in the total.
Use only the rules the user pasted. Local law, contracts and the payroll owner decide what is
actually owed; this skill does the arithmetic on the stated rule.

## Steps

1. Restate the rule exactly as given, as a short list: the overtime threshold and what it is
   measured over (per shift, per day, per week), the premium windows, whether unpaid breaks
   count, and whether premiums stack. If a part of the rule is missing or ambiguous, ask or
   state the assumption you used. Do not add a legal rule, a rate or a threshold the user did
   not give. Keep the restated rule to the user's own lines; put every interpretation of yours
   in a separate "my reading" list, and write "none" there when the rule needed none.
2. Per shift, write the clock intervals in order with the date change marked. Remove unpaid
   breaks first. What remains is the paid-hours timeline.
3. Walk the paid timeline accumulating hours. The overtime threshold is crossed at the clock
   time where accumulated paid hours reach it, which moves later when a break precedes it.
   Mark every interval after that as overtime.
4. Tag premium windows on the same timeline (a window that crosses midnight is one window).
   Intersect them with paid intervals only, so a break inside the window removes those hours.
5. Count each paid hour once in the paid total. An hour can carry two tags (overtime and night)
   only when the rule says premiums stack; show those overlap hours as their own line so
   nobody adds the tags up into a larger paid total.
6. Table per shift: paid hours, regular, overtime, each premium category, overlap. Then totals
   across shifts, with a check line: regular plus overtime equals paid hours, and paid hours
   equals elapsed time minus unpaid breaks.
7. Close with: the rule was applied as pasted, local law and any agreement may differ, and the
   payroll owner should check the intervals and the result before anything is paid.

## Output

The restated rule, an interval list per shift, the per-shift table, totals with the check line,
assumptions, and the payroll-check note. No money amounts unless the user supplied rates and
asked for them, and even then label them as arithmetic for payroll to verify.
