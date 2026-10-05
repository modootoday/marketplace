---
type: llm
---

Context the reply answers: in PostGIS there are tables parcels(parcel_id, geom) and zones(zone_id, geom), both with GiST indexes, and the user wants a view giving each parcel the zone with the largest overlap. The SRIDs were not stated.

PASS only if the reply does all of these:
1. Defines the view with largest-overlap logic: joins on ST_Intersects (so the index is used), orders by ST_Area(ST_Intersection(...)) descending and takes one row per parcel with DISTINCT ON or a window function such as row_number.
2. States that both tables must share one SRID (or one is transformed explicitly) and that area is measured in a projected CRS.
3. Adds a one-row-per-parcel check (row count versus parcel count, no duplicated parcel_id) and says what happens to parcels with no intersecting zone (kept with a left join or dropped).
