---
name: voice-script-writing
description: Write or convert a script for listening rather than reading - numbers, dates, units and English spelled the way they are spoken, sentences that fit one breath, marked pauses, and a pronunciation list for names - for narration, ads, guides or text-to-speech. Use when the user asks for a voice-over script, narration, a podcast intro or text meant to be read aloud by a person or a TTS engine. Not for subtitles timing or audio editing.
metadata:
  tier: open
  level: L2
  domain: audio-production
  install: optional
  keywords: [voice script, narration, TTS script, read aloud, pronunciation]
  locales: [ko]
---

# Scripts for the ear

A listener cannot reread. Anything that needs the eye (a table, a parenthesis,
"see above", "3/4") fails when spoken, and a text-to-speech engine reads exactly
what it is given. Korean examples of every rule are in
`references/spoken-forms.ko.md`.

## Write it as it will be said

- **Numbers, dates, money, units, phone numbers** are written in the spoken form
  the speaker should use. Where Korean has two ways to read a number (native or
  Sino-Korean counting), choose and write it out. Ask when a reading is
  ambiguous (a model code, a version number).
- **English words and abbreviations** are written the way this audience says
  them, in Hangul when that is how they are spoken.
- **No symbols** that are not spoken: slashes, arrows, brackets, emoji, URLs.
  Say a web address only if the listener must use it, and say it slowly.

## Shape it for breath

- One idea per sentence; a sentence a speaker can say in one breath (about 40
  Korean characters or 15 English words is a useful ceiling, not a rule).
- Put the important word at the end of the sentence, where the voice lands.
- Repeat the key fact once at the end; listeners drift.

## Mark the delivery

- Pauses: a line break for a short pause, an empty line for a longer one, or the
  TTS engine's own break markup when the user names the engine.
- Emphasis: mark at most one word per sentence.
- Pronunciation list: every name, brand or term with how it is said, for the
  speaker or for the engine's dictionary.

## Timing

Estimate the length: Korean narration runs about 6 to 7 characters per second
at a calm pace, English about 2.5 words per second. Report the estimate and cut
if it exceeds the slot.

## Output

The spoken script, the pronunciation list, the length estimate, and a list of
every change made from the written original.
