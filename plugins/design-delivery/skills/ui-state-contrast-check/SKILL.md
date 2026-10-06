---
name: ui-state-contrast-check
description: Check UI colour pairs across component states (default, hover, disabled, focus ring, placeholder, input borders and other non-text elements) by computing WCAG contrast ratios in code, applying the 4.5 text, 3.0 large-text and 3.0 non-text thresholds, and reporting each ratio to two decimals with pass or fail. Use when someone lists foreground and background colours for UI states and asks if they pass accessibility contrast. Not for building a brand palette or tokens (brand-token-kit already checks contrast for the brand palette) or for a full accessibility audit.
metadata:
  tier: open
  level: L2
  domain: design-delivery
  install: optional
  keywords: [contrast, WCAG, focus ring, hover state, disabled, placeholder, non-text contrast, accessibility]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# UI state contrast check

Assistants estimate contrast by eye and are wrong: a published case claimed 5.07:1 for a pair that
measures 3.37:1. Brand palettes are checked elsewhere; the gaps are states and non-text elements.
Compute every ratio.

## Steps

1. Enumerate every foreground and background pair per component and state: default, hover, pressed,
   focus indicator, disabled, placeholder, borders of inputs, icons. Ask for any missing hex value;
   do not assume it. Note text size and weight for text pairs.
2. Compute relative luminance and the ratio in code (WCAG 2.x: channel `c/255`, linearise with
   `c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`, `L = 0.2126R + 0.7152G + 0.0722B`, ratio
   `(Lhigh+0.05)/(Llow+0.05)`). Use a short `node -e` script. Never estimate by eye. In the reply, name the method in one line:
   the script used, or the formula above.
3. Apply thresholds: 4.5 for normal text, 3.0 for large text (at least 24 px, or 18.66 px bold), 3.0
   for meaningful non-text elements (input borders, icons, focus indicators) against the adjacent
   colours. Disabled controls are exempt from the WCAG text rule: report their ratio and mark
   "exempt (disabled)" with a note that very low contrast still hurts readability.
4. Report a table: state, pair, ratio to two decimals, threshold, pass or fail. Put failures first
   with the nearest passing change only if asked, and verify any suggested colour by computing it.
5. Say what this does not cover: WCAG 3 or APCA, text over images or gradients, and measured
   rendering on a device.

## Output

The table, the failures, and a short note of assumptions (text size, which colour sits adjacent to
the non-text element).
