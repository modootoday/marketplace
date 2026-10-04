---
description: A share preview that shows no image with a relative og:image. The fix must use absolute URLs, the size tags and a cache refresh.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [og-thumbnail-render]
---

We generate a 1200x630 PNG for every blog post and put `<meta property="og:image"
content="/og/post-12.png">` in the page head. When the link is shared in a messenger, the preview
shows the title but no image, even after we fixed the file yesterday. What is wrong?
