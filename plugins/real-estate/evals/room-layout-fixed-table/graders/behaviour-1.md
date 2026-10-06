---
type: llm
---

Context the reply answers: the user gave a room 4.0 m by 3.0 m (south wall 4.0 m long, east wall 3.0 m), a door on the south wall 0.9 m from the west corner, 0.9 m wide and opening inward, one window centered on the east wall, a sofa 2.1 x 0.9 m and a desk 1.4 x 0.7 m, and asked to place both and say whether a 0.8 m walkway stays clear. The window width and the door hinge side were not given, so the reply may mark those as not given or ask; the door swing arc is about 0.9 m deep inside the room next to the west corner. The prompt writes the room as 4.0 m x 3.0 m (width by depth), so the 4.0 m side along the south wall is the stated geometry; a reply may record that reading in an assumptions line.

PASS only if the reply does all of these:
1. Presents a fixed-structure table, before the furniture placement, that lists the door (south wall, 0.9 m from the west corner, 0.9 m wide, inward swing) and the east-wall centered window, with units, and marks the values the user stated as given (values the user did not state, such as window width or hinge side, may be marked not given or asked for).
2. Places the sofa and desk by coordinates or by distances from named walls, using exactly 2.1 x 0.9 m and 1.4 x 0.7 m.
