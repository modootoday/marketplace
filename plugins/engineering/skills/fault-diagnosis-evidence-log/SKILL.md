---
name: fault-diagnosis-evidence-log
description: Take a vehicle, HVAC or similar equipment symptom and produce the five to eight questions that best separate the possible causes, in order of diagnostic value, plus a running evidence log of symptom, test, reading with units, result and what it rules out, keeping observed facts apart from guesses and suggesting only safe next checks. Use when someone describes a machine that will not start, cool or run right and wants to know what to check and how to record it. Not for naming a root cause, for software defects (see defect-triage-evidence), or for repairs, which a qualified technician decides.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [troubleshooting, diagnosis, evidence log, symptom, motorcycle, hvac, intake questions]
  verified-runtimes: [claude-code]
---

# Fault diagnosis evidence log

The output is a list of what is known, what to check next and what each check would rule out. It does
not declare a cause. A technician decides the diagnosis and the repair.

## Steps

1. Restate the symptom as observations only: what happens, when it began, what changed just before
   (weather, fuel, service, parts), and what is normal. Put guesses the user offered in a separate
   "hypotheses, not facts" list.
2. Write 5 to 8 questions that split the possible causes, ordered by how many causes each answer
   removes and by how cheap and safe it is to answer. Prefer questions that can be answered by looking
   or by a basic reading (a switch position, a warning light, a battery voltage, a filter state). Put the
   free checks that most often explain the symptom first (switch and interlock positions, visible water
   or damage, and whether the fault tracks a recent change such as weather or service). Number them in
   that order, so a check you call the first thing to do is question 1, and include whether the fault
   changes when the machine is dry, warm or rested when the symptom began with weather or use.
   Say beside each what the answer would point toward or rule out. The numbering is the ranking: the
   question you consider the most useful or most decisive is number 1, and no
   question is called more useful than one numbered above it. Do not label any question "the most
   useful" unless it is number 1.
3. Start the evidence log as a table with columns: step, symptom or test, reading with unit, result,
   conclusion limited to what the result shows, rules out, and still open. A reading without a unit is
   recorded as "unit not given". Record a test only when the user reports having done it; planned
   checks go in a separate "next checks" list.
4. Keep observed fact, inference and guess in separate columns or lists. Never write "the cause is".
   Use "consistent with", and list the alternatives the evidence has not removed.
5. Safety comes before the checks. If the user describes a test that involves a spark, fuel, mains or
   stored energy, hot or moving parts, refrigerant or pressure, begin the next-checks section by saying
   what the hazard is (for example fuel vapour near a spark, or ignition high voltage), advise stopping
   that test, and never ask the user to repeat, vary or refine it. Then limit the next checks to what a
   non-specialist can do with the machine off and nothing removed: looking, switch and selector
   positions, what a gauge or display already shows, and a reading taken with everything off and
   compared with the maker's value if the user supplies it. Anything that needs a part removed, the
   engine or compressor running or cranked, a live circuit, a fuel or refrigerant line, or a hot or
   moving part goes into a "hand to a technician" list with no procedure and no "only look" variant.
6. End with what the log cannot establish and the point at which to hand the log to a technician.

Before writing the questions and the log, read `references/log-example.md` for the shape.

## Output

The questions with what each separates, the evidence log table, the next-checks list with safety
notes, and the handoff line.
