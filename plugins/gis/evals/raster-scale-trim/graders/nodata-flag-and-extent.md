---
type: llm
---

Context the reply answers: a user has a Float64 temperature GeoTIFF in degrees C, values -30 to 45, NoData -9999, a zero border where 0 is also valid data. The user will store int16 with a scale factor and trim the border, and asks how to do it safely. The reply is checked for NoData handling after conversion and for grid checks after the trim.

PASS only if the reply does all of these:
1. Preserves a NoData flag after conversion: chooses an explicit int16 NoData code outside the valid stored range (for example -32768), sets it as the band NoData value and maps the old -9999 to it, rather than leaving -9999 as an ordinary integer or dropping the flag.
2. Says to compare grid extents after trimming: cell size unchanged, new origin an exact multiple of the cell size from the old origin, same CRS, so the layer still overlays the original.
3. Ends with what the user must confirm in their own GIS tool (for example NoData flag, decoded range, extent) and does not claim a file size or measured result it was not given.
