---
name: scripted-code-animation-verification
description: Verify a code-driven animation (HTML or canvas, SVG, Manim, a scripted trailer) against its required event order, scene continuity, total duration, text behaviour and mechanical linkage by reading the timeline in the code and checking sampled frames. Use when a user asks for or has received a scripted animation with events that must happen in a given order, motion reused from an earlier file, a mechanism that must move in phase (feet on pedals), text that wraps or clips at scene changes, or preview timing that differs from the export. Not for generating the animation, AI video clips, or editing recorded footage.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [code animation, deterministic timeline, scene continuity, Manim, HTML animation, frame timing, motion reuse]
  verified-runtimes: [claude-code]
---

# Scripted animation verification

Makers of code-based animations report scenes that look like separate screens, events out
of order or missing, a total that is not the requested length, reused motion that came back
slightly different, legs that do not follow the pedals, long text that wraps without warning
in Manim, and a preview that does not match the exported timing. This skill checks the
delivered code and its output against the request. It does not generate the animation.

## Steps

1. List the required events in order, with the requested total duration, as a numbered
   table before reading any code. Add constraints from the request: no text, a single file,
   autoplay, no changes to source files.
2. Find the time axis in the code: a fixed clock or frame counter versus wall-clock time,
   random values without a seed, and delays. A deterministic animation shows the same frame
   at the same time on every run. Record the duration the code actually computes and
   compare it with the requested one; report the difference in seconds.
3. Place every required event on that axis (start and end time, line or function that
   drives it). Mark each event present, missing or out of order. Look for events that run in
   parallel when the brief wants a sequence.
4. Check continuity at each scene change: the object that leaves is the object that
   enters (same group, same position and scale at the cut), nothing jumps, and text that is
   set to an explicit width does not wrap or clip unplanned. List each cut with the last
   frame of one scene and the first of the next.
5. For motion reused from an existing file, require extraction unchanged: diff the
   motion parameters (period, easing, keyframes) against the source and allow changes only
   to the text and colour requested. Check that source files are unchanged (hash or diff).
6. For a mechanism, check linkage by phase: sample the driver (pedal angle) and the
   follower (foot position) at the same times, for example every 45 degrees, and report the
   offset. Looking plausible in motion does not count.
7. For path or delay controls, record each object's path start and end, its start frame,
   and compare the frame the preview shows with the frame the export writes at the same
   time. State the check as pass or fail with the numbers.
8. If nothing can be run, say which checks stayed unverified and give the exact command or
   frame list to run. Do not say the animation works from reading the code alone.

## Output

A table of required events (order, start, end, status), the duration check, a continuity
table per cut, the linkage or reuse checks that apply, and a list of unverified items.
