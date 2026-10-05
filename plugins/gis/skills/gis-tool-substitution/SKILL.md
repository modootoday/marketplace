---
name: gis-tool-substitution
description: Plan a replacement of a proprietary GIS analysis tool with a free or other licensed one - name the algorithm and every parameter of the original (observer and target height, distance, curvature and refraction, cell size, units), map each to the candidate tool's option, list the defaults that differ, and compare CRS and output on a small test area before any claim of equivalence. Use when a license lacks a tool such as a viewshed, hydrology or network analysis and someone asks for an open alternative or a QGIS or GDAL equivalent. Not for installing software, for license advice or for tools that need no equivalence check. Rests on one report.
metadata:
  tier: open
  level: L2
  domain: gis
  install: optional
  keywords: [viewshed, license, alternative, qgis, gdal, grass, parameters, equivalence, arcgis]
---

# GIS tool substitution

Two tools with the same name for an analysis often use different defaults. A substitute is not
shown equivalent until its output is compared with the original on the same input.

## Steps

1. Name the analysis and its algorithm in the original tool, and list every parameter the user
   gave or that the original applies by default: input data and its CRS and cell size, heights
   or distances and their units, curvature and refraction settings, tie and edge rules, output
   type (binary, count, angle). Missing parameters are asked for or listed as unknown.
2. Offer two or three candidates by name, for example GDAL, GRASS or a QGIS plugin for a
   viewshed, and for each say what it computes, which inputs it needs and its main limits
   (single observer or many, maximum distance, memory). Say the user must check the current
   version's documentation, because options and defaults change.
3. Make a mapping table: original parameter, candidate option, same default or not, and the
   conversion needed. Flag the defaults that differ (curvature and refraction handling in
   particular), and anything the candidate cannot do.
4. Check the CRS: both tools must read the same projected CRS with metre units, and the
   observer coordinates and heights must be in those units. Reproject first if not, and do it
   once for both runs.
5. Test on a small area where the answer can be seen: same DEM clip, same point, run both tools
   and compare the output cell by cell or by area, and by eye on a hillshade. State the agreement
   rule up front (for example the share of cells that differ, and where they lie).
6. Report: differences that trace to a mapped default are explained by setting the candidate to
   match and re-running; the rest block a claim of equivalence. If no licensed copy is
   available to compare, say the substitute was not validated and what independent check
   (a known sight line, a field check) can stand in.
7. Close with what the user must confirm in their own tools: versions, parameter values, the
   test-area comparison and the CRS. Nothing here was run.

## Output

The candidates, the parameter mapping table with differing defaults, the CRS check, the
test-area comparison design with its agreement rule, and the statement of what is not yet shown.
