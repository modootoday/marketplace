---
name: remotion-explainer
description: Build a product explainer or release video in Remotion - compositions with fixed width, height, fps and duration, scenes driven by frame math, assets loaded before render, fonts that are licensed and loaded, a render manifest, and the rendered file verified with ffprobe. Use when Remotion compositions/rendering are selected or an existing Remotion render is missing elements, frozen, flickering or mistimed. React UI alone does not establish a Remotion video workflow. Not for plain HTML/canvas without React or Remotion, stack-neutral deterministic animation verification, or editing filmed footage.
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

Match the requested rendering stack before applying composition APIs. Keep plain HTML/canvas
without React or Remotion in its chosen stack; do not migrate it to reuse these frame checks.
Generic deterministic verification does not require a Remotion composition. Apply this
workflow when Remotion rendering is selected or an existing Remotion composition is in scope.

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

## Audio and full-file acceptance

Require the input audio identity and measured or inspectable duration before placement; when absent, request them and leave timing pending rather than estimating a real track's length.

Place approved audio in the composition at timeline-defined frames and record audio/caption hashes with props. Verify the expected track exists and that start/end offsets and scene joins match the same timeline used in preview. Decode the entire encoded file, not just its metadata, and inspect errors and final decoded duration. Compare sampled preview/export frames at equal frame numbers with identical fonts/assets/cues. A render exit0 or ffprobe stream listing cannot replace full decode and end-to-end viewing; report checks not executed. Keep this workflow Remotion-specific.
