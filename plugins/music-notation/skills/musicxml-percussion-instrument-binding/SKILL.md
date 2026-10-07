---
name: musicxml-percussion-instrument-binding
description: Audit MusicXML percussion note instrument references against score/MIDI definitions and an approved drum map, separating display position from supplied playback sound. Use when adding an instrument changes a drum sound while the staff looks the same. Not for inferring percussion identity from staff position or inventing a target sound map.
metadata:
  tier: open
  level: L3
  domain: music-notation
  install: optional
  keywords: [MusicXML, notation, import, roundtrip, verification]
  verified-runtimes: [codex-cli]
---

# MusicXML percussion instrument binding

An unpitched display location is notation, not the identity of the playback instrument.

## Check

1. Keep original and returned artifacts and their part/note identities. Inventory score-instrument and midi-instrument definitions and intended part visibility. Preserve unrelated instrument entries; a hidden part is not automatically lost content.
2. For each affected note, follow its instrument id to the declared score-instrument and matching MIDI definition. Check that the reference resolves within the intended part, is unambiguous and has not switched after an added definition. These declared references are not inferred entity matches.
3. Compare target MIDI channel/unpitched mapping and sound identity with the user's approved drum map. Keep unpitched display-step/display-octave in a separate column. Do not substitute a display position, instrument label or guessed channel for the target mapping.
4. Compare the saved note-level binding and the supplied or actually observed playback result independently. An unchanged graphic can coexist with a changed ID and different sound. A correct ID chain without sound evidence supports binding consistency only.
5. Propose the smallest binding correction supported by the approved map, preserving note rhythm, staff display and unrelated definitions. Reinspect saved references and require a bounded playback observation with application/version/options to confirm actual sound; do not invent it.

## Report

Per note: original/returned instrument IDs, resolved score/MIDI definitions, approved mapping/channel, display position, supplied observed sound and discrepancies. Name absent definitions, map or playback evidence as unresolved. Report observation provenance and scope rather than universal interoperability.

Contract: [MusicXML 4.0 percussion](https://www.w3.org/2021/06/musicxml40/tutorial/percussion/). Historical sound-switch report: [MuseScore 22954](https://github.com/musescore/MuseScore/issues/22954); open status does not prove a current defect.
