---
name: transcript-cut-boundary-check
description: Choose clips or build a paper edit from a timed transcript so every cut lands on a complete thought and a word boundary, and check each in and out point before anything is rendered - read the line before and after, add handles, keep breaths and natural pauses, count the filler removed, and list the timeline with quoted first and last words. Use when someone asks for a short clip from a podcast or interview transcript, a transcript-based rough cut, or filler and pause removal that must still sound natural. Not for generating video, rendering the cut with ffmpeg, subtitle timing or audio mixing.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [transcript, paper edit, clip selection, cut points, filler removal, podcast]
  verified-runtimes: [claude-code]
---

# Transcript cut boundary check

Podcast editors report three failures: automatic clips that start or end mid-thought, paper
edits that never become a usable timeline, and filler or silence removal that makes speech
sound unnatural. This skill plans and checks the cuts from the transcript. It does not
generate or render video or audio; hand the checked list to `talking-head-edit` or your editor.

## Steps

1. Read the whole requested span plus the line before the in point and the line after the out
   point. A clip must start where a thought starts (a question, a claim, a new topic) and end
   where the thought concludes. A transcript that stops mid-sentence is not an end point:
   end at the last complete sentence before it, even if that is shorter than asked, and say so.
2. Snap each cut to word boundaries from the word times, not to a rounded second. Put the in
   point a few frames (for example 3 to 6) before the first word and the out point the same
   after the last, so no consonant is clipped. Give every in and out point a handle,
   including the cuts around a removed filler: end the segment a few frames after its last
   word, inside the following pause or gap, and say that is where the handle sits. Report
   the handle in frames or seconds for each point.
3. Keep breaths and the natural pauses between sentences. Remove a filler ("um", "uh") only
   when taking it out does not change the rhythm or join two words that were separate; if a
   removal would leave no gap where a pause was, keep the filler or leave a short gap.
   Report the count removed and the count kept, with the timecodes of the ones kept.
   Never shorten a sentence pause while removing a filler next to it: take only the filler's
   own span, keep the whole pause, and state the gap the join leaves next to the original gap.
4. Check each join: read the last words of the segment before and the first of the next
   as one sentence. Flag any join that changes meaning or leaves a dangling "and" or "because".
   This checks the words only; do not say a join works or sounds fine.
5. Say what you could not check: without the audio, breaths and room tone are unverified,
   so the pauses are checked from the word times only. Do not write that a cut will sound
   natural or clean; write that it needs a listen, and list which cuts.

## Output

A timeline table: segment, in, out, first words, last words, duration, handle, notes. Under
it: the filler removed and kept, any boundary moved from the request and why, and the checks
that need a listen. The editor decides the final cuts.
