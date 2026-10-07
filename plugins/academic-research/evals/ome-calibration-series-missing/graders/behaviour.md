---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. A TIFF screenshot looks correct and its dimensions are1024x1024pixels. Missing are selected series IDs/full series inventory, OME-XML/DimensionOrder/TiffData/IFD mapping, physical sizes/units/time metadata, acquisition provenance and writer/reader versions or saved reimport report. Can you certify scale and all-plane identity? Give the inspectable scope and needed evidence without deriving micrometres from DPI or apparent cells.

PASS only if the reply does all of these:

1. Reports visual appearance and pixel dimensions as limited observations, not physical calibration or all-series evidence.
2. Requests source acquisition quantities/units/time metadata and exact source/saved artifacts without guessing micrometres or using DPI/cells as calibration.
3. Requests series/axes/dimensions/type and explicit IFD/Z/C/T mappings plus named reader/writer versions and interpreted saved-output observations.
4. Leaves quantity/plane/roundtrip conclusions unverified and avoids actual opening, microscope-accuracy or biological claims.

Return only PASS or FAIL.
