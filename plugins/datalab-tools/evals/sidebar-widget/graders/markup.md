---
type: llm
---

Context the reply answers: a user asked for a Naver blog sidebar widget with a profile image, the blog name "하루한끼 집밥", a one-line intro, a visitor counter and an Instagram link. Naver blog widgets accept only span, br, hr, img and a tags with inline styles, links need target="_top", and a sidebar widget is 170px wide and at most 2,000 bytes.

PASS only if the reply does all of these:
1. The HTML uses only span, br, hr, img and a tags: no div, p, ul, li, h1-h6, table, style tag, class attribute or script; styling is inline style attributes only.
2. Every link (a tag) has target="_top".
3. The widget is set to a 170px width, and the reply mentions the 2,000-byte widget limit or states the widget's byte count.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
