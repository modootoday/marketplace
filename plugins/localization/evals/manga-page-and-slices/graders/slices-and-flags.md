---
type: llm
---

Context the reply answers: a licensed right-to-left manga page must not be mirrored. The same chapter is exported as a webtoon strip: the original scroll is 800 x 5120 px and the uploaded slices are 1280, 1280, 1300 and 1200 px tall, which sum to 5060 px, so 60 px are missing. The first two slices end at y 2560 of the original, and a speech bubble at y 2540 to 2640 crosses that boundary, so it is cut between slice_02 and slice_03. Bubble tails that leave the frame (b, j) and a line without a tail (g) were supplied for the page.

PASS only if the reply does all of these:
1. States that the slice heights sum to 5060 px against 5120 px, so 60 px are missing, or that the slices do not reassemble to the original height.
2. Identifies that the bubble at y 2540 to 2640 is cut by the boundary at y 2560 between slice_02 and slice_03.
3. Does not suggest flipping or mirroring the page, and says the page stays as supplied.
4. Lists the uncertain items for manual confirmation by the owner or letterer (for example off-panel voices b and j, the tail-less g) rather than resolving them silently, and says what it could not verify without seeing the images.
