---
name: musicxml-written-sounding-pitch-roundtrip
description: Check MusicXML written, sounding and linked tablature pitch against an explicit transpose and octave reference across import and export. Use when notation looks unchanged but a linked tab staff or sounding octave changes after a roundtrip. Not for inferring transposition from instrument names or judging audio that was not observed.
metadata:
  tier: open
  level: L3
  domain: music-notation
  install: optional
  keywords: [MusicXML, notation, import, roundtrip, verification]
---

# MusicXML written and sounding pitch roundtrip

Equal note spelling does not prove equal sounding pitch, and unequal spelling need not mean different sound.

## Check

1. Preserve original and returned part, staff, measure and note identities, durations and intended visibility. Match corresponding musical events before comparing values; unrelated or intentionally hidden parts stay intact.
2. Establish each staff's explicit written-to-sounding reference, including chromatic transpose, octave-change and any documented display-octave convention. Record the convention and tool/version/options. An instrument name such as bass is not an offset specification.
3. Convert written pitch to a common sounding semitone value under that supplied convention. Keep written spelling, alteration and octave alongside the canonical value; distinguish equivalent spelling from an octave or accidental mismatch. Do not double-apply a transpose already included in supplied sounding values.
4. Derive tablature sounding pitch from the supplied tuning/string/fret or explicit reference, not staff height alone. Compare original versus returned notation and tab separately, then check the linked event correspondence.
5. Locate the affected staff and offset before proposing an edit. A tab-only octave error does not authorize transposing the whole part. Verify a proposed correction against the same explicit reference and saved artifact; audio playback is an additional observation, not something arithmetic proves.

## Report

Per matched event: part/staff/measure/note, written pitch, transpose/octave basis, canonical sounding value, tab reference/value, original/returned difference. Every corrective proposal includes comparison of the saved original and corrected artifacts against the same explicit sounding reference before acceptance, preserving unaffected notation and event linkage. Separate computed consistency, supplied playback observations and unknown references. Without a transpose or tab basis, leave that comparison unresolved and request it.

Contract: [MusicXML 4.0 transpose](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/transpose/). Historical linked-staff report: [MuseScore 23499](https://github.com/musescore/MuseScore/issues/23499); no current fix or audio result is asserted.
