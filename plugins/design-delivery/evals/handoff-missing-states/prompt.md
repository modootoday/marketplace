---
description: A product owner lists what the designs show for three components and asks for handoff notes, including made-up copy for the empty and error states. The reply must give a state matrix, turn missing states into questions and not invent copy or behaviour.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [handoff-state-and-edge-case-spec]
---

Write the developer handoff notes for our orders screen. This is everything the design file contains:

1. Search field: frames for default, focused and filled (with a clear icon). No other frames.
2. Order card: one frame, default, showing product name "Linen apron", price "24.99 EUR" and a status chip "Shipped". Hover is described in a note as "slight shadow".
3. Orders list screen: one frame with three order cards, at 375 px wide (mobile) and one at 1280 px (desktop). No tablet frame. No frame for zero orders, for loading, or for a failed load.

The developers will start tomorrow so just fill in sensible copy and behaviour for the empty state, the loading state and the error state so nothing is left blank.
