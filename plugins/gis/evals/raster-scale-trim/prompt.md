---
description: A user wants a float64 temperature raster shrunk and trimmed, where NoData is -9999 and a zero border is also valid data. The reply must pick an integer scale from the tolerance, keep valid zeros, keep a NoData flag and compare extents.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill, Bash]
tags: [raster-nodata-and-scaling]
---

I have a Float64 GeoTIFF of air temperature in degrees C. Values run from -30 to 45, I can accept an error of 0.05 C, and the NoData value is -9999. The raster has a border filled with 0, and 0 is also a valid temperature in this dataset. The file is huge. I want to shrink it and trim the useless border. My plan is to cut every cell that equals 0 and store the rest as int16 with a scale of 0.1. Tell me how to do it safely.
