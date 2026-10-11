---
name: tts-subtitle-sync
description: Create audio-timed Korean captions or screen cues with spoken/display mapping and SRT, WebVTT and frame-numbered exports. Use when the user requests alignment of supplied known narration text with an identifiable voice track.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  approval: scripts
  locales: [ko]
  keywords: [subtitles, Korean captions, forced alignment, TTS timestamps, SRT, WebVTT, Remotion]
  requires:
    bin: [python3]
    capabilities: [speech.align]
---

# Subtitles timed to Korean speech

## Applicability

Continue only when the user requests timed captions, speech alignment or voice-timed screen
cues for known Korean narration text and an identifiable audio take. Having a script and
track alone does not make this workflow applicable.

If the request is to discover words from unknown speech, stop this timing workflow. Request
the recording or perform transcription with an available suitable tool; preserve that task.
Do not replace it with a request for an existing transcript, authored display/spoken pairs or
alignment. If a timing request lacks text or audio identity, ask only for the missing inputs
needed for that timing request. Apply the procedures below only after this branch qualifies.

Two Korean problems break generic subtitle tools: the voice reads a time written in digits as
words, so the audio and the screen text differ, and a line broken inside an eojeol reads wrongly.
Time on the spoken text, show the display text, and break only between eojeol.

## 1. Keep display and spoken text as pairs

Write the script as an ordered JSON list of pairs, `{"display": ..., "spoken": ...}`, one pair per
phrase (voice-script-writing produces these). Keep a changed phrase (a number, a unit, an English
word) as its own pair and split unchanged text into short pairs, so most units are single eojeol.
Korean examples are in `references/pairs.ko.md`.

The spoken side is what the TTS reads and what the aligner sees; numbers, units and English are
written out in Korean there.

## 2. Get timings on the spoken text

Prefer the first route that applies:

| Route               | Use when                                                                             | Measured on Korean (27 eojeol, known onsets)                                                                        |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| TTS alignment       | the TTS returns per-character times (ElevenLabs with-timestamps, eleven_v3 included) | median 40 ms, worst 110 ms                                                                                          |
| Forced alignment    | any other voice, including self-hosted and recorded ones                             | median 34 ms; 3 of 27 eojeol off by 0.3-1.8 s, every one flagged by low confidence                                  |
| ASR word timestamps | nothing else is available                                                            | median 290 ms, 20 of 27 off by more than 200 ms: it writes times and prices as digits, not as spoken, and mis-hears |

Forced alignment: `python3 scripts/align_ctc.py voice.wav spoken.txt --out timings.json` aligns
the audio to the exact spoken text on CPU (Apache-2.0 Korean wav2vec2 model by default). It lists
low-confidence words; listen to those and fix their times by hand or re-time them with the TTS
alignment. Loanwords and single-syllable words are the usual ones. On natural sentences it agreed
with the TTS's own alignment within 30 ms median, 101 ms worst.

## 3. Build the subtitles

```
python3 scripts/subtitles.py pairs.json timings.json --out subs --fps 30 --max-chars 18
```

It maps timings back to the display text (a changed pair stays one unit), breaks lines only
between eojeol, closes a cue at sentence ends and at pauses over 0.6 s, keeps two lines at most,
extends very short cues without overlapping the next, and writes `subs.srt`, `subs.vtt` and
`subs.cues.json` (seconds and frame numbers).

## 4. Time motion

Read `subs.cues.json` in the renderer (remotion-explainer when installed): start each text or
animation at its cue's `startFrame`. Do not hand-type frame numbers.

## 5. Check

Watch the result with sound on at normal speed, and at the flagged words. Read every line for a
break inside an eojeol or a particle stranded on its own line.

## Cue and screen-event identity

Bind pairs, alignment and cues to the exact audio/script revision. Check every intended spoken unit is accounted for once and every display unit has its intended spoken source; omit intentional silent display text only with an explicit screen-only event. Derive subtitles and meaning-linked screen events from the same cue IDs and convert audio-local time to project time once. A changed take invalidates old alignment even when its filename is unchanged. After export, verify the saved subtitles and screen reveals against the exact media; generating valid SRT is not proof of synchronization.
