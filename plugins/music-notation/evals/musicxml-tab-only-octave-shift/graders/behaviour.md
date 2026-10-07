---
type: llm
---

Context the reply answers: Whole synthetic pitch sample T1 has one intended visible part P1 with notation staff S1 and linked tablature staff S2, event n1 in measure m1. Original and returned event IDs, durations and other content agree. Written notation is C4, supplied MIDI value60. The owner explicitly defines the entire written-to-sounding convention for this sample as minus12 semitones, including all octave/display effects. No extra transposition applies. Original notation sounding value48 and original tab independently supplied sounding value48 correspond to C3. Synthetic FixtureNotation 1.0 roundtrip report, import option preserve-linked-staves=true. These are supplied numeric observations, not audio recordings. Returned notation is still C4/MIDI60, but returned linked tab supplied sounding value is60. Displayed note labels alone look unchanged. What should be reviewed before editing? This is an empty read-only sandbox. The subject may read installed instruction documents but cannot run the application, inspect missing artifacts, change files or execute the described validation/playback. All observations are supplied synthetic fixture evidence.

PASS only if the reply does all of these:
1. Computes notation sounding48 and identifies returned tab60 versus original tab48 as a +12 semitone tab-only mismatch, not an error in the unchanged notation.
2. Keeps written pitch and sounding pitch/reference distinct; does not add another transpose to values already supplied as sounding.
3. Preserves matched part/staff/note/duration correspondence and proposes investigating the linked tab's reference or roundtrip mapping rather than transposing the whole part blindly.
4. Separates supplied numeric evidence from audio/playback and requires the same explicit reference and saved-artifact comparison for any proposed correction.
