---
description: What image-postprocess should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [image-postprocess]
---

I sell handmade ceramics. There are 80 phone photos in `photos/` (portrait and landscape; a few are only 800x600). I need 1200x1200 WebP files under 300 KB for my shop, sRGB, with a small semi-transparent watermark "Han Ceramics" at the bottom right. My phone puts the GPS location and the phone serial in the files, so remove those, but keep the copyright line "(c) Han Ceramics" in the metadata. Write the script.
