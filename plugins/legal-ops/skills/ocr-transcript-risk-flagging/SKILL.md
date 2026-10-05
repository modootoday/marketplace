---
name: ocr-transcript-risk-flagging
description: Review OCR text of scanned records or an automatic transcript of poor-quality audio and produce a ranked list of risky spans (numbers, dates, doses, names, negations, speaker turns) with locator, original span and reason, without rewriting the text. Use when someone must rely on OCR or speech-to-text output where a single wrong digit, name or speaker would matter. Not for correcting the text, summarising it, or deciding what a record means.
metadata:
  tier: open
  level: L3
  domain: legal-ops
  install: optional
  approval: scripts
  keywords: [OCR, transcript, scanned records, review list, speech to text, audio evidence]
  requires:
    bin: [node]
---

# OCR and transcript risk flagging

Practitioners report that fixing many OCR errors in scanned records is slow and painful, and that
machine transcripts of poor audio put wrong words and wrong speakers into material people rely on.
A silently "cleaned" text hides exactly the spans a reviewer must look at, so this skill reports
risk instead of repairing text.

## Steps

1. Take the text as given. Do not rewrite, normalise or correct it anywhere in the reply, and do
   not paraphrase a flagged span. Quote the original span character for character.
2. Give every line, page, or timestamp a locator (page and line, cue number, or hh:mm:ss). If the
   input has none, count lines and say that is what you did.
3. Read `references/value-types.md` (what each value type is compared against, ranking, candidate
   readings). If the input is in a file and node is available, run
   `node scripts/transcript-scan.mjs <file>` for a candidate list; if it cannot be run, do the same
   scan by hand. Scan for high-consequence spans first and rank them above ordinary typos:
   - numbers, amounts and doses, including units that do not fit the thing measured;
   - dates and times, including dates out of order or impossible for the document;
   - names of people, drugs, places and organisations;
   - negations and hedges (no, denies, not, without) that would change a meaning if lost;
   - speaker turns: a question and its answer from the same speaker label, one label acting in two
     roles, or a turn that does not follow from the previous one.
4. For OCR, look for look-alike character confusions inside a token (letter l or I for digit 1,
   letter O for digit 0, S for 5, B for 8, rn for m) and list the candidate readings as
   possibilities, not as the answer. For speech-to-text give no candidate readings: never offer
   similar-sounding words or numbers, and write "none given, the audio decides".
5. Run internal-consistency checks and report each failure with both locators: dates that go
   backward, totals that do not add up, a name spelled two ways. Also state plainly, as a flag and
   not a correction, when a value read literally is implausible for its unit or item, for example a
   single daily dose several times larger than any ordinary dose of that drug, and say what you
   compared it with and that a reference must confirm it. Do not soften this to "unconfirmed".
6. Where audio is unintelligible or a span has no recoverable reading, mark it `[inaudible hh:mm:ss]`
   or `[illegible p3 l7]` and leave it blank. Never fill in a plausible guess.
7. Say what you could not check: no source image or audio is available to you, so every item is a
   candidate for a person to confirm against the original.

## Output

A table sorted by risk: rank, locator, original span (verbatim), risk type, why it is risky,
candidate readings if any. Then a short list of internal inconsistencies, a list of
`[inaudible]` or `[illegible]` marks, and one line naming the reviewer step (compare each row with
the scan or recording). Do not state what the record means or what should be done about it.
