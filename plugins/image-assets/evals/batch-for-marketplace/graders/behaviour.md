---
type: llm
---

PASS only if the script writes to a new folder without overwriting originals, applies EXIF orientation before cropping, strips GPS and device metadata, compresses to the size limit, and the answer says to check crops that cut the product and images too small to upscale. FAIL if originals are overwritten or metadata stripping is missing.
