---
type: llm
---

Context the reply answers: a user has two VBA macros and wants a shared function. Macro A reads Sheet1!B2:B50 and column C, skips rows where C = "cancel", writes tax = B * 0.1 rounded down into Sheet1 column D. Macro B reads the same range, skips "cancel" rows, writes tax = B * Rate, where Rate is a global variable set by another macro, rounded half up into Sheet2 column E, and sets Rate = 0 at the end of the run. Nothing can be executed in this conversation. The user asked for a shared function, what must be preserved, and how to check nothing changed.

PASS only if the reply does all of these:
1. Produces a table or list of conditions, inputs, outputs and side effects for each macro separately (not one merged description), including the different output sheet and column.
2. Calls out the rounding difference (down versus half up) and keeps it as a parameter or an outside step, not a single rounding rule in the shared function.
3. Flags Rate as global shared state: it becomes an explicit argument, and the reset to 0 at the end of macro B is kept as a side effect in B (not lost and not applied to A).
4. Keeps the "cancel" skip rule in both macros' behavior.
5. Specifies a before/after check with concrete sample rows (including a cancel row and a value that exposes the rounding difference, such as 25 with rate 0.1 or a half case) and says to compare the written cells from the original and refactored macros, and says it was not executed here.
