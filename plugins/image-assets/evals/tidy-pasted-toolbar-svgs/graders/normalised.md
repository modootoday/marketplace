---
type: llm
---

Context the reply answers: tidying three pasted SVG icons (a document outlined on a 32 grid with stroke 2.5 and hard-coded #333, a filled-and-outlined record dot on a 24 grid with off-grid coordinates 12.4/11.7, and a minus on a 24 grid that embeds a base64 PNG and uses black strokes of 1.5), with editor metadata, a gradient defs block and the same id "a" used three times, into one set for 16 to 24 px in light and dark mode.

PASS only if the reply:
1. Puts all three on one grid and one rule set: the same viewBox (0 0 24 24 or a stated size) with a safe margin, one drawing style for the whole set (all outlined with one stroke width and one cap/join style, or all consistently filled; the record dot and the document must not differ in style), and aligned whole or half unit coordinates instead of 12.4/11.7.
2. Uses currentColor for stroke or fill instead of hard-coded #333 or black.
3. Removes the editor metadata comment, the unused gradient and the colliding ids, and removes the embedded raster image (the minus is drawn in vector).
