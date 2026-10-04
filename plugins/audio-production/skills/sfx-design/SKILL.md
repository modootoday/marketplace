---
name: sfx-design
description: Design interface and video sound effects as a consistent set - a short list of sounds with a reason for each, length, pitch and loudness rules so they feel like one family, sources with licences, export formats, and a test in the real context including muted and repeated use. Use when the user needs UI sounds, notification sounds, or sound effects for videos and apps. Not for music beds or voice.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [sound effects, UI sounds, notification sound, SFX design, sound library]
---

# Sound effect sets

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
