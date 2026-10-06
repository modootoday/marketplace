---
type: llm
---

Context the reply answers: the design file shows: search field default, focused and filled (the filled frame includes a clear icon); one order card default frame (hover as a note "slight shadow"); an orders list at 375 px and 1280 px, with no tablet frame and no empty, loading or error frames. The developers need handoff notes.

PASS only if the reply does all of these:
1. Gives a state matrix (table or per-component list) for the search field, order card and orders list, marking each state as specified, missing or not applicable, with default, focused and filled marked specified for the search field.
2. Marks the order card's hover as specified only by a note (shadow) with no values given, or asks for the shadow values, rather than inventing them.
3. Adds long-content rows (for example a long product name on the order card, long search text) as missing questions, and notes there is no tablet breakpoint frame, asking whether one is needed rather than assuming.
4. Ends with counts or a prioritised list of questions for the designer, and states that nothing beyond the supplied material was assumed.
