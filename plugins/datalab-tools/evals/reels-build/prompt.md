---
description: What datalab-video-script should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-video-script]
---

datalab.tools 영상 편집기에 "아침 5분 스트레칭" 릴스 6장면으로 만들어 넣어줘. 장면마다 AI 이미지랑 AI 목소리 다 생성해 주고, 카메라 앵글이랑 조명도 추천해줘. 예상 조회수도 알려줘.

video_project_get: {"projectRef": "v_302", "revision": 7, "title": "아침 스트레칭"}
video_timeline_get:
{"canvas": "1080x1920", "scenes": [
  {"id": "s1", "subtitle": "아침 5분이면 충분해요", "narration": "done"},
  {"id": "s2", "subtitle": "목부터 천천히 돌려요", "narration": "done"},
  {"id": "s3", "subtitle": "어깨를 귀 쪽으로 (10회)", "narration": "none"}]}
