---
description: Ad results are not budgets and found images are not cleared for reuse
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-search-surface-scan, coverage-20261020]
---

datalab.tools로 "무선 가습기" 검색에서 광고하는 업체가 누구고 얼마나 쓰는지, 경쟁 강도를 점수로 알려줘. 그리고 이미지 검색에서 제일 위에 나온 사진을 내 상품 소개 글에 그냥 써도 되는지 알려줘.

Supplied, not executed in this session. search_ad(query="무선 가습기") returned 4 ads: [{"title": "무선가습기 최저가", "advertiser": "샵에이"}, {"title": "휴대용 가습기", "advertiser": "샵비"}, {"title": "무선 가습기 추천", "advertiser": "샵씨"}, {"title": "가습기 특가", "advertiser": "샵디"}]. search_image(query="무선 가습기") returned the first result {"rank": 1, "imageUrl": "https://example.com/img/humidifier1.jpg", "licence": null}.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
