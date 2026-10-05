---
name: raster-nodata-and-scaling
description: Plan how to shrink, trim or aggregate a large raster without changing its meaning - separate NoData from valid zero before trimming, pick an integer type with scale and offset from the stated error tolerance with the bundled calculator, keep a NoData code outside the valid range, and compare the result with the original on one tile and on grid extent and alignment. Use when someone wants a smaller float raster, wants empty borders or zeros cut, or wants a tiled or parallel aggregation checked against a single run. Not for choosing a projection, for vector data (see gis-geometry-repair-and-validate) or for running the conversion for the user.
metadata:
  tier: open
  level: L3
  domain: gis
  install: optional
  keywords: [raster, nodata, int16, scale factor, offset, trim, geotiff, tiling, aggregation, gdal]
  requires:
    bin: [node]
  approval: scripts
---

# Raster NoData and scaling

Shrinking a raster is safe only if "empty" and "zero" stay different things and the stored
integers decode back inside the stated tolerance. This skill plans and checks; the user runs the
conversion in their own GIS tool and confirms the numbers.

## Steps

1. State what is assumed: data type, units, value range, tolerance, NoData value, and what the
   border or fill value means. If the raster CRS or cell size is not given, say they are
   unchecked and that scaling does not change them.
2. NoData is not zero. Before trimming, list the candidate "empty" values (NoData flag, 0, other
   fill). Trim only on the NoData mask. A zero that the user says is a valid measurement stays;
   a zero border the user says is fill must be recoded to NoData first, and that is the user's
   decision, not a guess. Say that trimming on `== 0` would delete valid data and shift the
   extent.
3. Scale from the tolerance, not from habit. Rounding error is scale / 2, so the scale must be
   at most twice the tolerance, and the stored range (value / scale) must fit the integer type
   with one code kept free for NoData. Run `node scripts/scale-check.mjs <min> <max> <tolerance>`
   and read the table: report the coarsest scale that meets the tolerance, the recommended one
   with a margin, the integer type, and any scale that does not fit. Prefer a round decimal
   scale (0.01 over 0.02) when it fits, and state offset (0 for signed types).
4. NoData after conversion: choose a code outside the valid stored range (for example the
   type minimum), set it as the band NoData value, and map the old NoData to it explicitly.
   Never leave the old float NoData number as an ordinary integer.
5. Verify the round trip: decode (stored x scale + offset), compare with the original on
   valid cells only, and report maximum absolute error against the tolerance; check that the
   count of NoData cells is unchanged and that valid zeros are still present.
6. After trimming, compare grid extents: cell size unchanged, new origin an exact multiple of
   the cell size from the old origin, same CRS, and row and column counts equal to the old ones
   minus the trimmed rows and columns. A shifted origin means the layers no longer overlay.
7. Tiled or parallel aggregation: run one tile (or a small window) both ways, whole-raster
   versus tiled, and compare cell by cell; check that tile edges overlap or are aligned to the
   cell grid and that the aggregation (sum, mean, count of valid) treats NoData the same in
   both. Do not report the tiled result as correct before this comparison runs.
8. Close with what the user must confirm in their GIS tool: that the NoData flag is set, the
   decoded range, the extent and CRS in the layer properties, and the file size, because this
   skill measured none of them. Use only numbers the user gave or the calculator printed.

## Output

A short plan: assumptions, the NoData and zero decision, the calculator table, the type, scale,
offset and NoData code, the round-trip and extent checks, the tile comparison, and the list of
things only the user can confirm.
