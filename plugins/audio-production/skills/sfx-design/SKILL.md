---
name: sfx-design
description: Design a coherent set of timed interface or video sound effects with source rights and event playback checks. Use when the user requests action feedback, notification sounds or event-timed effects and stingers.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [sound effects, UI sounds, notification sound, SFX design, sound library]
---

# Sound effect sets

## Applicability

Enter only when timed action feedback or effect events are requested. For standalone music-
bed mood, selection or comparison, stop this workflow and preserve the music-only brief.
Do not add clicks, stingers, event maps or seek rules because music accompanies an app/video.
Missing sound files permit a design and validation plan, not claims of listening or playback.

Sounds that each sound fine can still make a product feel cheap together: one
loud click, one long chime, three different timbres. Design the set, not single
sounds.

## Decide which sounds exist

List events that need a sound and why (confirmation of an action the user cannot
see, an error that needs attention, a notification). Leave out sounds for things
the screen already shows clearly; every extra sound is noise after the tenth time.

## Rules for the family

- Length: UI sounds under about 300 ms; notifications under about 1.5 s.
- Pitch and timbre: one instrument family or synthesis patch; success rises,
  errors fall or stay flat.
- Loudness: matched across the set (measure, do not judge by ear), quieter than
  speech, never clipping; leave headroom.
- Start instantly (no silence at the head) so they feel connected to the action.

## Sources and licences

Record for each sound whether it was recorded, synthesized, taken from a library
(with licence terms) or generated (with the tool's commercial-use terms).

## Export

Short uncompressed or high-quality files for apps (WAV or the platform's
preferred format) plus compressed versions for the web; consistent sample rate.

## Test in context

Play each sound in the product at real volume, repeatedly, with other sounds,
and check the product still works and makes sense with sound off.

## Event-bound playback

Map each sound to a stable event ID, timeline time, trigger semantics, asset hash, gain and license evidence. Specify whether scrubbing is silent, whether rewinding allows replay and how pause/resume cancels stale scheduled sounds. Do not fire effects merely because state was reconstructed after a seek or multiply one event across callbacks. Test repeated actions and scene joins against speech masking/peaks; missing playback evidence remains pending. Record the actual source/use terms: a free-download label alone does not settle commercial or attribution conditions.
