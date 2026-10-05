---
name: gis-expression-and-view-authoring
description: Write a QGIS or ArcGIS label expression or a PostGIS spatial view against a stated schema - quote the exact field names, types and geometry column, handle NULL and type casts explicitly, test the expression on three sample rows with the expected output worked by hand, and for views state the SRID, index use, join cardinality and the one-row-per-key check. Use when someone asks for a label like name plus area in hectares, a conditional label, or a view that joins layers by spatial relation or largest overlap. Not for cartographic style design, for performance tuning of a whole database or for raster algebra.
metadata:
  tier: open
  level: L2
  domain: gis
  install: optional
  keywords: [qgis expression, label, postgis, spatial view, st_intersects, distinct on, null handling, srid, join cardinality]
---

# GIS expression and view authoring

An expression that works on the happy row and fails on NULL or on a double match is the usual
defect. Write it against the quoted schema and test it on rows before handing it over.

## Steps

1. Quote the schema back: each field with type, the geometry column, its SRID and units, and
   what NULL or empty means. If a name, type or SRID is missing, ask or state the assumption
   in one line. Area fields are taken in square metres only if the user says so.
2. Write the expression in the dialect named (QGIS expression, ArcGIS Arcade or SQL, PostGIS
   SQL). Handle NULL explicitly: in QGIS, concatenation with NULL gives NULL, so a label that
   must disappear for a NULL name can rely on that or use `if("NAME" is null, NULL, ...)`
   for clarity; a NULL number needs its own branch. Convert units in the expression (hectares
   are square metres divided by 10000), round with a stated number of decimals, and cast
   types (`to_string`, `::numeric`) rather than relying on implicit conversion.
3. Test on three sample rows: a normal row, a NULL name row and an edge value row (zero, very
   large, empty string). Write the input and the expected output for each, worked by hand, and
   tell the user to compare them with what their tool shows.
4. For a spatial view, state: the join predicate, the SRID of both tables (they must match; if
   not, transform one explicitly), whether the columns are in a spatial index (GiST) and that
   the predicate uses it, and the cardinality of the join (one parcel can touch many zones).
5. Pick one row per key on purpose: for largest overlap, order by the intersection area
   (`ST_Area(ST_Intersection(a.geom, b.geom))`) descending with a tie-breaker and take the
   first per parcel with `DISTINCT ON` or a window `row_number()`; area is computed in a
   projected CRS. Decide whether parcels with no zone are kept (left join) or dropped.
6. Add the checks to run: row count of the view equals the parcel count (or states why it
   differs), no key appears twice, and a few parcels checked by eye in the map. Name the
   invalid-geometry risk: `ST_Intersection` fails on invalid input, so `ST_IsValid` first.
7. Close with what the user confirms in their own tool: the exact field names, the three sample
   outputs, the view's row count, and the plan from `EXPLAIN` if speed matters. Nothing here
   was run against their data.

## Output

The expression or view SQL in a code block, the assumed schema, the three-row test table with
expected outputs, the cardinality and SRID notes, and the confirmation list.
