---
name: musicxml-repeat-playback-path-audit
description: Compare MusicXML repeat and jump navigation with an approved measure-visit sequence and supplied playback evidence, including context-dependent Fine termination. Use when D.C., D.S., Coda or repeat symbols survive import but playback skips or stops incorrectly. Not for score composition or declaring playback correct from schema or glyphs alone.
metadata:
  tier: open
  level: L3
  domain: music-notation
  install: optional
  keywords: [MusicXML, notation, import, roundtrip, verification]
  verified-runtimes: [codex-cli]
---

# MusicXML repeat playback path audit

Navigation symbols and executable playback instructions can disagree after import.

## Check

1. Keep the original and returned artifacts distinct. Inventory intended parts, measure IDs, notes and intended visibility; a hidden part is not automatically missing content. Record application/version, import and playback settings, including any infer-repeat option.
2. Read repeat/ending boundaries and sound navigation instructions: dacapo, dalsegno, segno, tocoda, coda, fine and time-only where present. Reconcile visible directions with those instructions; do not assume a glyph or default inference option defines the executed path.
3. Obtain the owner's expected ordered measure visits, repeat passes and jump context. Fine can terminate on a return without terminating the first traversal. Label inferred paths as hypotheses when the intended context is missing.
4. Compare the expected sequence with the observed import/playback sequence, including visit multiplicity, jump target and actual stop. Locate the first divergence and any missing return, extra repeat or premature/late termination. A final measure count without order is insufficient.
5. For a proposed correction, preserve note/part inventory and change only the affected navigation. Reinspect the saved instructions and repeat the same bounded playback observation under recorded options; do not claim the correction ran when only proposing it.

## Report

Show expected and observed measure-visit sequences with jump/pass/termination context, the first divergence, relevant source versus returned instructions, and unobserved branches. Limit a match to the supplied artifact, application/version and settings; unknown playback remains unverified.

Contract: [MusicXML 4.0 sound](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sound/). Historical import report: [MuseScore 33801](https://github.com/musescore/MuseScore/issues/33801), not proof of current release behavior.
