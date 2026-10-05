---
type: llm
---

Context the reply answers: the user described an AI bakery ad: a very large white high-contrast serif headline on a dark brown band, a smaller rounded sans cream sub-line, a yellow circle badge on the right with bold sans price digits and tiny text under it, and a small footer strip; colours seen are cream, dark brown and yellow. The user cannot paste the image and wants the text and structure recovered to retype it. The user asked for text recovery only. Naming specific typefaces is allowed when each is explicitly labelled a candidate to check; stating one as the confirmed font is not.

PASS only if the reply does all of these:
1. Lists fonts only as candidates or style descriptions (for example a high-contrast serif, a rounded sans) and says the font is confirmed only against the source file or the client; it does not state a specific font name as the fact.
2. Lists the layout hierarchy in levels (headline, sub-line, price badge, footer) with position or relative size.
3. Gives the colours as approximate or estimated values and says the brand HEX values must come from the client or brand guide, not be assumed.
4. Says what could not be verified and gives a checklist for comparing against the original image; it generates no image and offers no redraw.
