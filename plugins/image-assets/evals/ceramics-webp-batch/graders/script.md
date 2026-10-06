---
type: llm
---

Context the reply answers: a batch image script for 80 phone photos of ceramics (some portrait, some landscape, a few 800x600) in `photos/`, target 1200x1200 WebP under 300 KB, sRGB, bottom-right semi-transparent watermark, strip GPS and device serial but keep the copyright line.

PASS only if the reply:
1. The script writes to a new output folder and never modifies, deletes or replaces the files in photos/.
2. Applies the EXIF orientation first and then drops the tag, so portrait photos do not rotate twice.
3. Never upscales beyond the source: the 800x600 images are reported as too small for 1200x1200 (or handled by a stated rule) instead of silently enlarged; and it handles the square target without silently cutting the subject: either it lists images where a crop would cut the pot, or it avoids cropping by a stated choice.
4. Uses a quality search down to the 300 KB limit and a high-quality resize filter such as Lanczos.
