---
name: lecture-script-timing-fit
description: Fit a lecture script and slide deck to the allotted time - convert script word counts to spoken minutes at a stated words-per-minute rate, add activity, poll and question time, show minutes per slide per section against the total, flag the overrun and the slides that run long, and name concrete cuts or moves to speaker notes that close the gap. Use when a lecture's script and slides do not fit the time and the user has been trimming repeatedly. Not for structuring the story of a deck (see deck-storyline), for reviewing slide content or for judging a speaker.
metadata:
  tier: open
  level: L2
  domain: education
  install: optional
  keywords: [lecture timing, slides, speaking rate, words per minute, script, activity time, overrun]
  verified-runtimes: [claude-code]
---

# Lecture script timing fit

Repeated trimming by feel does not converge. Compute spoken minutes, add the non-speaking time, and cut by
the number.

## Steps

1. Collect: total minutes, slide count, script words per slide or section, activities with their
   minutes, question or Q&A time, and the speaker's rate if known. If the rate is unknown, state the
   rate you assume (130 words per minute is a plain default for teaching speech; 110 to 150 is the
   usual range) and ask the speaker to time one page aloud to confirm.
2. If words are missing for slides, count what is pasted and ask for the rest instead of guessing.
3. Convert: spoken minutes = words divided by rate. Add activity, poll, demo and Q&A minutes. Add
   transition time if the user gives it.
4. Table per section or slide: slides, words, spoken minutes, minutes per slide, activity minutes,
   section total. Give the grand total next to the allotted time and the overrun or slack in minutes.
5. Flag the slides or sections that run long (minutes per slide well above the deck average, or more
   than about two minutes on a slide with no activity).
6. Name concrete cuts: which section, how many words or which slides, the minutes saved, and where
   the cut content goes (speaker notes, handout, a later session). Cuts must add up to at least the
   overrun; show the running total. Protect the learning goals: add a goal column to the cut table.
   Use the stated learning goals; if none were given, ask for them in the same reply and mark every
   cut as "safe" (examples, repeats, asides, background) or "touches a goal" with the goal it would
   touch if the section carries one, naming the section's likely goal from its slide range. A cut
   in the longest sections is safe only if you say what kind of content goes.
7. Check whether the activity time can shrink before the teaching time does, and say so as an option,
   not a decision.
8. The speaker decides what to cut. Spoken rate varies with pauses and audience; recommend one timed
   run-through of the cut version.

## Output

The rate used and why, the timing table with totals, the overrun, the flagged slides, the cut list with
saved minutes and the new total, and the run-through recommendation.
