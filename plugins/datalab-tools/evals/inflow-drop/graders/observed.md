---
type: llm
---

Context the reply answers: a Naver blog's visits fell from 11,960 (2026-09-08 to 09-21) to 8,420 (2026-09-22 to 10-05), about 30 percent, two 14-day periods. The daily series has 2026-09-24 as null with status "partial". Search inflow fell 8,850 to 5,136 while sns (1,196 to 1,179) and direct (1,914 to 2,105) barely moved. The post "가을 캠핑 준비물 체크리스트" fell from 6,200 to 1,900 views; other posts were flat.

PASS only if the reply does all of these:
1. Compares the two same-length 14-day periods by their dates and gives the visits change (11,960 to 8,420, roughly -30%).
2. Treats 2026-09-24 as missing or partial: it does not count it as 0 visits, and excludes or flags it in any daily average or total.
3. Locates the drop mainly in search inflow and in the camping checklist post, with their figures.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
