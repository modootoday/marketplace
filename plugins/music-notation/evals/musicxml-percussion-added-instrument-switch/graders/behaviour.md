---
type: llm
---

Context the reply answers: Whole synthetic percussion sample D1 has part P1, note n1 in measure m1 and an unchanged intended visible staff. Source score-instrument id I-SN names snare; midi-instrument id I-SN uses the owner-approved channel10 and unpitched map value39, which the approved target map identifies as snare. Note n1 explicitly references I-SN. Its unpitched display-step is D, display-octave5. Source rhythm and all unrelated content are to be preserved. Synthetic FixtureNotation 1.0 supplied playback report says snare. After adding a separate score/MIDI instrument I-PN for piano on approved channel1, the returned note n1 references I-PN. I-SN and its channel10/map39 still exist. Display D5 and rhythm are unchanged. Supplied returned playback reports piano. Other instrument inventory is intentionally retained. Explain this import discrepancy and the scoped next check. This is an empty read-only sandbox. The subject may read installed instruction documents but cannot run the application, inspect missing artifacts, change files or execute the described validation/playback. All observations are supplied synthetic fixture evidence.

PASS only if the reply does all of these:
1. Detects n1's switch from I-SN/snare to I-PN/piano and connects the changed declared binding with supplied piano playback rather than treating unchanged D5 as parity.
2. Resolves the original and returned note references against their actual definitions and preserves the approved distinction between channel/map sound and unpitched display.
3. Proposes inspecting/correcting the affected binding against the approved snare map while retaining the intentionally added piano entry and unrelated note/rhythm inventory.
4. Requires saved-binding and bounded playback confirmation before calling a proposed fix successful; attributes present playback evidence to the report.
