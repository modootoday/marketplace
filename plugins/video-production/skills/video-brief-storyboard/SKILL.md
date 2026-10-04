---
name: video-brief-storyboard
description: Turn a video request into a brief and a scene-by-scene storyboard that a renderer or editor can execute - goal, audience, platform, length, resolution and frame rate, then each scene's duration, visuals, on-screen text, voice-over and asset sources, with acceptance criteria. Use when the user asks for a video plan, storyboard, shot list or brief for a short-form, explainer or product video. Not for rendering or editing the video.
metadata:
  tier: open
  level: L2
  domain: video-production
  install: optional
  keywords: [storyboard, video brief, shot list, short-form video, explainer video]
---

# Video brief and storyboard

A storyboard is ready when someone else could produce the video from it without
asking a question.

## Brief

- Goal (the one thing a viewer should do or remember) and audience.
- Platform and format: aspect ratio, resolution, frame rate, maximum length,
  whether it plays muted by default (then text must carry the message).
- Tone and brand rules, music direction, voice (none, human, synthetic).
- Acceptance criteria: length range, required captions, required logo or legal
  text, file format.

## Storyboard

A table, one row per scene:

| # | Duration (s) | Visual | On-screen text | Voice-over | Audio | Assets and source |

- The first 2-3 seconds show the subject and the hook.
- Durations add up to the target length.
- On-screen text short enough to read in the scene's time.
- Every asset has a source: filmed, stock with licence, generated, rendered.

## Machine-readable version

When a renderer will build it, also give a JSON scene list with the same fields
and the global settings (width, height, fps, duration in frames).

## Check

Total duration, readability of each text at its duration, every asset sourced,
and the acceptance criteria restated at the end.
