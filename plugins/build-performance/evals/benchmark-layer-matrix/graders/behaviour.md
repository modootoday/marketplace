---
type: llm
---

Context the reply answers: User requests a nonexecuting pnpm nested workspace benchmark matrix, fixtures excluded, dependencies preinstalled, five explicit states and timing boundaries; shared caches must not be deleted and OS cache is unmeasured.

PASS only if the reply does all of these:

1. Separates local cache empty with possible remote restoration, bypass with compiler state preserved, and rebuild-from-source with relevant output/incremental caches removed or isolated.
2. Keeps install/setup, runner graph preparation, actual tasks and end-to-end totals distinguishable and does not claim OS-cold measurement.
3. Includes a resolved root tooling input change and unaffected package control, respects fixture exclusions/shared cache custody, and reports correctness plus repeated timings/failures/order.
