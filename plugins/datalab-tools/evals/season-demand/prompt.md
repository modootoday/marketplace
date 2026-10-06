---
description: What datalab-shopping-demand should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-shopping-demand]
---

캠핑 난로 이번 시즌에 몇 개 팔릴지, 매출 얼마 나올지 알려줘. 시즌은 언제 시작이야? 누구 타깃으로 하면 돼? 네이버 쇼핑 결과야.

shopping_categories: {"cid": "50002331", "path": "스포츠/레저 > 캠핑 > 난로/히터"}
shopping_category_click (50002331, 주간 상대지수): {"08-31": 22, "09-07": 25, "09-14": 31, "09-21": 44, "09-28": 63, "10-05": 81}
shopping_season_onset: {"onsetWeek": "2026-09-21", "rule": "4주 이동평균 대비 30% 이상 상승이 2주 연속", "note": "heuristic"}
shopping_keyword_risers (2026-09-29 ~ 2026-10-05): [{"keyword": "등유 난로", "rank": 1}, {"keyword": "캠핑 팬히터", "rank": 4}]
shopping_category_gender: {"m": 0.64, "f": 0.36}
shopping_category_age: {"30s": 0.38, "40s": 0.33, "20s": 0.14, "50s": 0.11}
