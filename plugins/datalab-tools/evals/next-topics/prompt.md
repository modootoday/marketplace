---
description: What datalab-material-suggestion should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-material-suggestion]
---

네이버 블로그 육아 카테고리인데 다음 글감 5개 추천해줘. 각 소재마다 추천도 점수(100점 만점)랑 난이도 별점도 매겨줘. 확장에서 뽑은 결과야.

search_keywords: [{"keyword": "유아 수면교육", "monthly": 14800}, {"keyword": "어린이집 적응", "monthly": 9900}, {"keyword": "이유식 거부", "monthly": 6600}, {"keyword": "아기 열 경련", "monthly": 3600}]
kin_question_demand("이유식 거부"): {"questions_30d": 412}
keyword_yoy("어린이집 적응"): {"peakMonths": [2, 3], "yoy": "+4%"}
search_blog("유아 수면교육") 상위 10개: 10개 중 8개가 2025-07 이전에 발행된 글
