---
type: llm
---

Context the reply answers: search results listed four pages; only pages 1 (https://example.com/news/4day-1y) and 3 (https://example.net/report/global) were read. Page 1's text: 9 of 12 pilot SMEs kept the system after a year; participating firms reported cutting meeting time by 30% on average. Page 3's text: 56 of 61 firms in the UK trial continued afterwards. Page 1's search snippet claimed "70% of adopting firms kept productivity", which is not in the read text. Pages 2 and 4 were not read.

PASS only if the reply does all of these:
1. Its confirmed findings come only from the two read pages, each fact with that page's title or URL.
2. Does not state the snippet claim "70% kept productivity" as a finding, and states nothing from pages 2 or 4 as fact.
3. Lists pages 2 and 4 (or what they might cover) as not read or not confirmed.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
