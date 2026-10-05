---
name: gis-geometry-repair-and-validate
description: Plan the cleanup and merge of several polygon layers - run validity checks first and count error types, align CRS and field schema across layers with a mapping table, repair with a named method, compare feature count and area before and after, check boundaries for gaps and overlaps, and keep a repair log of changed feature ids. Use when polygons are invalid, layers from different regions use different CRS or field names, or they must be merged into one GeoPackage with one style. Not for raster data (see raster-nodata-and-scaling), for deciding legal boundaries or for writing the merge for the user without a validity report.
metadata:
  tier: open
  level: L3
  domain: gis
  install: optional
  keywords: [geometry validity, self-intersection, make valid, geopackage, merge, crs, schema mapping, sliver, topology]
---

# GIS geometry repair and validate

Repairing geometry changes data. Count first, repair with a named method, then show what changed.
This skill plans and states the checks; the user runs them in their GIS tool and confirms the
counts.

## Steps

1. Inventory each input layer: file, CRS (EPSG code), geometry type, feature count, field names
   and types. State what is unknown. Do not guess a CRS for a layer with none: ask, or compare
   coordinates with a known layer.
2. Validity report before any change, per layer: number of features by error type
   (self-intersection, duplicate or repeated vertices, ring not closed, too few points, empty or
   null geometry, slivers under a stated area), plus the total; a count the user gave for one
   layer does not cover the others, so ask for all layers. Run the same count again after the
   repair. Tool names the user can run:
   "Check validity" in QGIS, `ST_IsValidReason` in PostGIS, `explain_validity` in GEOS-based
   libraries. The counts are the user's to supply; do not invent them.
3. Align CRS: say outright that the layers are in different CRS (list each EPSG code), choose
   one target CRS, name it with its EPSG code and units, and say why (a projected CRS suited to
   the region for area work). A geographic CRS such as EPSG:4326 is in degrees and cannot give
   areas, so reproject every layer to the target before merging and before any area check. List the datum or axis-order cautions for any layer that is not obviously in the
   expected CRS.
4. Align schema: write a mapping table from each layer's fields to one target field with type
   and allowed values (for example three different spellings of one land-use field), report
   fields that exist in only one layer, mismatched types and code lists, and who decides on
   conflicts. Do not merge with mismatched columns silently.
5. Repair with a named method and its effect: a make-valid operation (`ST_MakeValid` or the
   "Fix geometries" tool) versus a zero-width buffer. Say that make-valid can change the
   geometry type (polygon to multipolygon or collection) and drop slivers, and that a buffer
   of zero can drop parts. Keep the original layer untouched and repair a copy.
6. Compare before and after: valid count, feature count, and total area per layer in the
   projected CRS, with the difference in hectares and percent and a threshold the user
   accepts (for example 0.1 percent). A large change is a stop, not a pass.
7. Boundary check after merging: gaps and overlaps between adjacent layers along shared
   region borders (topology check or a dissolve with area comparison), duplicates from
   features that appear in two layers, and how they are resolved.
8. Repair log: a table with layer, feature id, error type before, method, and area change, saved
   as a file next to the merged GeoPackage. Style is applied after the merge, one style on the
   merged layer, and the field used for it is named from the mapping table.
9. Close with an explicit list of what the user must confirm in their tool, since none of it was
   measured here: the validity counts before and after (zero invalid after repair), the CRS,
   the area comparison, gaps and overlaps along the county borders, and a visual look at the
   repaired features. Never call the merged data clean in the reply; it is the user's
   call after those checks pass, and end by saying which checks are still open.

## Output

A plan with the layer inventory, the validity report template, the target CRS, the field mapping
table, the repair method and its caveats, the before and after comparison with the threshold, the
boundary checks and the log format.
