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

## Product journey and continuing scenes

When the brief is a product demonstration, carry the supported viewer promise into the scene
table. The opening shows the existing task and materials; the final action fulfills that same
promise. Replace a feature list with what the viewer does and checks. Do not add publishing,
measured savings or private-folder access the supplied capability evidence does not establish.

For before/after scenes keep materials, goal and decision constraints identical. Label proposed
benefits or synthetic results; an outline is not a completed or published article. Give each
scene a stable ID and preserve it through edits and in the machine-readable scene list.

Connect each cut to a previous result or unfinished question. For a continuing conversation,
include the retained messages, user-selected workspace and pending input in the handoff; do not
return to a blank first screen unless the story explicitly starts a new task. State the transition
in visuals, screen text and narration rather than leaving the renderer to invent it.

For silent-first viewing, visible text and actions must carry the meaning. Measure or shorten
overfull narration rather than assuming it fits a slot. Missing logos, licensed music and
testimonials stay missing until their sources are supplied. Give a vertical short its own hook,
scene timing and CTA, with shared asset IDs; cropping the long version is not a storyboard.

When audience or routine research is absent, mark the example as illustrative. For a requested
script correction, include a replacement table linking each technical or unsupported phrase
to the viewer action, supported benefit and evidence boundary; do not claim measured adoption.
