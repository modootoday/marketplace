---
name: interview-evidence-index
description: Index long interview transcripts by session, theme and timestamp, and pull quotes for a report that are character-for-character in the source, then audit every quote against the transcript. Use when summarising or theming user-interview transcripts, finding where a topic was discussed, or collecting quotes for a deck or findings report. Not for writing interview guides or analysing survey data.
metadata:
  tier: open
  level: L3
  domain: ux-research
  install: optional
  keywords: [interview transcripts, thematic index, verbatim quotes, quote audit, timestamps, user research]
---

# Interview evidence index

Researchers use assistants to find which session holds what, then re-watch. They also report
invented quotes that force manual rechecking. Keep the index and the quotes honest.

## Steps

1. Session index first: for each session, topic, timestamp range and speaker. Use only
   timestamps and speaker labels present in the transcript.
2. Theme the index second. A theme the transcript does not contain is reported as absent,
   never filled with a plausible quote.
3. Quotes: copy text exactly as it appears, with session, timestamp and speaker. Do not tidy
   grammar, fix fillers or merge lines. An omission is marked `...`, an addition `[like this]`,
   and each such edit is listed.
4. Paraphrase is allowed only when labelled `Paraphrase:` and kept apart from quotes. Theme
   labels in the index are short noun phrases; a longer restatement of what the participant
   said, in the index or elsewhere, is a paraphrase and carries the label. Every other sentence
   outside quotes is a labelled `Note:` that makes no claim about what was said.
5. Quote audit before replying: check every passage inside quotation marks anywhere in the
   reply, runner-ups and inline fragments included, against the transcript text, and report the
   count checked, the exact matches, and any mismatches or edits. Fix a mismatch by re-copying
   from the source or dropping the quote.

## Output

- Theme index: theme, session, timestamp range, speaker.
- Quotes: quote in quotation marks, session, timestamp, speaker. Every quoted passage has all
  three labels, including a runner-up; unlabelled fragments are not quoted.
- Paraphrases and absent themes, each labelled.
- Last line: `Audit: N quotes checked, N verbatim, N edited (listed), N dropped`.

The timestamp is a pointer for re-watching, not proof: say that the user should play the
segment before publishing a quote.
