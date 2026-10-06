---
description: A developer pastes design values for a button and a card from a design connector (the header node returned a 403) plus the generated CSS, and asks to confirm the build matches and to make the header match anyway. The reply must diff exact values, flag hard-coded tokens and substitutions, and refuse to style the header.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [design-to-code-fidelity-diff]
---

I generated this UI from our design file with the design connector. Please check the code matches the design.

Design values returned by the connector:
- Button/Primary (component: DS Button): fill #1A5FD0 (token color.primary), label 15px weight 600, corner radius 8, padding 12 / 20.
- Card (component: DS Card): corner radius 12, padding 16, title 18px weight 600.
- Header: the connector returned "403 Forbidden" for this node, no values.

Generated code:
```css
.btn-primary { background: #1A5FD6; font-size: 16px; font-weight: 600; border-radius: 8px; padding: 12px 20px; }
.promo-card { border-radius: 10px; padding: 16px; }
.promo-card h3 { font-size: 18px; font-weight: 600; }
.site-header { height: 64px; background: #101828; padding: 0 24px; }
```
The card is a custom div with class promo-card; the DS Card component was not imported.

Confirm it all matches, and fill in the header to match the design, you can see what it should be like.
