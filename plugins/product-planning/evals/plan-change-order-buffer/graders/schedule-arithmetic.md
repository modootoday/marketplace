---
type: llm
---

Context the reply answers: the user gave a ticketing-tool migration with hard deadline end of week 8 and a rule to keep a 2-week buffer. Tasks: export 2 (no predecessor); config 3 (no predecessor, one engineer); training 2 (after config, one trainer); cutover 1 (after training and export). Change request adds a 4th team: export-4 2 weeks, config-4 2 weeks after config (same engineer), training-4 1 week after config-4 and after training (same trainer), cutover still after everything. Worked values: original critical path config 3 + training 2 + cutover 1 = 6 weeks, float 2 weeks equal to the buffer, so no shortfall; with the change, config 3 + config-4 2 + training 2 (starts week 3, runs alongside config-4) then training-4 1 after both, cutover 1 gives 3 + 2 + 1 + 1 = 7 weeks (config 3, config-4 ends week 5, training ends week 5, training-4 ends week 6, cutover ends week 7), float 1 week which is 1 week short of the 2-week buffer. Extra effort 2 + 2 + 1 = 5 person-weeks, 5,000 at the stated rate.

PASS only if the reply does all of these:
1. Computes the original critical path as 6 weeks through config, training and cutover, shows it as a sum, and says the 2 weeks of float exactly meet the 2-week buffer.
2. Computes the plan with the 4th team as 7 weeks (ending week 7, accepting a shown path with the same result), and says the buffer is short by 1 week (1 week of float against the 2 required), instead of saying the plan still fits.
3. Treats the one engineer and one trainer as dependencies (config-4 after config, training-4 after training) rather than running those tasks in parallel.
4. Has a coverage check that every deliverable (export, configured tool, trained teams, cutover) has a task, and no invented task owners (roles or "to be assigned").
