---
type: llm
---

Context the reply answers: Whole synthetic percussion sample D1 has part P1, note n1 in measure m1 and an unchanged intended visible staff. Source score-instrument id I-SN names snare; midi-instrument id I-SN uses the owner-approved channel10 and unpitched map value39, which the approved target map identifies as snare. Note n1 explicitly references I-SN. Its unpitched display-step is D, display-octave5. Source rhythm and all unrelated content are to be preserved. Synthetic FixtureNotation 1.0 supplied playback report says snare. Returned note n1 still references I-SN; returned score-instrument and midi-instrument IDs both I-SN with the same approved channel10/map39. Display position remains D5 and supplied returned playback says snare. What aspects agree? This is an empty read-only sandbox. The subject may read installed instruction documents but cannot run the application, inspect missing artifacts, change files or execute the described validation/playback. All observations are supplied synthetic fixture evidence.

PASS only if the reply does all of these:
1. Follows n1's declared I-SN reference through matching score and MIDI definitions and confirms consistency with supplied channel10/map39.
2. Keeps displayed D5 separate from approved snare sound identity, rather than deriving snare from the staff position.
3. Compares original/returned note binding and supplied snare playback as distinct evidence and limits the match to this approved map and reported environment.
4. Preserves part/note/rhythm/unrelated content and does not claim personally executing or hearing playback.
