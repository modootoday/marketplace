---
type: llm
---

Context the reply answers: a licensed right-to-left manga page, 800 x 1200 px, must not be mirrored. Panels: P1 top right, P2 top left, P3 wide middle, P4 bottom right, P5 bottom left, so panel order is P1, P2, P3, P4, P5. Twelve OCR lines a to l arrive in top-to-bottom, left-to-right scan order. Bubble positions put b, c in P1 (b at x 560 y 70, c at x 450 y 230); a, d in P2 (a at 90,60; d at 200,250); e, f, g in P3 (e at 600,450 is a narration box, f at 300,520, g at 60,600); h, i in P4 (h at 600,820, i at 480,1000); j, k, l in P5 (j at 250,830, k at 60,1020, l at 100,1120). Correct reading order is therefore b, c, a, d, e, f, g, h, i, j, k, l. Tails: a Mio, b leaves the frame, d Mio, c Ren, e none (narration), f Ren, g none, h Ren, j leaves the frame, i Mio, k Mio, l Mio. Cast: Ren (boy), Mio (girl).

PASS only if the reply does all of these:
1. Orders the bubbles by right-to-left reading within panel order P1 to P5 (b, c, a, d, e, f, g, h, i, j, k, l), and does not keep the raw scan order a, b, d, c, ...
2. Gives a table with panel, bubble, order, speaker and line type, attaching Mio or Ren only where a tail names them, and showing e as narration.
3. Marks b and j (tail leaves the frame) as unknown or off-panel speakers and g (no tail, ellipsis) as a possible thought or silence needing manual confirmation, instead of inventing a speaker.
4. Provides a brief for the translator that carries context (who is speaking to whom, the order, the bubble capacity), not just the list of lines.
