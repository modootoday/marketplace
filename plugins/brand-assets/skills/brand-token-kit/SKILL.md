---
name: brand-token-kit
description: Turn a brand's colours, type, logo rules and forbidden patterns into one tokens.json that every asset reads, with contrast checked and every value traced to a source. Use when the user wants to fix a brand's design rules in one file, set up design tokens for assets or slides, or keeps getting off-brand outputs, or has a list of HEX values to give role-based names with a collision and contrast check. Not for building a full UI component library.
metadata:
  tier: open
  level: L2
  domain: brand-design
  install: optional
  keywords: [design tokens, tokens.json, brand guidelines, colour palette, typography]
---

# Brand tokens

Off-brand assets usually come from a value retyped from memory: a blue that is
almost the brand blue, a font that is almost the brand font. One file that every
template reads removes the retyping.

## Gather before you write

Collect the sources: a brand guide, the logo files, the live website's CSS,
existing approved assets. Every token you write names the source it came from.
A value you had to guess is marked as a guess and listed at the end; do not
round a guess into a fact.

## The file

Write `tokens.json` with these groups, using names that say the role, not the
look (`color.text.primary`, not `color.darkBlue`):

- **color**: brand, text, background, surface, border, and state colours
  (success, warning, danger), each as hex, with the light and dark variant when
  the brand has both.
- **type**: heading and body families with fallbacks, sizes as a scale, weights,
  line heights. Record the licence of each font and where it may be used.
- **space and radius**: a short scale, not every value ever used.
- **logo**: files per background, minimum size, clear space, and what is
  forbidden (stretching, recolouring, placing on busy photos).
- **forbidden**: words, colours, image subjects or layouts the brand never uses.

## Check it

- Text and background pairs meant to be read together meet WCAG contrast (4.5:1
  for body text, 3:1 for large text). Report each pair with its ratio; a pair
  that fails is fixed or marked as not for text.
- Every font licence permits the uses listed (web, video, print).
- No two tokens hold the same value under different roles unless that is
  intended; say which.

## Naming colours from a list of HEX values

When the request is only to name some HEX values (no full token file), do this and stop:

1. Keep every HEX exactly as given, including the digit that looks like a typo. Never
   round, snap to a "nearby" colour or merge two values; a near-duplicate is reported,
   not fixed.
2. Name by role first, then a short stable suffix: `color.brand.primary`, `color.accent.warm`,
   `color.surface.base`, not "navy" or "sunshine". Put the role in the name and the HEX in
   the value, and add a second name only when the user asks for a vocabulary name. Roles
   come from how the user says each colour is used; with no usage given, say the role is a
   guess.
3. Collision check: two values in the list that differ by 1 to 3 per channel are one colour
   in two spellings or an error; list the pair, give the contrast ratio (about 1.0) and ask
   which is intended. Also check that no two names are the same after lower-casing.
4. Contrast pairs: compute the ratio for each text-on-background pair that will be used and
   mark pass or fail (4.5:1 body, 3:1 large text). State ratios to two decimals and say they
   were computed.
5. Keep the scale: when the values form a ramp, name steps in order (`color.brand.100` to
   `color.brand.900`) so adding a step later does not rename the others.

Say that colour names are a naming proposal from one source of requests, and that the brand
owner decides.

End with the open questions the brand owner must answer.
