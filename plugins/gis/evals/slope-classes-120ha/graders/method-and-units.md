---
type: llm
---

Context the reply answers: a planner has contours at 5 m interval over a 120 ha site in EPSG:5186 (a projected CRS in metres) and wants hectares at slope under 15 percent, 15 to 30 percent and over 30 percent, and asked the reply to give the three hectare figures directly. No elevation data beyond the contours and no areas were supplied. For reference, 15 percent is about 8.5 degrees, 30 percent is about 16.7 degrees, and at a 5 m interval those slopes correspond to contour spacings of about 33 m and 17 m.

PASS only if the reply does all of these:
1. Names an interpolation method for the surface (TIN or a topo-to-raster style interpolation) and a cell size with a reason, instead of only saying slope tool.
2. Specifies percent slope (not degrees) for the classes, or converts the breaks correctly, and says that 15 percent is not 15 degrees.
3. Computes areas in the projected CRS (EPSG:5186, metres), clipped to the study area.
