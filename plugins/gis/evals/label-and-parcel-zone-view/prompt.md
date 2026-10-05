---
description: A user wants a QGIS label with name and hectares that vanishes for NULL names, and a PostGIS view giving each parcel its zone of largest overlap. The reply must handle NULL, show sample rows, use largest-overlap logic and state CRS and cardinality.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [gis-expression-and-view-authoring]
---

My QGIS layer has fields NAME (text, may be NULL), AREA_M2 (double, square metres) and CLASS (text). I want labels like Pine Forest (1.2 ha) for a row with NAME Pine Forest and AREA_M2 12000, and no label at all when NAME is NULL. Separately, in PostGIS I have tables parcels(parcel_id, geom) and zones(zone_id, geom), both with a GiST index. I want a view that gives each parcel the zone with the largest overlap. Write both.
