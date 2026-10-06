---
name: subtitle-qc
description: Check subtitle cues or a dubbing-plus-subtitle package against limits - characters per line, lines per cue, reading speed, minimum duration, monotonic non-overlapping timing - and report violations by cue id, with phrase-boundary line splits. Use when creating, reviewing or revising SRT or VTT subtitles, or preparing a dubbing script and subtitle set for a video. Not for transcribing audio or translating the content.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  approval: scripts
  keywords: [subtitles, SRT, reading speed, cue timing, dubbing script, subtitle QA]
  requires:
    bin: [node]
  verified-runtimes: [claude-code]
---

# Subtitle QC

Video editors use assistants for subtitle drafts and revisions, and for dubbing plus subtitle
packages. Timing and line limits are checkable; check them instead of eyeballing.

## Steps

1. Take the limits from the user or the target platform. If none are given, state the defaults
   you assume (for example 42 characters per line, 2 lines per cue, about 17 characters per
   second, a minimum cue length of 1 second) and say they are assumptions to override.
2. If the cues are in a file and node is available, run `node scripts/srt-check.mjs <file> <chars> <lines> <cps>` for the per-cue table, overlaps and split options; if it cannot be run, do the same checks by hand. Parse every cue: id, start, end, text. Compute per cue: characters per line, line count,
   duration, characters per second (total characters over duration), gap to the next cue.
3. Timing: starts and ends must increase, and a cue must not start before the previous one ends.
   Report overlaps and negative or zero durations with both cue ids and the timestamps.
4. For a cue that is too long or too fast, propose a split at a phrase boundary (clause,
   conjunction or punctuation), never between a verb and its object or an article and its
   noun, even when that gives equal halves. Break before a preposition, conjunction or clause
   and after punctuation, and keep an auxiliary with its verb. Balance lines only within those
   boundaries. Every single line over the character limit, with no exception for lines that are
   only a little over, is split into two lines inside the same cue when the lines-per-cue limit
   allows it, and that split is always shown as the two resulting lines with their lengths. When
   no phrase boundary keeps both lines within the limit (an 83-character cue is typical), do not
   trim the text and do not accept a verb-object split: read `references/long-cue-splits.md` and
   split the cue into two cues at a phrase boundary with proposed timings (ids 2a and 2b, later cues not renumbered), showing every line
   and its length. Separately say whether the reading speed still fails and offer a trim or an
   extension after showing the split of the original wording.
5. Do not change a valid timestamp. A retiming proposal is labelled as a proposal. A cue that
   overlaps another is not a valid cue: name the cues whose timestamps stay unchanged (the ones
   with no violation) and keep overlapping cues out of that list.
6. A dubbing script is a separate list from on-screen subtitle text: spoken lines may be longer
   and are timed to speech, subtitles to reading.

## Output

A violations table: cue id, rule, measured value, limit, proposed fix. Then a count per rule
and the revised cues for the violating ones only. Computed numbers are shown, not described.
