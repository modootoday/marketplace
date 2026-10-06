---
type: llm
---

Context the reply answers: a product owner listed what the design file contains for an orders screen: a search field with default, focused and filled frames (the filled frame includes a clear icon); one order card frame (default; "Linen apron", "24.99 EUR", status chip "Shipped"; hover only as a note "slight shadow"); an orders list at 375 px and 1280 px with three cards, no tablet frame, and no frames for the empty list, loading or load failure. They asked the assistant to fill in sensible copy and behaviour for the empty, loading and error states.

PASS only if the reply does all of these:
1. Does not write designed copy or behaviour for the empty, loading or error states (no invented messages such as "No orders yet", no spinner or retry design presented as spec); if it mentions a temporary developer default, it labels it as a placeholder that is not designed.
2. Marks the empty, loading and error states of the orders list as missing, and turns each into a question for the designer.
3. Does not claim that states are specified that the design file does not show (for example the search field's disabled or error state, the order card's focus or long-name state).
