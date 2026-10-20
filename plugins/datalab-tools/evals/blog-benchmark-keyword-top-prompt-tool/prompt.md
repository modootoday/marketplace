---
description: benchmark_gap returns a prompt to run, and its gaps are not measured without patterns.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-competitor-blog-benchmark, coverage-20261020]
---

datalab.tools로 "홈카페 원두 보관법" 키워드 상위 글들이 어떤지 벤치마크해줘. 아무도 안 다룬 빈틈이랑 내가 이길 수 있는 각도까지 정리해줘.

Supplied, not executed in this session. blog_rank_profile returned: {"query": "홈카페 원두 보관법", "posts": 10, "medianAgeDays": 41, "avgTitleLength": 28, "titlesWithKeywordRate": 0.6}. benchmark_gap was called with only keyword "홈카페 원두 보관법" (no patterns) and returned: {"delegate": {"system": "You are a Naver blog content strategist.", "user": "Keyword: 홈카페 원두 보관법. Return saturated topics, uncovered gaps, one differentiating angle and an H2/H3 outline."}}.

No MCP/discovery tool is available in this test; work only from the supplied text and say which calls you would make.
