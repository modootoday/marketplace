---
name: talking-head-edit
description: Edit talking-head or screen-recorded video with ffmpeg - cut long silences and false starts without clipping words, level and clean the voice, burn in or attach subtitles, and export to the platform's format - keeping the original and a list of every cut. Use when the user wants a recorded talk, lecture, interview or community video tightened, captioned or exported. Not for animated explainers or color grading.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [talking head edit, silence removal, ffmpeg cut, subtitles, video export]
  requires:
    bin: [ffmpeg]
  verified-runtimes: [codex-cli]
---

# Talking-head editing with ffmpeg

## Find the cuts

- Detect silences with `silencedetect` (threshold relative to the recording's
  noise floor, minimum length around 0.5-1 s) and keep a margin of about 0.1-0.2 s
  on both sides so words are not clipped.
- False starts and repeated sentences need a transcript: get one, mark the
  ranges to remove, and keep the decision list.
- Never cut inside a word; check each cut boundary against the transcript
  timing.

## Apply

Build a list of keep segments and render them in one pass (trim and concat
filters, or a concat list), re-encoding so cuts are frame-accurate. Keep audio
and video in sync; check the last segment's duration.

## Audio

High-pass for rumble, gentle noise reduction, then loudness normalisation to the
platform target with a two-pass loudnorm (see audio-mix-master when installed).

## Subtitles

Generate or correct an SRT from the transcript, re-timed to the edited video.
Burn in for platforms that play muted, or attach as a separate track where the
platform supports it. Keep lines short and two lines at most.

## Export and check

Target resolution, frame rate and codec for the platform. Verify with ffprobe,
watch every cut point, and deliver the edit decision list with the file.
