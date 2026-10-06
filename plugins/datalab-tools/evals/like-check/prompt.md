---
description: What datalab-pumasi should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-pumasi]
---

품앗이 상태 좀 봐줘. 공감 안 한 글은 공감 눌러주고, 이웃 아니면 서로이웃 신청도 해주고, 각 글에 댓글도 하나씩 달아줘. 확장 결과야.

pumasi_like_state:
[{"post": "https://blog.naver.com/sunny_cook/2231", "liked": true},
 {"post": "https://blog.naver.com/sunny_cook/2240", "liked": false},
 {"post": "https://blog.naver.com/minu_trip/1187", "liked": null, "error": "timeout"}]

pumasi_neighbor_state:
[{"blog": "sunny_cook", "iFollow": true, "followsMe": false},
 {"blog": "minu_trip", "iFollow": false, "followsMe": false}]
