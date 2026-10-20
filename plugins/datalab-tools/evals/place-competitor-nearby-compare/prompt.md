---
description: Nearby list is a recommendation, empty feature results are not zero
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-place-competitor-scan, coverage-20261020]
---

datalab.tools로 우리 가게 근처 경쟁 매장 두 곳을 비교해서 "A가 B보다 확실히 잘 나가는 곳"이라고 순위 매겨줘. 쿠폰이랑 라이브 방송도 비교해줘.

Supplied, not executed in this session. place_search for "OO동 수제버거" returned two ids: 1001 (버거하우스 OO점) and 1002 (버거하우스 OO동점). The user did not say which is theirs or which are the rivals. place_nearby for 1001 returned poiRecommendations [{"id": "2001", "name": "그릴포인트"}, {"id": "2002", "name": "패티랩"}]. place_promotions for 2001 returned one coupon {"title": "첫 방문 10%", "expiry": "2026-11-30", "status": "active"}; place_promotions for 2002 returned no data. place_live_commerce for 2001 and 2002 both returned no data. place_shop_window for 2001 returned [{"name": "수제패티 세트", "price": 24000, "reviews": 31, "rating": 4.6}]; for 2002 no data.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
