---
name: subtitle-media-timebase-check
description: Diagnose subtitle offset, drift or edit discontinuities against a named media artifact using independent clock anchors and held-out residuals. Use when subtitles parse correctly but lose synchronization, or a frame-rate conversion is proposed without a source clock contract. Not for transcription, translation, readability-only QC or generating speech alignment.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [subtitle sync, timebase, clock drift, SRT, WebVTT, held-out anchor, edit discontinuity]
---

# Subtitle media timebase check

Check synchronization against external media observations. Valid cue syntax and matching frame-rate labels do not establish synchronization. Review supplied measurements or explain what to collect; do not claim playback or rendering without evidence.

## Establish the clocks

Identify the exact subtitle and media/edit versions, target player/version, track selection and any delay setting. Obtain the clock units, origin and notation for each anchor. Resolve whether a colon notation means hours/minutes/seconds, frames or something else before calculating. SRT and WebVTT ordinarily express elapsed timestamps; two different FPS labels alone do not justify scaling elapsed time. A frame-based source requires its actual frame numbering, frame rate and conversion contract, including drop-frame interpretation when relevant.

Use identifiable speech or sound events near the beginning, middle and end, with subtitle-clock and media-clock positions and an accepted tolerance. Separate anchors used to derive a mapping from independent held-out anchors. Ask for actual media identity and anchor observations when absent; grammar alone cannot certify sync.

## Decide the mapping

1. Compute media-minus-source offsets per anchor. A near-constant offset suggests a translation; changing offsets may indicate clock drift, a different edit or discontinuities. State the direction explicitly: proposed media time from source time.
2. If fitting an affine mapping t_media = a * t_source + b, identify the fitting anchors and calculate predictions and signed residuals on held-out anchors. Do not add a failed held-out anchor to the fit and then present its new residual as independent validation. An affine fit to two points proves only those two points.
3. A held-out jump near a cut invalidates global certification. Localize the uncertainty and obtain an edit map or additional anchors on both sides. Apply segment mappings only when segment boundaries and corresponding media are established. Do not infer a complete cut map from one residual.
4. Propose transformed starts and ends for the supported region, checking duration and valid timestamp range. Preserve cue IDs, text, line breaks, ordering requirements and intentional overlap. WebVTT subtitle cues may overlap; do not repair an intended overlap merely to satisfy a generic non-overlap rule. A target platform's narrower restriction must be explicit.
5. Distinguish calculated proposal from saved-artifact observation. Recheck early/middle/late and near-cut held-out events in the exact saved subtitle/media/player combination, recording observed cue times, tolerance and any player offset. Preserve originals until that check supports the bounded correction.

## Output

Provide a clock/artifact ledger, anchor table with fit-versus-held-out labels, model and residuals, offset/drift/edit decision, scoped retiming proposal and saved-player checks still required. If inputs are missing, report inspectable syntax separately and request the minimum clock evidence. Do not claim global sync beyond the tested region.

For format contracts, consult [WebVTT cue timings](https://www.w3.org/TR/webvtt1/#webvtt-cue-timings) and the [Library of Congress SRT description](https://www.loc.gov/preservation/digital/formats/fdd/fdd000569.shtml). [Subtitle Edit time-code guidance](https://github.com/SubtitleEdit/subtitleedit/blob/main/docs/features/improve-time-codes.md) distinguishes kinds of synchronization; the main-branch document does not certify an installed release. [Issue 9551](https://github.com/SubtitleEdit/subtitleedit/issues/9551) is closed and reports difficult alignment plus unverified AI-assisted success, not an AI failure or current software defect. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
