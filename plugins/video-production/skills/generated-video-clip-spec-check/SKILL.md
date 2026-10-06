---
name: generated-video-clip-spec-check
description: Check an AI-generated video clip against its brief frame by frame before regenerating - turn the request into measurable checks (locked camera, loop seam, stray text, prop era, hand continuity, clean borders, join between clips), sample frames with ffmpeg, then rewrite the prompt around the one failing constraint and cap the retries. Use when a generated clip drifts, will not loop, shows unwanted text or anachronistic props, has black borders after upscaling, or does not join the next clip, and the user keeps regenerating blindly. Not for planning footage, editing real recordings or subtitle timing.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [generated video, ffmpeg, frame sampling, locked camera, seamless loop, clip join, prompt revision]
  verified-runtimes: [claude-code]
---

# Generated clip spec check

Video makers report regenerating a clip many times because the camera follows the subject,
lyrics or captions appear, a watch shows up in a Roman scene, the loop has a jump, or a join
between two clips is not smooth. Test the clip against the brief first, then change one thing.

## Steps

1. Turn the brief into frame-level checks, each pass or fail: reference points that must
   not move (horizon, a fixed object), the loop seam, stray text or logos, prop and
   clothing era, hand and limb continuity, black borders or the active picture size, and
   motion speed where the brief states it.
2. Sample frames at a fixed interval plus the first and last frame, for example
   `ffmpeg -i clip.mp4 -vf fps=1 frame_%03d.png` and the last frame with `-sseof -0.1`.
   Record each check per sampled frame with the measured value (pixel position, present or
   absent). Report a drift as a number, not as "slightly off". If frames are not available,
   say which checks cannot be judged.
3. For a join, compare the last frame of clip A with the first of clip B (position, scale,
   lighting) and the motion direction at the cut. For a loop, repeat the clip twice and
   inspect the frames across the seam.
   For each failure say why it fails the brief in one phrase: a watch in a Roman scene is an
   anachronism, a caption blob is a stray text overlay, a moving horizon breaks the lock.
4. Rewrite the prompt with the failing constraints stated first and plainly (for example a
   static locked-off tripod frame, no text) and change only those. Reuse the brief's own
   scene wording for everything else; do not add new details such as walking direction.
5. State a regeneration cap (for example 3 attempts per constraint) and the fallback when it
   is reached: crop, stabilize, cut the offending frames by hand, or use a different
   generation mode. Do not promise that a prompt wording fixes it.

## Output

A check table (check, frames measured, value, pass or fail), the revised prompt, the cap and
the fallback.
