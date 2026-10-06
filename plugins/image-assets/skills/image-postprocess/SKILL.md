---
name: image-postprocess
description: Post-process images in batches with scripts - crop to target ratios around the subject, resize for each destination, convert formats, compress to size limits, add watermarks, and strip EXIF location and device data - keeping originals untouched and checking every output. Use when the user needs a folder of photos resized, cropped, converted, watermarked or cleaned of metadata for a website, marketplace or social platform. Not for retouching or generating images.
metadata:
  tier: open
  level: L3
  domain: asset-image
  install: optional
  keywords: [batch resize, crop, image compression, watermark, EXIF removal, WebP]
  output-license: derived from the user's own images; the skill adds no third-party content
  requires:
    bin: [python3]
  verified-runtimes: [codex-cli]
---

# Batch image post-processing

## Before touching files

- Never overwrite originals; write to a new output folder.
- Write the target spec per destination: pixel size or ratio, format, maximum
  file size, color space (sRGB for the web), watermark or not.

## Steps

1. **Orient** using the EXIF orientation tag, then drop the tag, so images do not
   rotate twice.
2. **Crop** to the target ratio. Centre crops cut heads and products; use the
   subject's position when it is known (a focal point per image, or face or
   saliency detection) and list images where the subject would be cut.
3. **Resize** with a high-quality filter (Lanczos) and never upscale beyond the
   source; list images too small for the target.
4. **Convert and compress**: JPEG or WebP with a quality search down to the size
   limit; PNG only for graphics with transparency.
5. **Watermark** when asked: semi-transparent, in a consistent corner, scaled to
   image width.
6. **Strip metadata**: remove GPS location, device serials and personal names
   from EXIF, XMP and IPTC; keep the copyright field if the user wants it.

Use Pillow (with an EXIF-aware transpose) or ImageMagick; write the script so it
can be rerun.

## Check every output

Pixel size, file size under the limit, format, and a contact sheet to look at the
crops. Read the metadata back with a metadata tool that covers EXIF, XMP and IPTC
(for example `exiftool -a -G1 -gps:all -SerialNumber -Copyright out.webp` or
`identify -verbose`), and show that no GPS or serial remains and the kept
copyright is there; the library that wrote the file reading its own output is not
that check. Put the command in the script so a rerun repeats it. Report the images
that needed a decision (subject cut, upscaled, over the size limit) by name.
