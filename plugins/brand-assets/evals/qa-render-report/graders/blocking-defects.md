---
type: llm
---

PASS only if all four hold:
1. The title is flagged as overflowing its box (1130 px in a 1080 px box), so it is clipped or
   breaks the layout.
2. The subtitle colour on white is flagged as low contrast for 22 px text (it is about 2.6:1,
   below 4.5:1).
3. The logo is flagged as distorted: 200x80 drawn at 120x60 changes the aspect ratio (2.5 to 2.0).
4. The asset is not approved for publishing while these remain; "The best coffee in Seoul" is
   flagged as a claim needing support, or at least questioned.

FAIL if any of the first three is missed or the asset is approved as is.
