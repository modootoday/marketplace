---
name: brand-token-kit
description: Turn a brand's colours, type, logo rules and forbidden patterns into one tokens.json that every asset reads, with contrast checked and every value traced to a source. Use when the user wants to fix a brand's design rules in one file, set up design tokens for assets or slides, or keeps getting off-brand outputs. Not for building a full UI component library.
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

End with the open questions the brand owner must answer.
