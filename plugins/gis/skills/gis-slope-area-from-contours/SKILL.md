---
name: gis-slope-area-from-contours
description: Plan how to get the area per slope class from contour lines - interpolate a DEM with a named method and cell size, derive slope as percent or degrees (state which), reclassify at the stated breaks, sum areas in a projected CRS, check the class sum against the study area, and state how the contour interval limits accuracy, using the bundled calculator for percent to degree and spacing. Use when a planner or student has contours and wants hectares or shares of land under given slope limits. Not for measured survey slopes, for slope stability or earthworks design, or for raster scaling (see raster-nodata-and-scaling).
metadata:
  tier: open
  level: L2
  domain: gis
  install: optional
  keywords: [slope, contours, DEM, TIN, interpolation, percent slope, reclassify, area, hectares]
  requires:
    bin: [node]
  approval: scripts
---

# Slope area from contours

Slope classes from contours are an estimate whose error comes from the contour interval and the
interpolation. Give the procedure and the checks; the user runs it in their GIS and reports the
areas, and no area figures come from this skill.

## Steps

1. Confirm inputs and state assumptions: contour interval and unit, elevation field, CRS (must be
   projected, with metre units for hectares; if it is geographic, reproject first), study-area
   polygon and its area, and the slope breaks with their unit. If the unit is missing, ask,
   because 15 percent and 15 degrees are very different slopes.
2. Build the surface: name the method (TIN from contours, topo-to-raster style interpolation, or
   another) and choose a cell size no coarser than about half the narrowest contour spacing that
   matters at the steepest break. Run `node scripts/slope-classes.mjs <interval> <breaks>` to get
   the spacing at each break. Contours alone leave flat spots and terraces between lines; say
   so, and add spot heights or ridge and stream lines if they exist.
3. Derive slope with the unit the breaks use. Percent slope is rise over run times 100, degrees
   is the arctangent; the calculator prints both, for example 15 percent is not 15 degrees.
   Say which output the tool produces and convert the breaks, not the raster, if they differ.
4. Reclassify with explicit breaks and who owns the boundary cell: for example under 15, 15 up to
   and including 30, over 30. Keep a NoData class out of the totals but count it.
5. Area per class: count cells times cell area in the projected CRS, or dissolve polygons and
   use the geometry area. Do not compute in degrees. Clip to the study area first.
6. Sum check: the class areas plus NoData must equal the study area to within a stated tolerance
   (for example 0.5 percent); `node scripts/slope-classes.mjs <interval> <breaks> <study_ha>
   <class_ha,...>` prints the difference once the user has areas. A miss points to NoData cells,
   edge cells outside the contours or a wrong CRS.
7. State the accuracy limit from the contour interval: an elevation error of half the interval
   over the run that a given slope implies shifts the slope by the amount the calculator
   prints, so areas near a break are the least reliable. Suggest a sensitivity run with breaks
   moved by that amount, and a visual check of the class map against the contours.
8. Close with what the user must confirm in their GIS: the CRS and units, the cell size, the
   slope unit of the tool, the class table and the sum check. Report the result as an estimate
   from contours, not a surveyed value.

## Output

A procedure with the assumptions, method and cell size, the break table from the calculator,
the reclassification rule, the area and sum-check method, the sensitivity note and the list
for the user to confirm.
