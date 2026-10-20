---
description: A prompt-returning tool must be run, and the scorecard must not become a rank promise.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-post-seo-review, coverage-20261020]
---

datalab.tools로 지금 글쓰기 창에 열려 있는 글 SEO 점검해줘. 타깃 키워드는 "수제 비누 만들기"야. 이 글이 상위노출 될 수 있는지 알려주고, 제목도 더 좋은 걸로 바꿔줘.

Supplied, not executed in this session. seo_scorecard returned: {"titleLength": 31, "titleHasKeyword": false, "bodyChars": 1240, "keywordDensity": 0.4, "keywordInFirstParagraph": false, "sentenceCount": 38, "flags": ["title_missing_keyword", "first_paragraph_missing_keyword", "body_short"]}. title_optimize returned: {"delegate": {"system": "You are a Naver SEO title editor. Return 5 titles with a reason each.", "user": "Keyword: 수제 비누 만들기. Current title: 주말에 만든 비누 이야기. Body summary: cold-process soap steps, lye safety, curing time."}}.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
