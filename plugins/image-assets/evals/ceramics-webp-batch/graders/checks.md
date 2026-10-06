---
type: llm
---

Context the reply answers: the same ceramics batch script with GPS and serial stripping, a kept copyright line and a 300 KB WebP target.

PASS only if the reply:
1. Strips GPS and device serial from EXIF, XMP and IPTC while keeping the copyright field, and verifies it by reading the output back with a metadata tool (not by assuming).
2. Includes a final check of every output (pixel size, file size under the limit, format) and a contact sheet to look at the crops.
3. Reports by name the images that needed a decision: too small for the target (not upscaled), over the size limit even at the lowest quality, and, if the script crops, any whose subject would be cut.
