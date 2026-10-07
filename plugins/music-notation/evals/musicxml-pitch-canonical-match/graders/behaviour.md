---
type: llm
---

Context the reply answers: Whole synthetic pitch sample T1 has one intended visible part P1 with notation staff S1 and linked tablature staff S2, event n1 in measure m1. Original and returned event IDs, durations and other content agree. Written notation is C4, supplied MIDI value60. The owner explicitly defines the entire written-to-sounding convention for this sample as minus12 semitones, including all octave/display effects. No extra transposition applies. Original notation sounding value48 and original tab independently supplied sounding value48 correspond to C3. Synthetic FixtureNotation 1.0 roundtrip report, import option preserve-linked-staves=true. These are supplied numeric observations, not audio recordings. Returned notation remains C4/MIDI60 and returned tab supplied sounding value is48. Is the note correspondence preserved? Show the useful comparison, without changing the score. This is an empty read-only sandbox. The subject may read installed instruction documents but cannot run the application, inspect missing artifacts, change files or execute the described validation/playback. All observations are supplied synthetic fixture evidence.

PASS only if the reply does all of these:
1. Computes notation sounding value60-12=48/C3 under the explicitly supplied complete convention, without adding a second octave offset.
2. Compares corresponding event n1 across original/returned notation and tab and finds all supplied sounding values48 agree while retaining written C4 separately.
3. Preserves part/staff/event/duration identity and limits the comparison to the supplied linked-staff sample and roundtrip settings.
4. Reports computed/supplied pitch consistency without claiming listened audio, app execution or universal roundtrip correctness.
