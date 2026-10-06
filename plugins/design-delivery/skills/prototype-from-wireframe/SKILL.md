---
name: prototype-from-wireframe
description: Plan the move from a wireframe to a prototype in a design system - map every wireframe element to a named component of the system, flag elements with no matching component instead of inventing one, keep the system's tokens for colour, spacing and type rather than the wireframe's raw values, and check the prototype against the user journey. Use when someone pastes a wireframe element list and the design system's component and token names and wants a build plan. Not for generating images or the prototype itself, for visual critique of a shipped screen, or for changing the design system.
metadata:
  tier: open
  level: L2
  domain: product-design
  install: optional
  keywords: [wireframe, prototype, design system, component mapping, design tokens, handoff, user journey]
---

# Prototype from wireframe

A prototype that quietly invents components or hard-codes values cannot be built in the
real system. Map first, then build.

## Steps

1. Take the inputs as pasted: the wireframe elements per screen, the design system's component
   list, its tokens, and the user journey. Ask for any of the four that is missing; do not
   assume a component exists.
2. Build a mapping table, one row per wireframe element: screen, element, matched component
   (exact name from the list), variant or props, and a status of mapped, partial or missing.
3. Flag missing and partial rows in their own list with the reason (no list item matches, a
   needed state is absent). Propose the nearest existing component as a stand-in, labelled
   as a stand-in, and mark the gap as a decision for the design system owner. Do not
   create a new component or rename one.
4. Tokens: for every colour, spacing and type value in the wireframe, give the token name
   from the supplied list. A value with no matching token is flagged; never write a raw hex
   or pixel value into the plan as if it were a token.
5. Walk the journey step by step against the mapping and note which step needs a screen,
   state or transition the wireframe lacks (empty, error, loading).
6. State what was not verified: the plan is from pasted lists, no component was inspected
   in the real system.

## Output

Mapping table; Missing and partial list with stand-ins; Token table with unmatched values;
Journey gaps; Not verified. Read `references/mapping-example.md`.
