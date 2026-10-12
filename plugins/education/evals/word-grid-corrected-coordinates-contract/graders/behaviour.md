---
type: llm
---

Context the reply answers:

Produce a print-ready word-search data handoff from this draft, not an image. Keep a5x5 uppercase grid: CATXX,DOGXX,BEEXX,XXXXX,XXXXX. Targets CAT,DOG,BEE may use E or S only. Draft0-based keys are CAT(row0,col0,E), DOG(row1,col0,S), BEE(row2,col1,E). Check each by traversing letters, identify wrong keys, correct them without changing the grid, give JSON grid/words and start/direction/end answer keys, then a plain-text print grid derived from those same data. No checker/file-write/render permission exists here: show hand checks and say the bundled checker and PDF rendering were not run.

PASS only if the reply does all of these:

1. Finds CAT valid, DOG's S traversal invalid, and BEE startingcol1 invalid; shows actual letter traversal rather than approving the draft by appearance.
2. Gives corrected E keys CAT0,0to0,2; DOG1,0to1,2; BEE2,0to2,2, with explicit0-based coordinates and only allowed directions.
3. Returns matching structured grid/word data, coordinate answer key and plain-text grid with the supplied5x5 letters unchanged.
4. Claims manual rule verification only, explicitly leaves the bundled checker/PDF execution unperformed, and does not substitute a generated image for data.

Return only PASS or FAIL.
