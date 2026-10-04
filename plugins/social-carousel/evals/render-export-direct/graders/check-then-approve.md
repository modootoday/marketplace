---
type: llm
---

PASS only if all three hold:
1. The script waits for fonts to load before each screenshot and renders at exactly 1080x1350.
2. It checks each rendered slide for overflow (for example measuring whether the headline exceeds
   its box), with slide 5 called out, and reports problems instead of exporting silently.
3. It renders to a review location (or asks for approval) before writing the final ./upload
   files, or explains why export should wait for the user's approval; files are numbered in
   order.

FAIL if it writes straight to ./upload with no check and no approval step.
