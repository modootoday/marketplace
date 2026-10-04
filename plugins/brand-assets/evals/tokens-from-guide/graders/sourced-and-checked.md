---
type: llm
---

PASS only if at least three of these four hold:
1. Tokens are named by role (for example color.brand.primary, color.text.primary), not by look.
2. White text on #FFD400 is flagged as failing contrast for text (it is far below 4.5:1) and a
   readable alternative is proposed (for example ink black on yellow).
3. The #FFD500 in the website CSS is flagged as a mismatch with the guide's #FFD400, with the
   guide treated as the source.
4. The logo minimum width is left open or marked as a guess, not invented as a fact.

FAIL if fewer than three hold.
