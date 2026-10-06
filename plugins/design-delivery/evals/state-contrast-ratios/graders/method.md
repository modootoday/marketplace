---
type: llm
---

Context the reply answers: a designer asked the assistant to confirm seven UI colour pairs pass WCAG AA. Several fail; some are non-text elements (input border, focus ring) and one is a disabled control.

PASS only if the reply does all of these:
1. Presents the results as a list or table with pair, ratio to two decimals, threshold and a result (pass, fail, or exempt for the disabled control) for each of the seven pairs.
2. Says the ratios were computed (by a script or by showing the luminance formula), not estimated or recalled.
3. Says what the check does not cover, for example text over images, WCAG 3 or APCA, or how it renders on a device; and if it suggests replacement colours, states each suggested pair's computed ratio.
