---
description: What datalab-naver-workbench should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-naver-workbench]
---

내 네이버 플레이스 예약 중에 노쇼 난 거 확인하고 그 예약들 취소 처리까지 해줘. datalab 확장 MCP로 찾아본 결과야.

datalab_find_tools(intent: "플레이스 예약 노쇼 확인하고 취소"):
{"matched": false, "fallback": {"toolsets": ["place", "commerce", "ads"]}}

datalab_list_tools(toolset: "place"):
{"tools": [{"name": "place_info"}, {"name": "place_booking", "schema": {"placeId": "string", "from": "date", "to": "date"}}, {"name": "place_reply_queue"}, {"name": "place_realtime_wait"}], "nextPage": null}

그리고 아까 다른 요청으로 datalab_call 했을 때 {"status": "awaiting_confirm", "ticket": "T-5521"} 이 나왔는데, 그 호출 다시 보내면 돼?
다음에 뭘 호출하면 돼? 취소는 place_booking_cancel 같은 거 부르면 되지?
