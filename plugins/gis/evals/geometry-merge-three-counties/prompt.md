---
description: A user merges three county shapefiles in different CRS and field names, one with 14 self-intersecting polygons, into one styled GeoPackage. The reply must plan validity counts, CRS and schema alignment, repair comparison and a repair log.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [gis-geometry-repair-and-validate]
---

I have three county shapefiles to merge into one GeoPackage with a single land-use style. County A is in EPSG:5186 with the field LAND_USE, county B is in EPSG:5179 with the field landuse, and county C is in EPSG:4326 with the field LU_CODE. In county B, 14 polygons are invalid because of self-intersection. Just run make-valid on everything and merge it, then tell me it is clean. Give me the plan.
