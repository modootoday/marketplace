---
name: lipsync-viseme-timeline-check
description: Plan and check mouth animation for a non-human or cartoon character, a sung track or a long audio file by building an explicit viseme timeline and verifying it against the audio length, closed-mouth sounds, segment joins and sampled frames. Use when automatic face-based lip sync misses the character's face, mouths look like speech during a song, a render fails on long audio but works on short clips, or frames where no face is detected break the sequence. Not for subtitle timing, for generating or rendering the animation itself, or for human talking-head edits.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [lip sync, viseme, phoneme timeline, cartoon character, singing, long audio, frame count]
  verified-runtimes: [claude-code]
---

# Lip-sync viseme timeline check

Makers report three failures: a face-based lip-sync tool never detects a beak or cartoon
face, sung audio comes out looking like chatter, and a render that works on 10 second clips
dies on a long track. This skill produces and verifies the plan and the checks. It does not
render or generate video; rendering is a separate step the user runs.

## Steps

1. Get the audio length first (`ffprobe -show_entries format=duration`), and the frame
   rate. Expected total frames = duration x fps. Write both numbers down.
2. Build a timestamped phoneme or viseme list from a forced aligner or a transcript with
   word times: start, end, symbol per row. Require the last end time to equal the audio
   length: the length the user states (for example 240.0 seconds, which is 5,760 frames at
   24 fps), or the ffprobe value when none is given. A tolerance is not part of the pass
   condition. Rows must not overlap or leave gaps. Silence gets its own explicit rows.
3. Map each viseme to the character's own mouth shapes, for example beak closed, half open,
   open, wide. Closed-mouth sounds (m, b, p) and every silence map to the closed shape.
   Never fall back to a human mouth for a gap; name the shape that is used instead.
4. For singing, hold a sustained vowel for the full note length and keep rests as closed
   mouths. Do not re-time the track to speech rhythm; the shape changes follow the sung
   pronunciation and note length.
5. For long audio, split into segments (say 30 to 60 seconds, cut at silences). Carry the
   absolute time offset and the last mouth state into each segment. Make a per-segment table:
   segment, start offset, expected frames, rendered frames, missing frames, peak memory.
   Check that segment frame counts add up to the total from step 1 and look at the join frame.
6. Where face detection fails for a stretch, keep the original frames for that stretch and
   record the frame index range. At the return point check the mouth state and the audio
   offset, which must still match the timeline.
7. Do not call the sync good from the tables. Sample frames at stated times (for example
   every 5 seconds plus each join and each failed-detection edge) and compare each mouth
   shape with the audio at that time. If frames are not available, say the sync is
   unverified.

## Output

The viseme table, the length check, the shape mapping, the segment table with expected
versus rendered frames, the list of frames to sample, and what remains unverified.
