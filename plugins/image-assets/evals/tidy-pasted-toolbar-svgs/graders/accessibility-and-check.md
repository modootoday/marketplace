---
type: llm
---

Context the reply answers: the same three-icon clean-up for a toolbar (document, record dot, minus) in light and dark mode at 16 to 24 px.

PASS only if the reply:
1. Gives each icon accessibility treatment and says which one it chose: role="img" with a title when the icon is meaningful, or aria-hidden="true" when decorative (an answer that offers both without choosing fails).
2. Says the result must be rendered at the real sizes (16, 20 and 24 px) on light and dark backgrounds, and that this render was not done in the reply (it does not claim the icons were tested visually).
3. Mentions optimising (for example with SVGO) and checking the result still renders the same.
