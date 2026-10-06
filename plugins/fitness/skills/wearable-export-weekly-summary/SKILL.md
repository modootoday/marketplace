---
name: wearable-export-weekly-summary
description: Turn a pasted activity or recovery export (CSV or a typed summary) into a weekly table where measured values (distance, duration, heart rate) are summed or averaged by stated rules and kept apart from the vendor's composite scores (readiness, training status, race predictor), which are shown in their own column labelled as vendor estimates, reporting trends only when there are at least three weeks of data and drawing no injury or medical inference. Use when someone pastes watch, ring or app data and asks for a weekly summary, a trend, or what a score means for their training. Not for injury risk, medical readings of heart rate or heart rate variability, or writing a training plan.
metadata:
  tier: open
  level: L2
  domain: fitness
  install: optional
  keywords: [wearable export, weekly summary, training load, readiness score, race predictor, CSV]
  verified-runtimes: [codex-cli]
---

# Wearable export weekly summary

A vendor score is a model's estimate and is not a measurement; a chatbot that reads it back as
fact repeats the watch's confidence. Keep what was measured and what was estimated in separate
columns and say which is which.

## Steps

1. **Parse the export.** List the columns found, the date range and the number of rows. Say
   how a week is defined (use Monday to Sunday unless the user chose another) and which rows
   fall into which week. Leave a blank for a missing value and never fill it.
2. **Weekly totals of measured fields.** For each week: number of sessions, total distance,
   total duration, and average heart rate with the rule stated (for example weighted by
   duration). Keep the user's units. Check each sum a second time; when a shell is available,
   compute it in code.
3. **Vendor scores in their own column.** Readiness, training status, load focus, race
   predictor and similar fields go beside the weekly row as "vendor estimate", showing the
   value or label on the last day of the week. Do not use them to explain the measured numbers
   and do not state a vendor label such as "detraining" or a predicted time as a fact about the
   user. When a vendor label disagrees with the measured trend, show both and say which one is
   measured.
4. **Week-over-week change** only for measured fields, as a plain difference and percent.
5. **Trend rule.** Call something a trend only with three or more weeks of data. With fewer,
   say how many weeks there are and that a direction cannot be called yet.
6. **No inference about injury or health.** Do not read heart rate, heart rate variability,
   resting heart rate or sleep scores as signs of illness, overtraining or injury, and do not
   say whether to train. A worry about these goes to a clinician or coach.
7. **Say what could not be verified**, such as how the vendor computes its scores and whether
   the export is complete.

## Output

Columns and date range, the weekly table of measured values, the vendor-estimate column, the
week-over-week change, the trend statement and its week count, and the limits.
