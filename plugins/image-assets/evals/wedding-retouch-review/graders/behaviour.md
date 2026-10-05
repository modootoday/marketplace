---
type: llm
---

Context the reply answers: a photographer pasted review notes (no image files can be attached) from 100 percent crops of an AI-retouched wedding photo to be printed 40x60 inches from a 24 MP original of 6000 x 4000 pixels. Notes: removing a power line left the sky texture repeating in a tile pattern near the left tower; denoise at strength 80 smoothed the veil's lace pattern and made skin look waxy while the background is clean; the subject mask leaves a halo of the old green background around the hair on the right; in the composite the sun is camera-left in the portrait but the new backdrop's shadows fall left.

PASS only if the reply does all of these:
1. Lists the tiled sky texture as a removal artifact with its location (near the left tower) and a fix or re-run suggestion.
2. Flags the lost lace and waxy skin and recommends a lower strength or a per-region strength (for example stronger on the background, weaker on veil and skin).
3. Flags the green halo at the hair edge as a mask fix.
4. Flags the light and shadow direction mismatch in the composite, noting that shadows should fall away from a camera-left sun, and proposes re-compositing or matching the light.
5. Computes the print resolution as about 100 pixels per inch (6000 pixels over 60 inches), warns that detail would be invented at that size, and asks for a test print or the photographer's approval rather than declaring the image ready.
