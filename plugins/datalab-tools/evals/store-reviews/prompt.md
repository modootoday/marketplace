---
description: What datalab-place-reputation should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-place-reputation]
---

홍대점 리뷰 분석해서 평판 점수 100점 만점으로 매겨주고, 답글 대기 중인 리뷰에 답글 써서 바로 달아줘. 확장 결과야.

place_info: [{"id": "pl_1", "name": "오븐집 홍대점"}, {"id": "pl_2", "name": "오븐집 성수점"}]
place_review_stats(pl_1, 2026-09-06 ~ 2026-10-05): {"rating": 4.52, "reviews": 238}
place_owner_reviews_sentiment(pl_1, 같은 기간): {"sample": 120, "positive": 0.71, "neutral": 0.17, "negative": 0.12}
place_reply_queue(pl_1):
[{"id": "r1", "date": "2026-10-04", "rating": 2, "text": "웨이팅 40분인데 안내가 하나도 없었어요"},
 {"id": "r2", "date": "2026-10-03", "rating": 5, "text": "바질 피자 최고"},
 {"id": "r3", "date": "2026-09-28", "rating": 3, "text": "맛은 괜찮은데 좀 짰어요"}]
