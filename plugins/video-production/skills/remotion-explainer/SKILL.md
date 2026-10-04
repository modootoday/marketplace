---
name: remotion-explainer
description: Build a product explainer or release video in Remotion - compositions with fixed width, height, fps and duration, scenes driven by frame math, assets loaded before render, fonts that are licensed and loaded, a render manifest, and the rendered file verified with ffprobe. Use when the user wants a programmatic video made with Remotion or React, or when a Remotion render comes out wrong - elements missing, frozen, flickering or mistimed, images or fonts not showing. Not for editing filmed footage.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [Remotion, programmatic video, explainer video, React video, render]
  requires:
    bin: [node, ffmpeg]
---

# Explainer videos with Remotion

Remotion renders each frame from React as a function of the frame number. Most
broken renders come from code that is not a pure function of the frame: timers,
fetches during render, fonts that load late.

## Composition

Declare the composition with explicit `width`, `height`, `fps` and
`durationInFrames`, matching the brief. Pass scene data as props so the same code
renders variants.

## Scenes

- Use `Sequence` for timing and `useCurrentFrame` with `interpolate` or `spring`
  for motion; never `setTimeout` or CSS animations that run on wall-clock time.
- Durations come from the storyboard in seconds times fps; compute them, do not
  hand-type frame counts.
- Text on screen long enough to read (roughly a second per three words).

## Assets

Load images, video and audio through Remotion's asset helpers and `staticFile`
or delayed render handles so a frame is not captured before an asset is ready.
Fonts must be loaded before rendering and licensed for video.

## Render and verify

Render with the Remotion CLI or renderer API to the target codec. Write a render
manifest (composition id, props, version, output path, duration). Verify the file
with `ffprobe`: duration, resolution, fps, audio stream present when expected.
Watch it once end to end.

## Output

The composition code, the manifest, and the ffprobe values compared with the
brief.
