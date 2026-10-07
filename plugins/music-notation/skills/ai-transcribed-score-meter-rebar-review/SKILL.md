---
name: ai-transcribed-score-meter-rebar-review
description: Review AI-transcribed MusicXML meter and proposed bar boundaries against supplied source-audio annotations and owner-approved beats while preserving voices, chords and ties. Use when transcription produces irregular meters or a proposed rebar must be checked for lossless musical timing. Not for forcing 4/4 without beat evidence or claiming independent audio recovery from XML sums.
metadata:
  tier: open
  level: L3
  domain: music-notation
  install: optional
  keywords: [MusicXML, notation, import, roundtrip, verification]
---

# AI-transcribed score meter and rebar review

A bar sum can be structurally correct while the inferred meter is musically wrong.

## Check

1. Preserve the original part/note/voice inventory, intended visibility, pitches, durations and ties. Establish source-audio or annotation provenance, approved beat/bar boundaries, target meter and authorized edit scope. An unsupported meter preference is not rhythmic evidence.
2. Build an absolute musical timeline for each voice/staff under the active divisions. Duration advances the cursor except for chord tones, which share their onset and must not be counted again. Account for backup/forward movements; they must respect measure boundaries and changes in divisions rather than being copied blindly into repartitioned bars.
3. Compare per-voice timelines with the approved bar capacity and boundaries. Inspect pickups, changing meter, rubato and tuplets separately; use durations/time-modification rather than visual note types alone. Flag unresolved passages instead of making every measure 4/4 or deleting events to balance totals.
4. Propose only boundary changes grounded in the approved evidence. When a sustained event crosses a boundary, preserve total duration, pitch and voice and maintain paired sound tie start/stop independently of notated tied endpoints, including applicable pass context. Neither tie representation substitutes for the other.
5. Reconcile before/after event and per-voice duration ledgers, chord onsets, backup/forward positions and both tie representations. Structural sums prove consistency only. Unapproved or uncertain beat interpretation remains for the owner; do not claim listening, playback or restored rhythm from supplied XML alone.

## Report

Give approved boundaries and provenance, per-voice cursor/duration checks, a proposed boundary/edit ledger, preserved event/tie inventory and uncertain ranges needing review. Distinguish owner-approved timing, computed structure and actual observations. Without source or approved beats, report structural findings and request the missing evidence before recommending rhythmic rebar.

Contracts: MusicXML 4.0 [duration](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/duration/), [backup](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/backup/) and [tie](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tie/).
