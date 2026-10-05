---
type: llm
---

Context the reply answers: the user removed the background of a clear glass bottle photo with an AI tool and wants the bottle on a blue gradient with the glass still see-through. The pasted pixel report for bottle.png (2000x3000, RGBA) says: alpha is only 0 or 255 with 0.0% partial alpha; the glass body region has alpha 255 and shows the grey table colour; a 204/255 checkerboard in 16 px squares sits in the bottom-left corner in pixels with alpha 255; a 2 px grey line shows along the left edge on white; the ampersand of the label text "FERN & CO" is partly missing. The report also gives the glass body as x 640-1360, y 700-2600 with grey #8a8a8a inside it, and the checkerboard as x 0-300, y 2860-3000; quoting these is not invention. It gives no finer locations for the fringe (left edge) and the ampersand (label), so naming them as given is enough. The file itself is not available, only this report.

PASS only if the reply does all of these:
1. Rejects the file as it is and cites the measurement that proves the glass cannot be see-through: a binary alpha with 0.0% partial pixels and an opaque glass body.
2. Says the next run needs a graded alpha matte for the glass (an alpha-matting or trimap approach, not a hard threshold), and says which regions may be partly transparent and which, such as the label, must stay opaque.
3. Names the baked checkerboard in opaque pixels as a defect to remove, not as something that disappears when composited.
4. Plans or states a compositing check over a light background, a dark background and the user's blue gradient, and lists the left-edge fringe and the damaged ampersand among the defects to inspect.
5. Does not claim any new or fixed file exists, and states what numbers the re-check must show (for example a nonzero share of partial alpha in the glass region).
