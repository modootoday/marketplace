---
type: llm
---

PASS only if all three fixes are given:
1. Wait for fonts before the screenshot (document.fonts.ready, or waiting for the font load), and
   load fonts from local files, explaining the wrong-font images as screenshots taken before the
   font loaded.
2. word-break: keep-all (with an overflow-wrap fallback) so Korean words are not split.
3. Measure the rendered title against its box and shrink the size in steps to a floor, then
   truncate with an ellipsis, instead of letting it overflow.

FAIL if any of the three is missing.
