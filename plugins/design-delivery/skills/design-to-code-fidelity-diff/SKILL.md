---
name: design-to-code-fidelity-diff
description: After code is generated or written from a design file or design-tool connector, compare the built values (colour, type size, spacing, radius, component used) with the design's values per component in a table with expected, built and token name, flag hard-coded values where a token exists and substitute components, and stop on any node whose design data did not load instead of guessing styles. Use when a developer or agent has built UI from a design and asks if it matches. Not for planning a build from a wireframe (prototype-from-wireframe) or reviewing a screenshot of finished assets.
metadata:
  tier: open
  level: L2
  domain: design-delivery
  install: optional
  keywords: [design to code, fidelity, design tokens, Figma, connector, spacing, typography, component substitution]
  verified-runtimes: [codex-cli]
---

# Design-to-code fidelity diff

Code generated from a design often looks close and is off in the details: a 15 px size becomes 16,
a token colour becomes a nearby hex, a design-system component is replaced by a custom div. When
the design connector fails, models keep going and invent styles. This skill compares values and
refuses to guess.

## Steps

1. Confirm the design data loaded for every node in scope. If a node's fetch failed (403, token
   limit, empty result), mark it `design data not loaded`, give no expected values for it, and say
   what is needed (access, a smaller selection, the values pasted). Do not style it from a guess.
2. List the design values per node as given: colour (with token name), font size and weight, line
   height, padding and gap, radius, and the design-system component used.
3. List the code values per component from the code supplied.
4. Build one table per component: property, expected (design), built (code), token name, verdict
   (match, differs, hard-coded where a token exists, not comparable). Compare numbers exactly: 15
   against 16 differs. Compare colours as hex values.
5. List components built from custom markup where the design uses a design-system component.
6. Summarise: counts of matches and differences, the highest-visibility differences first, and the
   nodes that could not be compared. Say what the diff does not cover (interaction states,
   responsive behaviour, rendering in a browser) unless those values were supplied.

## Output

The per-component tables, the substitution list, the list of nodes not loaded with what is needed,
and a short statement of what was and was not compared. Do not edit code unless asked.
