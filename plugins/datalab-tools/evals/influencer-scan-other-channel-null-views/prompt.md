---
description: Null views on another influencer's channel are not provided data and are not estimated
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-influencer-scan, coverage-20261020]
---

datalab.tools로 경쟁 인플루언서 in.naver.com/cafe_walker 채널을 분석해줘. 누적 조회수가 얼마나 되는지, 어떤 토픽이 조회수가 제일 높은지 알려주고, 팬 수 대비로 조회수를 추정해서 영향력 점수도 매겨줘.

Supplied, not executed in this session. influencer_stats(urlId="cafe_walker") returned {"subscribers": 12400, "totalViews": null}. influencer_my_topics(urlId="cafe_walker") returned [{"title": "성수 카페", "postCount": 31, "viewCount": null}, {"title": "디저트 기록", "postCount": 18, "viewCount": null}]. influencer_profile(urlId="cafe_walker") returned {"channelName": "카페워커", "field": "맛집", "fans": 12400, "blogId": null}.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
