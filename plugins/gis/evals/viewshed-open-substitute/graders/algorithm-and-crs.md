---
type: llm
---

Context the reply answers: a user can no longer use the ArcGIS Viewshed tool. Their old run used a 10 m DEM in EPSG:5186, one observer point at 1.7 m, target height 0, maximum distance 5 km, curvature correction on (refraction setting not stated). They ask for a free tool and for confirmation that it will match their old outputs.

PASS only if the reply does all of these:
1. Names the analysis as a line-of-sight viewshed and carries every given parameter (10 m DEM, 1.7 m observer height, 0 m target height, 5 km maximum distance, curvature correction on) into a mapping to at least one named open tool's options, and flags the unstated refraction setting as unknown.
2. Checks the CRS: both tools must use the same projected CRS in metres (EPSG:5186 here), with observer coordinates and heights in those units.
