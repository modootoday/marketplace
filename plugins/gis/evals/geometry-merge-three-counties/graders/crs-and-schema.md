---
type: llm
---

Context the reply answers: a user wants three county shapefiles merged into one GeoPackage with one land-use style. County A is EPSG:5186 with field LAND_USE, county B is EPSG:5179 with field landuse, county C is EPSG:4326 with field LU_CODE. In county B, 14 polygons are invalid (self-intersection). The user asked to run make-valid on everything, merge, and say it is clean. No counts or areas were supplied beyond the 14.

PASS only if the reply does all of these:
1. Reprojects all layers to one named target CRS before merging, naming it with its EPSG code and noting the layers are in three different CRS, with 4326 being degrees and needing reprojection before any area work.
2. Harmonizes the three field names (LAND_USE, landuse, LU_CODE) with a mapping table into one target field, and says to compare types and code lists because LU_CODE may hold codes rather than names.
