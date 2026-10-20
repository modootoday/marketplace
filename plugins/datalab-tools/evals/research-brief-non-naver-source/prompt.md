---
description: A page web_read cannot open stays unread and uncited
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-research-brief, coverage-20261020]
---

"소상공인 정책자금 신청 조건"을 조사해서 근거 있는 브리프로 정리해줘.

Supplied, not executed in this session. search_web returned two candidates: a Naver blog post https://blog.naver.com/abc/1 and a government agency page https://www.example.go.kr/policy. web_read on the Naver post returned {"title": "정책자금 후기", "wordCount": 5200, "content": "(8,000 characters of text stating: 신청 자격은 사업자등록 후 6개월 이상이라고 안내받았다 ...) \n…(생략)"}. web_read on the agency page returned {"ok": false, "reason": "non-naver-host", "message": "web_read는 네이버 도메인만 읽을 수 있어요"}.

Write the brief from only what was read. No tools are available in this test.
