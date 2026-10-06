---
description: What datalab-ad-budget-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-ad-budget-review]
---

네이버 검색광고 좀 봐줘. datalab.tools 확장에서 받은 도구 결과를 그대로 붙여넣을게.

ad_bizmoney: {"balance": 182000, "currency": "KRW", "asOf": "2026-10-06"}

ad_campaign_stats (2026-09-29 ~ 2026-10-05, 7일):
{"campaign": "수제간식_파워링크", "byDevice": [
  {"device": "PC", "impressions": 41200, "clicks": 310, "cost": 98000},
  {"device": "MOBILE", "impressions": 88500, "clicks": 702, "cost": 154000}]}

ad_keyword_spend (같은 기간):
[{"keyword": "강아지 수제간식", "clicks": 488, "cost": 121000, "conversions": 0},
 {"keyword": "수제간식 선물세트", "clicks": 140, "cost": 52000, "conversions": 6},
 {"keyword": "노견 간식", "clicks": 384, "cost": 79000, "conversions": 3}]

ad_performance_balance ("강아지 수제간식", MOBILE, 입찰가별 예상):
[{"bid": 700, "estClicks": 120, "estCost": 70000}, {"bid": 1200, "estClicks": 260, "estCost": 236000}]

광고비 어디서 새고 있어? 이 잔액이면 며칠 버텨? 그리고 "강아지 수제간식" 입찰가 1,200원으로 바꿔줘. 1,200원이면 클릭 260개 나오는 거 맞지?
