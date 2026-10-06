---
name: longform-narration-text-prep-and-proof
description: Prepare long text for synthetic narration and proof the result - separate main text from footnotes, citations and bibliography as the user chooses and flag every dropped or leaked part, mark pronunciation-risk tokens (names, numbers, dates, abbreviations) before synthesis with the chosen readings, and after synthesis compare the source text with the transcript to list omitted, repeated and misread spans with positions, plus chapter order, split-file sequence and speed or emotion mismatches. Use when someone turns a book, article or long PDF into a TTS audiobook or listening file and gives the text, the choice of what to read, or a transcript of the audio. Not for Korean spoken-number rules or sentence chunking (korean-tts-production) or for choosing a voice.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [audiobook, tts proofing, footnotes, pronunciation list, narration transcript]
  verified-runtimes: [claude-code]
---

# Long-form narration text prep and proof

Most of the time in a long synthetic narration goes into preparing the text and listening for
what went wrong. This skill covers both ends: what goes into the engine and what came out. It
never claims audio was listened to; it works from the text and the transcript the user gives.
For Korean numbers and chunking use `korean-tts-production`; for a script written for the ear
use `voice-script-writing`.

## Steps

1. Ask or confirm the reading choice: main text only, or with footnotes, citations or
   bibliography. Apply it per element and keep page and chapter order. List every dropped part
   (footnotes, headers, figure captions, reference list) so nothing disappears silently.
2. In-text markers and citations: with a main-text-only choice, footnote markers like [1] and
   inline citations such as "Smith 2004, p. 33" are not main text; flag them for removal or
   ask whether the user wants author-year citations spoken. State your assumption.
3. Pronunciation risks before synthesis (read `references/worked-example.md` for the table
   shapes): list each name, number, currency amount, date, unit, abbreviation and title (Dr.)
   with the risk and a proposed reading for every one, including names (a respelling marked
   "proposed, confirm"), never "not chosen". Keep it as a list reused for the whole book. Ambiguous formats need a question, not a guess: 3/4/2019 can be
   March 4 or April 3, and the reading depends on the user's locale. Ask for the source of a
   name's pronunciation when unsure.
4. After synthesis, compare the prepared text with the transcript sentence by sentence and list
   differences by span: text only in the source (omitted), text only in the transcript (added or
   leaked, such as a footnote), repeated spans, and misreadings, each with a chapter or
   timestamp position when given, or "position unknown". Write one row per differing span, never one row
   per sentence: normal expansions (Dr. to Doctor, $1,250 to a spoken amount, 3/4/2019 to a
   spoken date) each get their own row marked "expected expansion" when they match the chosen
   reading, or "misread" when they do not or the reading is not yet confirmed.
5. Check structure and always include it as its own section, even for one excerpt: chapter
   order and numbering against the source table of contents, the sequence of split files (no
   gap, overlap or swapped order, file names or timestamps in order), and speed or emotion that
   does not suit the passage. When only an excerpt was given, write the checks as a list to run
   on the full set and name what to send, instead of skipping them. Mark the spans to regenerate
   and whether the cut can be joined at a sentence boundary.
6. List what you could not check: the audio itself, pauses, voice consistency and loudness
   need listening.

## Output

The reading choice and dropped-parts list, the pronunciation list with chosen readings and open
questions, a transcript diff table (span, type, position, action), the structure checks, and
the regeneration list.
