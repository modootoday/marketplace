---
name: ome-series-calibration-roundtrip-check
description: Compare OME microscopy physical quantities and series/IFD-to-ZCT plane identities through export and consumer reimport observations. Use when pixels look unchanged but scale, time interval, channels or plane ordering change. Not for biological interpretation, OCR alignment, web-image resizing or guessing calibration from screenshots or DPI.
metadata:
  tier: open
  level: L3
  domain: academic-research
  install: optional
  keywords: [OME-TIFF, microscopy metadata, physical pixel size, calibration, series, plane mapping]
---

# OME series and calibration roundtrip check

Pixel equality is separate from physical-quantity and plane-identity equality. Review exact artifacts and supplied consumer observations; do not claim opening microscopy applications or validating acquisition calibration without evidence.

## Inventory the representation

Obtain source/output identities, model/format version, reader/writer/version/options and selected series. Record series IDs, dimensions, pixel type, channels, DimensionOrder and explicit TiffData/IFD mappings, including referenced files for multi-file data. Distinguish the displayed plane from all series and the full data extent.

Record physical X/Y/Z sizes with their units and time quantities/units when present, plus acquisition provenance and accepted tolerances. Values and units form quantities: changing 100 nm to 0.1 micrometres can preserve meaning, while retaining 100 with a different unit may not. Missing calibration is unknown; image pixel dimensions, DPI or apparent cells cannot supply it.

## Check the roundtrip

1. Compare source and interpreted saved-output quantities in common declared units, showing conversions and differences. Keep spatial axes separate and assess time increments versus supplied per-plane times without assuming one covers the other. Missing values/units or unsupported conversion semantics remain unresolved.
2. Enumerate IFD-to-series/Z/C/T correspondence from the actual metadata. DimensionOrder defines rasterization, but explicit TiffData assignments can override it. Compare saved and consumer-interpreted plane identities, not only raw IFD order or matching total plane counts. Account for missing, duplicated, extra and referenced-file planes under the format contract.
3. Compare dimensions, type and pixel observations at matched semantic plane identities. Per-IFD hashes alone can pass while a consumer assigns the same bytes to another Z/T/channel. Distinguish unchanged pixel content from intentionally resampled/cropped derivatives; a derivative requires approved geometry and corresponding calibration updates.
4. Include independently identifiable planes across relevant series/axes and an unaffected quantity/plane control. Schema parsing, one visible plane or a scale-bar screenshot cannot certify every series. State precisely which metadata and consumer observations were supplied and which remain unchecked.
5. Propose a targeted metadata/export/reader investigation when quantity or mapping differs, preserving original acquisition evidence. Require fresh saved-artifact and named-consumer observations tied to the correction. Do not blindly copy all metadata to a resampled image or strip scientific calibration with a web-image cleanup workflow.

## Output and scope

Provide the artifact/consumer ledger, source-value/unit versus interpreted-value/unit conversion table, series/IFD/ZCT crosswalk, pixel-versus-semantic findings and unresolved evidence. Matching quantities means supplied encoding interpretation agrees; it does not establish microscope calibration accuracy or a biological conclusion.

Consult the [OME-TIFF mapping specification](https://docs.openmicroscopy.org/ome-model/6.3.1/ome-tiff/specification.html) and [Bio-Formats quantity/units contract](https://docs.openmicroscopy.org/bio-formats/6.9.1/developers/units.html). [SCIFIO issue 318](https://github.com/scifio/scifio/issues/318) is a historical 2016 report with an unspecified application build and no reproduction here. Its open status does not establish a current defect, pixel corruption or AI failure. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
