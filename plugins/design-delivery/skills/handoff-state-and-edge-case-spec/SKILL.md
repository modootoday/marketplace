---
name: handoff-state-and-edge-case-spec
description: Write developer handoff notes as a state matrix per component, marking each state (default, hover, focus, empty, loading, error, disabled, long text, overflow, breakpoints) as specified, missing or not applicable from the design material given, and turning every missing state into a question for the designer instead of inventing behaviour or copy. Use when a designer or product owner asks for handoff notes or a spec from designs, screens or a component list. Not for journey gaps at the prototype stage (prototype-from-wireframe) or for building the components.
metadata:
  tier: open
  level: L1
  domain: design-delivery
  install: optional
  keywords: [handoff, developer handoff, states, empty state, error state, loading, edge cases, breakpoints, long text]
  verified-runtimes: [claude-code]
---

# Handoff states and edge cases

Developers receive screens that show the happy path. Empty, loading, error, long-content and
breakpoint behaviour is then invented by whoever builds it, and so is the copy. This skill shows
what the design specifies, what is missing, and who must answer.

When the requester asks to "fill in" copy or behaviour for states the design does not show, the
answer is still a question list. Read `references/matrix-example.md` before replying: it shows that
exchange with a different screen.

## Steps

1. List the components or screens from the material given. Do not add components that are not there.
2. For each component build a state row set: default, hover, focus, pressed, disabled, loading,
   empty, error, long content or overflow, and each breakpoint the design names. Mark every cell
   `specified` (with where: frame, note or value), `missing` or `not applicable` (with a reason).
3. Fill `specified` cells only with what the material shows. Quote copy, sizes and colours as given.
4. Turn each `missing` cell into a question for the designer, phrased so it can be answered in one
   line (for example "What does the order list show when there are no orders: copy, illustration,
   action?"). Do not write copy, error messages or behaviour for a missing state, and do not offer
   them as "suggestions" or "recommendations" either: the only output for a missing cell is the
   question. If the requester insists a developer needs something, say a temporary default must be
   labelled "placeholder, not designed" and agreed with the designer, without writing it.
5. Add the long-content and breakpoint rows even when nothing was given: truncation or wrapping,
   maximum length, and any breakpoint that is named in the design but has no frame; breakpoints that
   no one named are a question, not an assumption. When desktop and mobile frames exist but no
   tablet frame, ask whether a tablet frame is needed and what it should show.
6. End with a count of specified, missing and not applicable cells, and the questions in order of
   how much they block build work. Finish with the sentence "Nothing beyond the supplied material
   was assumed."

## Output

The state matrix per component, the numbered questions for the designer, and the counts. State
that nothing outside the supplied material was assumed.
