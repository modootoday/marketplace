---
name: running-plan-load-check
description: Check a running or race plan as a week table of total distance, long run and quality sessions, flag weekly distance jumps above the user's stated cap or the general 10 percent rule quoted as a rule of thumb, the long run's share of the week, missing cutback weeks, the taper length and a peak long run that is short for the race distance, and set paces only from a dated recent result by a named method. Use when someone pastes or asks for a running, half marathon or marathon plan to be checked, or wants paces for it. Not for injury or pain decisions, which go to a qualified professional, or for guaranteeing a finish time.
metadata:
  tier: open
  level: L2
  domain: fitness
  install: optional
  keywords: [running plan, marathon, weekly mileage, long run, taper, cutback week, pace from race result]
  verified-runtimes: [codex-cli, grok-cli]
---

# Running plan load check

Chat-written plans list intervals with no pace, a peak long run that stops short of the race,
and weekly jumps the runner never agreed to. Put the plan in a table and check each load rule
by number. Rules of thumb are quoted as such; the runner and coach decide.

## Steps

1. **Week table.** For every week: total distance, long run, number of quality sessions and the
   change from the previous week as a percent. Keep the user's unit (km or miles); recompute
   totals from the sessions when they are listed.
2. **Weekly jump.** Flag each week whose increase is above the user's stated cap, or above about
   10 percent when none was stated, and say the 10 percent figure is a general rule of thumb,
   not a limit.
3. **Long run share.** Give each long run as a percent of its week; flag a share the runner
   would find unusually high or low and say what the number is.
4. **Cutback weeks.** Look for a lower week every three to four weeks of increase. Report the
   longest run of consecutive increases and that no cutback appears if so.
5. **Taper.** Count the weeks of reduced load before the race. Quote about two to three weeks
   for a marathon as a general figure and compare it with the plan, saying in words whether
   the plan sits at the low end, in the range or above it, and calling any single-week
   reduction of about 40 percent or more steep.
6. **Peak long run against the race.** State the longest run as a percent of the race distance
   and compare with what common marathon plans quote (peaks in the range of about 29 to 32 km,
   or 18 to 20 miles); say when the plan stops well short and that this is for the runner and
   coach to weigh.
7. **Paces only from a dated result.** Ask for a recent race or time trial with its date and
   distance. Name the method (for example Riegel, `T2 = T1 x (D2 / D1)^1.06`) and compute in
   code or show the steps; label predictions as estimates. Always write the result's own pace
   (time divided by distance, for example 10 km in 50:00 is 5:00 per km) and relate every
   interval pace to it, using the same result for all paces. Without a result, mark every
   interval pace as "needs a result" and invent none. A result older than about eight weeks is
   flagged as dated.
8. **Pain and injury.** Any pain, niggle or illness goes to a qualified professional; give no
   advice on whether to run through it.

## Wording

Say "rule of thumb" or "general figure" beside the 10 percent rule, the taper length and the
peak long run, so none reads as a limit. Show the pace calculation as written steps (inputs,
exponent, result in seconds, result as h:mm:ss and per km), not only the answer.

## Output

The week table with flags, the taper and long-run findings, the pace table with its method and
source result, what could not be checked, and a short list of questions for the coach.
