---
description: After a timed-out editor write, check the operation before any resend
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-naver-workbench, datalab-post-edit-verify, coverage-20261020]
---

방금 글쓰기 창에 "겨울 캠핑 체크리스트" 본문 넣으라고 한 거 응답이 안 와서 끊겼어. 다시 넣어줘.

Supplied, not executed in this session: the earlier call was datalab_call(tool="editor_insert_draft", args={"markdown": "...", "operationId": "ins-camping-01", "target": {"editorSession": "es_9", "expectedRevision": "r41"}}). The call timed out with no reply. The editor was last read at revision r41. Tools are not available in this test; say what you would do and what each possible answer would make you do.
