---
name: workout-log-progression-substitution
description: Structure a pasted workout log into a sets, reps and load table with per-lift changes, propose equipment substitutions by movement pattern for the user's available equipment, and mark every load change and substitute as a suggestion for the user's trainer or coach to approve. Use when someone pastes training logs and wants a progression summary or a plan adapted to home or gym equipment. Not for injury, pain or medical advice, diet, writing a new programme from scratch or replacing a trainer.
metadata:
  tier: open
  level: L2
  domain: fitness
  install: optional
  keywords: [workout log, progression, substitution, equipment, strength training, sets reps load]
  verified-runtimes: [claude-code]
---

# Workout log progression and substitution

The user's log and stated limits are the source. The skill tidies them and proposes options; the
trainer, or the user if they have none, approves any change in load. It does not judge injuries.

## Steps

1. Parse the log into a table: date, lift, sets x reps, load with unit, and any note the user
   wrote. Keep the units the user used. A missing value stays blank; never fill a load or a rep
   count. Show rows that were ambiguous and how you read them.
2. Summarise change per lift from the user's own numbers only: first and last session load, total
   reps or volume (sets x reps x load) per session, and the direction. Compute only what the log
   supports; with fewer than three sessions say the trend is too short to call.
3. Substitutions by movement pattern. Name each lift's pattern (squat, hinge, horizontal push,
   vertical push, horizontal pull, vertical pull, lunge, carry), list what the user says they own,
   and propose substitutes of the same pattern from that equipment, with the main difference (range
   of motion, balance demand, load ceiling). Do not propose equipment the user did not list. Say that
   load does not transfer one to one between a barbell lift and its substitute, so the starting
   load is chosen by the user and trainer, and give no number as if it were safe.
4. Load changes are suggestions only. If the user's own log shows completed target reps at a load
   for consecutive sessions, you may say "the log shows this met; a small increase is the usual next
   option to discuss with your trainer", without a prescribed jump. Never propose a change for a lift
   whose reps were missed or whose note reports a problem.
5. Pain, injury and medical notes. If a note mentions pain, a twinge, dizziness or an injury, do not
   explain it, diagnose it, say whether to train through it, or pick substitutes to work around it.
   Quote the note, say it is a question for a qualified professional (a physician or physical
   therapist) before the next progression, and hold progression for that lift in the table as
   "needs professional review".
6. End with a review list for the trainer: each suggested load change, each substitute, and each
   flagged note, marked unapproved.

## Output

The log table, the per-lift change summary, the substitution table (lift, pattern, substitute,
difference, equipment used), the flagged notes, and the trainer review list. No medical advice.
