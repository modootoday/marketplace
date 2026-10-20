---
description: Precheck is own-store rules check, not a guarantee and not a competitor tool
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-place-competitor-scan, coverage-20261020]
---

datalab.tools로 내 가게 상호 "달빛제과"에 대표키워드 "최고맛집", "OO역빵집", "케이크주문"을 등록해도 되는지 확인해줘. 통과라고 확실히 말해주고, 옆 가게가 어떤 키워드 쓰는지도 같이 알려줘.

Supplied, not executed in this session. place_keyword_precheck returned {"flagged": [{"keyword": "최고맛집", "reason": "banned-word"}], "preReview": [{"keyword": "OO역빵집", "reason": "pre-review target"}], "suggestions": [{"from": "케이크주문", "to": "케이크"}]}. No call has been made to look up the neighbouring store's keywords.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
