---
name: rule-checked-puzzle-and-score-generation
description: Produce word searches, grid puzzles or short music notation by writing code or notation text instead of asking an image model, verify every target word at its listed coordinates or every bar against the time signature with the bundled checker, give the answer key as coordinates or a playable text form, report any failure, and render to a print format last. Use when a teacher or parent wants a printable word search, similar rule-bound puzzle or simple melody and image generation would put words or notes in the wrong places. Not for decorative images, for checking an AI image (see generated-asset-delivery-spec-check), for composing music of artistic quality or for GPU generation.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [word search, puzzle, answer key, music notation, ABC notation, time signature, printable worksheet]
  requires:
    bin: [node]
  approval: scripts
  verified-runtimes: [claude-code]
---

# Rule-checked puzzle and score generation

Image models draw puzzles that look right and are not. Anything with a rule (a word is in the grid, a
bar adds up) is generated as data or code and checked against the rule.

## Steps

1. Collect the rules: words, grid size, allowed directions, or key, time signature, bars and
   instrument. State any default you choose (for example no backwards words unless asked).
2. Generate as text, never as an image: a script that places words and fills the rest with letters,
   or notation text such as ABC. Place each word at row, column and direction, with 0-based
   coordinates stated.
3. Write the puzzle as JSON and run the bundled checker:
   `node scripts/check-puzzle.mjs puzzle.json`. A word search file has `grid` (array of strings) and
   `words` (each with `word`, `row`, `col`, `dir` one of E, W, S, N, SE, SW, NE, NW). A score file has
   `bars` (each an array of note lengths in beats) and `beatsPerBar`. Read the checker's output lines
   as the evidence. If you cannot run node, check each word by reading the letters at its coordinates
   and sum each bar by hand, show that working, and say the checker was not run.
4. Fix and rerun until every word and bar passes, or report the failure and what remains unplaced. Never
   report a pass for a word or bar you did not verify.
5. Give the answer key as coordinates (word, start, direction, end) and, for a melody, the bar-by-bar
   beat sums plus the notation text. Say the melody is checked for rule validity only, not for how
   it sounds.
6. Render to the print format last (HTML, PDF or plain text grid) from the verified data, so the render
   cannot change the content. Do not hand over an image as the only output.

## Output

The generator or notation text, the verified data file, the checker output, the answer key, any failures,
and the print version.
