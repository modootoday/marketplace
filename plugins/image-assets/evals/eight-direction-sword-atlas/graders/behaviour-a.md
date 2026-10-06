---
type: llm
---

Context the reply answers: an 8-direction character atlas planned as N, NE, E, SE, S, SW, W, NW with the sword in the left hand. The delivered report says N sword L, NE sword L, E sword R, SE sword L, S sword L, SW sword L, W sword L, and NW identical to N. The assistant cannot see an image, only this text report. The user asks for an audit.

PASS only if the reply does all of these:
1. Flags the E frame as having the wrong handedness (sword in the right hand instead of the left).
2. Flags NW as a duplicate of N and notes that this leaves NW without its own art.
3. Warns that a W frame mirrored from E would invert the sword hand.
