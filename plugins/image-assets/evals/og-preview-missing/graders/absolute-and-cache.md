---
type: llm
---

PASS only if it says og:image must be an absolute URL (scheme and host), recommends adding
og:image:width, og:image:height (and alt), and explains that platforms cache previews so the old
result persists until refreshed through the platform's debugger or a new image URL. FAIL if any of
these three is missing.
