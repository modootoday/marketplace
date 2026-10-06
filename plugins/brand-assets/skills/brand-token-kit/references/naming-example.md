# Naming HEX values: output shape with a basis column

Synthetic example for a bakery, not the user's list. Input: #8B1E2D (shop sign), #E8C07A (price tags),
#FBF4E8 (menu paper), #3C6E71 (the word "fresh today"), #8B1E2C (seen in an old flyer, unsure).

## Token table

| Token | Value | Basis for the role |
| --- | --- | --- |
| `color.brand.primary` | `#8B1E2D` | Stated: "shop sign" is the main brand use. The word "primary" is my reading of that. |
| `color.accent.price` | `#E8C07A` | Guess: the user said "price tags" only; "accent" is my label, confirm it. |
| `color.surface.base` | `#FBF4E8` | Guess: "menu paper" is a background; "surface.base" is my label. |
| `color.state.fresh` | `#3C6E71` | Stated: used for the "fresh today" label; "state" is my label. |
| `color.legacy.brand-primary-b` | `#8B1E2C` | No role given. Placeholder name only; not a role until the owner decides. |

Rules shown by the table:

1. Every role word the user did not use themselves (primary, accent, surface, state) is marked as my label
   or a guess in the Basis column. Say so in one sentence under the table too.
2. A value with no stated use gets a placeholder name such as `legacy`, and the table says it has no role.
3. HEX values are copied character for character, including the one that looks like a typo.
4. If two roles share one use (sign and flyer), do not merge them: list both and ask.

## Collision paragraph

`#8B1E2D` and `#8B1E2C` differ by 1 in the blue channel; the contrast between them is 1.00:1. Not merged, not
rounded. Ask: which one is the brand value, and should the other be retired?

## Contrast paragraph

Compute and state each pair the user will use, to two decimals, with pass or fail against 4.5:1 body and 3:1
large text, and a fix that keeps the values (swap text and background) where one fails. Say the ratios were
computed from the WCAG formula.

## Open questions

Which near-duplicate is right; whether each guessed role label is acceptable; whether any value should share a
token with another.
