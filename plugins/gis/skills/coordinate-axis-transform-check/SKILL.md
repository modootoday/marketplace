---
name: coordinate-axis-transform-check
description: Verify actual coordinate tuple order, API axis mapping and selected CRS operation against independent forward location controls and saved-output interpretation. Use when a transform gives plausible but wrong locations, an axis default changes, or inverse roundtrip is offered as proof. Not for geometry repair, guessing missing CRS or surveying legal boundaries.
metadata:
  tier: open
  level: L3
  domain: gis
  install: optional
  keywords: [CRS, axis order, coordinate transform, GDAL, PROJ, GeoJSON, forward control]
---

# Coordinate axis transform check

A transformation may be invertible and still locate a feature incorrectly. Compare the actual interface contract and independent location controls; a CRS label or successful inverse is insufficient. Separate supplied results from transformations actually executed.

## Inventory each boundary

Record source and target artifact identities, encoding, CRS definitions, datum, coordinate epoch when relevant, units, dimensions and tuple order. Separate file/data order from authority CRS axis order, API input/output order and saved-file interpretation. GeoJSON positions use longitude then latitude; an authority-compliant API can require a different ordering for its CRS. Do not treat longitude/x labels as proof of every interface's order.

Record engine/version, explicit data-axis strategy, selected operation or pipeline, area of use, accuracy requirement, grid availability and any fallback/ballpark operation. An option such as always_xy or traditional GIS order is appropriate only if it matches the actual data and API contract. Do not apply a global swap across every boundary. If CRS/order/units are missing, request provenance and definitions rather than assigning a convenient EPSG label to plausible numbers.

## Verify location, then persistence

1. Write a boundary mapping table: supplied tuple, each component's meaning/unit, API arguments, API return meanings and saved tuple interpretation. Distinguish relabeling coordinates from transforming them.
2. Obtain independent known-location controls with expected target coordinates, their provenance, units and accepted tolerance. A control computed through the same suspect mapping is not independent. Include controls distributed across the relevant extent when certifying more than one point.
3. Compare supplied forward observations with controls, showing component residuals and a norm appropriate to the stated units/metric. Do not calculate Euclidean metre accuracy from raw degrees without an established conversion. Assess the selected operation's applicability and grid/fallback uncertainty separately from numerical agreement at a control.
4. Use inverse roundtrip only as a supplemental check. The inverse can undo the same wrong convention and return the original tuple while the forward location is wrong. A passing roundtrip does not override an independent forward failure.
5. Check the saved output in the intended consumer: stored CRS, interpreted axis order/units, feature identity and forward controls after reimport. Identical raw arrays do not prove identical interpreted locations. Propose the minimal interface correction, preserving the original, and request a fresh forward and reimport check tied to the corrected artifact.

## Output and stop conditions

Give an encoding/API/saved-axis ledger, selected-operation and uncertainty ledger, forward-control residual table, separate roundtrip result and scoped conclusion. Mark missing definitions, controls, grids or observations unresolved. Geometry validity and topology are separate checks; geometry repair cannot cure a wrong location mapping. Do not certify a region from one synthetic point or claim survey-grade accuracy from these checks.

Consult [GDAL CRS and axis order](https://gdal.org/en/stable/tutorials/osr_api_tut.html#crs-and-axis-order), [PROJ's axis-order FAQ](https://proj.org/en/stable/faq.html#why-is-the-axis-ordering-in-proj-not-consistent) and [RFC 7946 positions](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1) for the named boundary. [GeoPandas issue 1245](https://github.com/geopandas/geopandas/issues/1245) is a historical unreproduced report; its preferred output is not an independent survey control. [OpenLayers issue 15521](https://github.com/openlayers/openlayers/issues/15521) is closed with a historical orderedAxes correction, not proof of a current transformation defect. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
