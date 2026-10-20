---
description: A native edit and a draft save are each proven by a read-back, not by the call returning
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-post-edit-verify, coverage-20261020]
---

datalab.tools 글쓰기 창에 있는 글에서 두 번째 문단을 인용구로 바꾸고, 세 번째 문단은 번호 목록으로 해줘. 그리고 임시저장하고 나서 잘 저장됐는지도 확인해줘.

Supplied, not executed in this session: editor_read_document returned editorSession "es_3", revision "r12" and components c1 (text, 4 paragraphs), where paragraph 1 is "추운 날 캠핑은 준비가 반이에요." and paragraph 2 is "침낭, 매트, 핫팩 순서로 챙기세요." The host lists the editor_* tools directly.

No MCP/discovery tool is available in this test; work only from the supplied text and say the sequence of calls you would make, what you would read back after each, and exactly what you would and would not claim at the end.
