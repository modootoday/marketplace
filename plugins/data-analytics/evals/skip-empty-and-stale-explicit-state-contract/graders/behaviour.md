---
type: llm
---

Context the reply answers:

Analyze synthetic macros before proposing a refactor. M1 processes each row: if blank skip; else result=2*x and store it in that row; global count increments for every processed row. M2: if blank store0 in that row; else result=2*x; global count increments for all rows including blank. Inputs[3,blank,0], initialcount5; previous cells[99,88,77]. Reconstruct exact outputs/count for both, identify how skipped stale cells differ from explicit0 and validzero, and propose a shared pure routine plus policy-driven callers without erasing differences. No execution or destructive edits.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. M1 outputs[6,88,0],count7; M2[6,0,0],count8, distinguishes skipped preserved88 from blank-zero and valid0.
2. Lists inputs, previous cells, initial count5 and write/count side effects explicitly. Does not invent a reset or overwrite the skipped88. No phrase about missing reset behaviour is required.
3. Proposes shared pure calculation or row planning with explicit state/outputs and policy-driven callers preserving each routine's blank-write and count effects. An explicit returned countDelta policy or independent countBlank parameter is acceptable; numeric zero must remain nonblank.
4. Checks blank/zero/normal rows by hand and does not claim executed regression/workbook modification.

Return only PASS or FAIL.
