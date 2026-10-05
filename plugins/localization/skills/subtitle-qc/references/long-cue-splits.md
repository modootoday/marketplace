# Splitting a cue that is too long

Read this at step 4 of SKILL.md, for every cue with a line over the limit.

## Decision order

| Situation | Action |
| --- | --- |
| One line, a phrase-boundary split gives two lines both within the limit | Show the two lines with lengths. Done. |
| No phrase-boundary split keeps both lines within the limit | Split the cue into two cues at a phrase boundary, each cue 1 or 2 lines within the limit, with proposed timings split in proportion to characters |
| Neither works (a single unbreakable run, or too long even for two cues) | Flag for the editor and say why. Do not silently cut words |

Trimming the wording is a separate, last offer for reading speed. It never replaces the line
split: always show the split of the original wording first, then offer the trim.

A split between a verb and its object is not a phrase-boundary split even when both halves fit
(41 + 41 characters is not a reason to accept it).

## Boundary types, best first

| Rank | Boundary | Example |
| --- | --- | --- |
| 1 | after punctuation | "Finally," / "export the file." |
| 2 | before a conjunction | "open the file" / "and check the limits" |
| 3 | before a subordinate clause (that, how, which, when, where) | "look at" / "how to edit subtitles quickly" |
| 4 | before a prepositional phrase | "every line stays" / "under the limit we agreed on earlier" |
| never | verb from its object, article from its noun, auxiliary from its verb, preposition from its noun | "to edit" / "subtitles" |

For every split you show, name its boundary type and rank in the reply, for example "break before
the how-clause" or "break before the prepositional phrase under the limit", and say in one clause why
it does not separate a verb from its object. Prefer the lowest rank number that fits.

## Worked example: 83 characters, 42 limit, 3.4 s

Cue 2, 00:00:03,600 --> 00:00:07,000:
"Today we are going to look at how to edit subtitles quickly without any extra tools"

1. Candidate two-line splits that fit (both lines <= 42): only "...how to edit" (41) / "subtitles
   quickly without any extra tools" (41), which separates "edit" from its object. Reject.
2. Phrase boundaries: before "how" gives 29 + 53 (too long); before "without" gives 59 + 23 (too
   long for one line). So no single two-line cue works at a phrase boundary.
3. Split into two cues at the clause break before "without". Cue 2a is 59 characters, which
   itself breaks into two lines at "how":
   - 2a, 00:00:03,600 --> 00:00:06,000: "Today we are going to look at" (29) / "how to edit subtitles quickly" (29)
   - 2b, 00:00:06,100 --> 00:00:07,000: "without any extra tools" (23)
   Timings are a proposal: the 3.4 s window is shared in proportion to characters (59 : 23).
4. Reading speed: 2a is 59 / 2.4 s = 24.6 cps and 2b is 23 / 0.9 s = 25.6 cps. Both still fail
   17. Say so, then offer the cure: trim to about 57 characters in the 3.4 s window, or extend
   the end if the next cue (starts 00:00:07,200) leaves no room, which here it does not.
   A split before "how" (29 / 29 + 23, balanced by characters) is equally a phrase boundary.
5. Keep every original cue id: label the halves 2a and 2b and do not renumber the later cues. The
   editor renumbers after approving. State that the timestamps of untouched, valid cues (here 1
   and 3) are unchanged and that every new or moved timestamp is a proposal.

## Worked example: 69 characters, one line

"Then check that every line stays under the limit we agreed on earlier" becomes
"Then check that every line stays" (32) / "under the limit we agreed on earlier" (36): break before the preposition.

## If the script can be run

`node scripts/srt-check.mjs cues.srt 42 2 17` prints the per-cue table and the same split options.
Treat its two-cue plan as a draft and check it by hand.
