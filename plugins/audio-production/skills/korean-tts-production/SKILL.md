---
name: korean-tts-production
description: Produce Korean speech with a text-to-speech engine end to end - script prepared for reading, pronunciation fixes through the engine's dictionary or markup, synthesis in sentence-sized chunks, stitching with natural pauses, loudness to target, listening QA, and a record of the voice's licence. Use whenever Korean text is going to be read aloud by a TTS or AI voice - store or in-app announcements, narration, guides, ads, dubbing - including a quick question about whether a sentence with times, dates, floors, prices or months can go into TTS as written. Not for cloning a real person's voice.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [Korean TTS, speech synthesis, narration, pronunciation dictionary, SSML]
  locales: [ko]
---

# Korean TTS production

## 1. Script for the ear

Spell numbers, dates, units and English as they are spoken, split long sentences,
and mark pauses (voice-script-writing covers this when installed). Korean number
readings are the most common mistake; examples in
`references/readings.ko.md`.

## 2. Voice and licence

Choose a stock voice whose licence covers the use (commercial, broadcast,
advertising). Record the provider, voice id and licence terms. Never imitate a
real person's voice without their written consent.

## 3. Pronunciation

Fix names, brand words and abbreviations with the engine's pronunciation
dictionary or markup (SSML `sub` or phoneme where supported), not by
misspelling the script.

## 4. Synthesis

Synthesize sentence or paragraph chunks, not the whole script at once, so one bad
take can be redone. Keep the same voice, speed and settings for every chunk.

## 5. Assembly

Join chunks with pauses matched to punctuation (short for commas, longer between
paragraphs), trim leading and trailing silence, and normalise loudness to the
destination target.

## 6. Listening QA

Listen to the whole result. Check every number, name and English word against
the script, the intonation of questions, and clipping at joins. Redo only the
chunks that fail.

## Output

The audio file, its duration and measured loudness, the chunk list with any
redone takes, and the voice licence record.
